import { FC, useState, useEffect } from "react";
import Select from "react-select";
import "./CouriersSelect.scss";

import ICourier from "#interfaces/ICourier";
import Option from "#interfaces/Option";

import SetFocusOnCoord from "#utils/SetFocusOnCoord";
import darkSelectConfig from "#utils/darkSelectConfig";

interface CouriersSelectProps {
    couriers: ICourier[];
    mapRef: React.MutableRefObject<ymaps.Map | null>
    setTargetCourier: React.Dispatch<React.SetStateAction<ICourier | null>>;
}

const CouriersSelect: FC<CouriersSelectProps> = ({ couriers, mapRef, setTargetCourier }) => {
    const [couriersOptions, setCouriersOptions] = useState<Option[]>([
        { label: "Все курьеры", value: null }
    ]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        setCouriersOptions([
                { label: "Все курьеры", value: null },
                ...couriers.map((courier) => {
                    return {
                        value: courier.id,
                        label: `${courier.firstName} ${courier.lastName}`,
                    };
                })]
        );

        const defaultOption = couriersOptions.find(o => o.value === null)
        
        if (defaultOption) {
            setSelectedOption(defaultOption)
        }

    }, [couriers.length]);

    useEffect(() => {
        if (selectedOption?.value === null) {
            setTargetCourier(null)
            return
        }

        const courier = couriers.find(c => c.id === selectedOption?.value)

        if (courier) {
            setTargetCourier(courier)
            SetFocusOnCoord(mapRef, courier.lat, courier.long)
        }

    }, [selectedOption])

    return (
        <div>
            <Select
                value={selectedOption}
                options={couriersOptions}
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
