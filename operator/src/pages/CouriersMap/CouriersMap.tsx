import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import './CouriersMap.scss'

import { RootState } from "#store/store";
import CoolMap from "#components/CoolMap/CoolMap";

const CouriersMap = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <h2>Интерактивная карта</h2>
            <div className="map-wrapper">
                <div className="menu">
                    {user.currentBranch?.id}
                </div>
                <CoolMap />
            </div>
        </>
    );
};

export default CouriersMap;
