import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { YMaps, Map, Placemark, Button, SearchControl, Clusterer } from "@pbe/react-yandex-maps";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import "./CoolMap.scss";

import { RootState } from "#store/store";
import { addToast } from "#store/toastSlice";

import OrderService from "#services/OrderService";
import ProductService from "#services/ProductService";

import useFetching from "#hooks/useFetching";

import MapAnnotation from "#components/MapAnnotation/MapAnnotation";
import CouriersSelect from "#components/CouriersSelect/CouriersSelect";
import CouriersPlacemarks from "#components/Placemarks/Couriers/CouriersPlacemarks";
import Loader from "#components/UI/Loader/Loader";
import Modal from "#components/UI/Modal/Modal";
import OrderInfo from "#components/OrderInfo/OrderInfo";
import AddOrderForm from "#components/Forms/AddOrderForm/AddOrderForm";
import OrdersList from "#components/OrdersList/OrdersList";

import IAssortmentCategory from "#interfaces/IAssortmentCategory";
import ICourier from "#interfaces/ICourier";
import IOrder from "#interfaces/IOrder";

import { SOCKET_URL } from "#utils/consts";
import SetFocusOnCoord from "#utils/SetFocusOnCoord";

const APIKey = import.meta.env.VITE_MAP_API_KEY;
const APISuggestKey = import.meta.env.VITE_MAP_SUGGEST_API_KEY;

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

interface PlacemarkType extends ymaps.Map {
    geometry?: { _coordinates: [number, number] }
}

const orderColors: Record<string, string> = {
    "free": "red",
    "progress": "green"
}

const CoolMap = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const mapRef = useRef<ymaps.Map | null>(null);
    const creatorPlacemarkRef = useRef<PlacemarkType | null>(null);
    const searchControlRef = useRef<SearchControlType | null>(null);

    const [couriers, setCouriers] = useState<ICourier[]>([]);
    const [creatorPlacemark, setCreatorPlacemark] = useState<React.ReactNode>(null);
    const [targetCourier, setTargetCourier] = useState<ICourier | null>(null);

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [targetOrder, setTargetOrder] = useState<IOrder | null>(null);

    const [modalOrderInfo, setModalOrderInfo] = useState<boolean>(false);
    const [modalOrderCreate, setModalOrderCreate] = useState<boolean>(false);

    const {
        data: ordersData,
        loading,
        error,
    } = useFetching<IOrder[]>(useCallback(() => {
        if (user.currentBranch!.id) {
            return OrderService.GetActiveOrders(user.currentBranch!.id)
        } else {
            throw new Error("Branch ID is undefined");
        }
    }, [user.currentBranch!.id]));

    const {
        data: assortmentData,
        loading: assortmentLoading,
        error: assortmentError,
    } = useFetching<IAssortmentCategory[]>(useCallback(() => {
        if (user.currentBranch!.id) {
            return ProductService.GetAssortment(user.currentBranch!.business_id)
        } else {
            throw new Error("Branch ID is undefined");
        }
    }, [user.currentBranch!.id]));

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

    useEffect(() => {
        if (ordersData) {
            setOrders(ordersData)
        }
    }, [ordersData])

    const addCreatorPlacemark = (coords: number[]) => {
        setCreatorPlacemark(
            <Placemark
                onClick={() => setModalOrderCreate(true)}
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

    const handleOrderPlacemarkClick = (order: IOrder) => {
        setTargetOrder(order)
        setModalOrderInfo(true)
        SetFocusOnCoord(mapRef, order.coords.lat, order.coords.long)
    }

    if (loading || assortmentLoading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>
    }

    if (assortmentError) {
        return <div>{assortmentError}</div>
    }
    
    return (
        <div className="map-wrapper">
            <Modal
                visible={modalOrderInfo}
                setVisible={setModalOrderInfo}
            >
                {targetOrder && 
                    <OrderInfo 
                        order={targetOrder}
                        setVisible={setModalOrderInfo}
                        setOrders={setOrders}
                    />
                }
            </Modal>
            <Modal
                visible={modalOrderCreate}
                setVisible={setModalOrderCreate}
            >
                {creatorPlacemarkRef.current !== null && <AddOrderForm
                    couriers={couriers}
                    lat={creatorPlacemarkRef.current.geometry?._coordinates[1]!}
                    long={creatorPlacemarkRef.current.geometry?._coordinates[0]!}
                    visible={modalOrderCreate}
                    setVisible={setModalOrderCreate}
                    assortment={assortmentData!}
                    setOrders={setOrders}
                    setCreatorPlacemark={setCreatorPlacemark}
                />}
            </Modal>

            <div className="menu">
                <CouriersSelect
                    mapRef={mapRef}
                    couriers={couriers}
                    setTargetCourier={setTargetCourier}
                />

                <OrdersList
                    orders={orders}
                    targetCourier={targetCourier}
                    handleOrderClick={handleOrderPlacemarkClick}
                />
            </div>
            <YMaps
                query={{
                    apikey: APIKey,
                    suggest_apikey: APISuggestKey,
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
                        
                        <Button
                            options={{ maxWidth: 128, selectOnClick: false }}
                            data={{ content: "Создать заказ" }}
                            onClick={() => {
                                const coords = mapRef.current!.getCenter();

                                if (coords) {
                                    addCreatorPlacemark(coords);
                                }
                            }} 
                        />
                        
                        <Clusterer
                            options={{
                                preset: "islands#invertedBlueClusterIcons",
                                groupByCoordinates: false,
                            }}
                        >
                            {orders.map((order, index) => {
                                if ((targetCourier === null || targetCourier.id === order.courier_id)) {
                                    return <Placemark
                                            key={order.id}
                                            geometry={{
                                                type: 'Point',
                                                coordinates: [order.coords.lat, order.coords.long]
                                            }}
                                            options={{
                                                preset: 'islands#dotIcon',
                                                iconColor: orderColors[order.status],
                                            }} 
                                            properties={{
                                                hintContent: `Заказ ${index + 1}`,
                                            }}
                                            onClick={() => handleOrderPlacemarkClick(order)}
                                        />
                                    }
                                })
                            }
                        </Clusterer>

                        <CouriersPlacemarks couriers={couriers} />
                        
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
