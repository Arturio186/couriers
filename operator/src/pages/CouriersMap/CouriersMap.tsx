import React, { useRef } from "react";
import { YMaps, Map, Placemark, Button, Clusterer, SearchControl } from "@pbe/react-yandex-maps";
import { useSelector } from "react-redux";
import './CouriersMap.scss'

import { RootState } from "#store/store";

const CouriersMap = () => {
    const user = useSelector((state: RootState) => state.user);

    const mapRef = useRef<ymaps.Map | null>(null);

    return (
        <>
            <h2>Интерактивная карта</h2>
            <div className="map-wrapper">
                <div className="menu">
                    HEY
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
                                    user.currentBranch?.coords.lat || 0,
                                    user.currentBranch?.coords.long || 0
                                ],
                                zoom: 15,
                                controls: [],
                            }}
                            instanceRef={(map) => mapRef.current = map}
                            options={{ suppressMapOpenBlock: true }}
                        >
                            
                        </Map>
                    </div>
                </YMaps>
            </div>
        </>
    );
};

export default CouriersMap;
