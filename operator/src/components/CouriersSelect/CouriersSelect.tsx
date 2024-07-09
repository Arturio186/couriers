import { FC, useState, useEffect } from "react";
import Select from "react-select";
import "./CouriersSelect.scss";
import darkSelectConfig from "#utils/darkSelectConfig";

import ICourier from "#interfaces/ICourier";
import Option from "#interfaces/Option";

interface CouriersSelectProps {
    couriers: ICourier[];
    mapRef: React.MutableRefObject<ymaps.Map | null>
}

const setFocusOnCoord = (mapRef: React.MutableRefObject<ymaps.Map | null>, lat: number, long: number) => {
    if (lat === -1 || long === -1) {
        return
    }
    
    if (mapRef.current?.setCenter) {
        mapRef.current.setCenter([lat, long], mapRef.current.getZoom(), {
            duration: 300
        })
    }
}

const CouriersSelect: FC<CouriersSelectProps> = ({ couriers, mapRef }) => {
    const [couriersOptions, setCouriersOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        setCouriersOptions(
            couriers.map((courier) => {
                return {
                    value: courier.id,
                    label: `${courier.firstName} ${courier.lastName}`,
                };
            })
        );

        console.log(couriersOptions);
    }, [couriers]);

    useEffect(() => {
        if (selectedOption?.value === "") {
            return
        }

        const courier = couriers.find(c => c.id === selectedOption?.value)

        if (courier) {
            setFocusOnCoord(mapRef, courier.lat, courier.long)
        }

    }, [selectedOption])

    return (
        <div>
            <Select
                value={selectedOption}
                options={[
                    { label: "Все курьеры", value: "" },
                    ...couriersOptions,
                ]}
                onChange={(selected) =>
                    setSelectedOption(selected)
                }
                placeholder="Выберите курьера..."
                styles={darkSelectConfig}
            />
        </div>
    );
};

export default CouriersSelect;
