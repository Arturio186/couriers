import { FC } from "react";
import { Placemark } from "@pbe/react-yandex-maps";

import ICourier from "#interfaces/ICourier";

interface CouriersPlacemarksProps {
    couriers: ICourier[];
}

const CouriersPlacemarks: FC<CouriersPlacemarksProps> = ({ couriers }) => {
    return (
        <>
            {couriers.map((courier) => {
                if (courier.lat === -1 || courier.long === -1) {
                    return null;
                }

                return (
                    <Placemark
                        key={courier.id}
                        geometry={{
                            type: "Point",
                            coordinates: [courier.lat, courier.long],
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
        </>
    );
};

export default CouriersPlacemarks;
