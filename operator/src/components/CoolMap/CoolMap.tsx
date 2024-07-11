import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { YMaps, Map, Placemark, Button, SearchControl } from "@pbe/react-yandex-maps";
import io from "socket.io-client";
import "./CoolMap.scss";

import ICourier from "#interfaces/ICourier";

import { RootState } from "#store/store";
import MapAnnotation from "#components/MapAnnotation/MapAnnotation";
import CouriersSelect from "#components/CouriersSelect/CouriersSelect";
import { addToast } from "#store/toastSlice";
import { useDispatch } from "react-redux";
import { SOCKET_URL } from "#utils/consts";

interface CourierLocationMessage {
    userId: string;
    lat: number;
    long: number;
}

interface CourierConnectionMessage {
    userId: string;
    userBranchId: string;
    userFirstName: string;
    userLastName: string;
}

interface SearchControlType extends ymaps.control.SearchControl {
    getResultsArray: () => Array<{ geometry: { getCoordinates: () => number[] } }>;
    hideResult: () => void;
}

const CoolMap = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const mapRef = useRef<ymaps.Map | null>(null);
    const creatorPlacemarkRef = useRef<ymaps.Map | null>(null);
    const searchControlRef = useRef<SearchControlType | null>(null);

    const [couriers, setCouriers] = useState<ICourier[]>([]);
    const [creatorPlacemark, setCreatorPlacemark] = useState<React.ReactNode>(null);

    const addCreatorPlacemark = (coords: number[]) => {
        setCreatorPlacemark(
            <Placemark
                onClick={() => console.log('open modal create order')/* setModalCreateOrder(true) */}
                instanceRef={(placemark) => creatorPlacemarkRef.current = placemark}
                geometry={{
                    type: 'Point',
                    coordinates: coords
                }}
                options={{
                    preset: 'islands#dotIcon',
                    iconColor: 'black',
                    draggable: true
                }} 
                properties={{
                    hintContent: 'Чтобы создать заказ, нажми на меня!'
                }}
            />
        ) 
    }

    const handleResultShow = () => {
        const searchControlRefCurrent = searchControlRef.current;

        if (searchControlRefCurrent) {
            const results = searchControlRefCurrent.getResultsArray();
    
            searchControlRefCurrent.hideResult();
            
            if (results.length > 0) {
                const firstResult = results[0];
                const coordinates = firstResult?.geometry?.getCoordinates();

                addCreatorPlacemark(coordinates);
            }
        }
    };

    useEffect(() => {
        if (user.currentBranch?.id) {
            const socket = io(SOCKET_URL, {
                withCredentials: true,
            });

            socket.emit("new_operator", { branchId: user.currentBranch.id });

            socket.on("location_update", (message: CourierLocationMessage) => {
                setCouriers((prev) => {
                    return prev.map((courier) => {
                        if (courier.id === message.userId) {
                            (courier.lat = message.lat),
                            (courier.long = message.long);
                        }

                        return courier;
                    });
                });
            });

            socket.on(
                "courier_connected",
                (message: CourierConnectionMessage) => {
                    const courierLastName = message.userLastName === "null" ? "" : message.userLastName

                    dispatch(addToast(`Подключился курьер: ${message.userFirstName} ${courierLastName}`))

                    setCouriers((prev) => [
                        ...prev,
                        {
                            id: message.userId,
                            firstName: message.userFirstName,
                            lastName: courierLastName,
                            lat: -1,
                            long: -1,
                        },
                    ]);
                }
            );

            socket.on(
                "courier_disconnected",
                (message: CourierConnectionMessage) => {
                    const courierLastName = message.userLastName === "null" ? "" : message.userLastName

                    dispatch(addToast(`Отключился курьер: ${message.userFirstName} ${courierLastName}`))

                    setCouriers((prev) =>
                        prev.filter((courier) => courier.id !== message.userId)
                    );
                }
            );

            return () => {
                socket.disconnect();
            };
        }
    }, [user.currentBranch?.id]);

    

    return (
        <div className="map-wrapper">
            <div className="menu">
                    <CouriersSelect
                        mapRef={mapRef}
                        couriers={couriers} 
                    />
            </div>
            <YMaps
                query={{
                    apikey: "0b375996-25a4-4d5d-9152-504fa8810cd2",
                    suggest_apikey: "fd6f5511-dbbe-4db1-bc61-b5f9a6b71f37",
                }}
            >
                <div className="map-container">
                    <Map
                        className="map"
                        modules={[
                            "geoObject.addon.balloon",
                            "geoObject.addon.hint",
                        ]}
                        defaultState={{
                            center: [
                                user.currentBranch?.coords?.lat || 0,
                                user.currentBranch?.coords?.long || 0,
                            ],
                            zoom: 15,
                            controls: [],
                        }}
                        instanceRef={(map) => (mapRef.current = map)}
                        options={{ suppressMapOpenBlock: true }}
                    >
                        {mapRef.current && <Button
                            options={{ maxWidth: 128, selectOnClick: false }}
                            data={{ content: "Создать заказ" }}
                            onClick={() => {
                                const coords = mapRef.current!.getCenter();

                                if (coords) {
                                    addCreatorPlacemark(coords);
                                }
                            }} 
                        />}

                        {couriers.map((courier) => {
                            if (courier.lat === -1 || courier.long === -1) {
                                return null;
                            }

                            return (
                                <Placemark
                                    key={courier.id}
                                    geometry={{
                                        type: "Point",
                                        coordinates: [
                                            courier.lat,
                                            courier.long,
                                        ],
                                    }}
                                    options={{
                                        preset: "islands#circleIcon",
                                        iconColor: "blue",
                                    }}
                                    properties={{
                                        hintContent: `${courier.firstName} ${courier.lastName}`,
                                        balloonContent: `${courier.firstName} ${courier.lastName}`,
                                    }}
                                />
                            );
                        })}
                        <SearchControl
                            options={{ float: 'right' }}
                            instanceRef={(searchControl: any) => (searchControlRef.current = searchControl)}
                            onResultShow={handleResultShow}
                        />
                        {creatorPlacemark}
                    </Map>
                    <MapAnnotation />
                </div>
            </YMaps>
        </div>
    );
};

export default CoolMap;
