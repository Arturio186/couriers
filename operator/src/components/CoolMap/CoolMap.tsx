import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import io from "socket.io-client";
import "./CoolMap.scss";

import ICourier from "#interfaces/ICourier";

import { RootState } from "#store/store";
import MapAnnotation from "#components/MapAnnotation/MapAnnotation";
import CouriersSelect from "#components/CouriersSelect/CouriersSelect";
import { addToast } from "#store/toastSlice";
import { useDispatch } from "react-redux";

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

const CoolMap = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const mapRef = useRef<ymaps.Map | null>(null);

    const [couriers, setCouriers] = useState<ICourier[]>([]);

    useEffect(() => {
        if (user.currentBranch?.id) {
            const socket = io("http://localhost:3001", {
                withCredentials: true,
            });

            socket.emit("new_operator", { branchId: user.currentBranch.id });

            socket.on("location_update", (message: CourierLocationMessage) => {
                console.log("Курьер отправил локацию:", message);

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
                    dispatch(addToast(`Подключился курьер: ${message.userFirstName} ${message.userLastName}`))

                    setCouriers((prev) => [
                        ...prev,
                        {
                            id: message.userId,
                            firstName: message.userFirstName,
                            lastName: message.userLastName,
                            lat: -1,
                            long: -1,
                        },
                    ]);
                }
            );

            socket.on(
                "courier_disconnected",
                (message: CourierConnectionMessage) => {
                    console.log("Курьер отключился:", message);

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
                    </Map>
                    <MapAnnotation />
                </div>
            </YMaps>
        </div>
    );
};

export default CoolMap;
