import { FC, useState, useEffect } from "react";
import Select from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { formatISO } from "date-fns";
import "./AddOrderForm.scss";

const APIKey = import.meta.env.VITE_MAP_API_KEY;

import ICourier from "#interfaces/ICourier";
import CoolInput from "#components/UI/CoolInput/CoolInput";
import DateTimePicker from "#components/UI/DateTimePicker/DateTimePicker";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Option from "#interfaces/Option";
import darkSelectConfig from "#utils/darkSelectConfig";
import Loader from "#components/UI/Loader/Loader";

interface AddOrderFormProps {
    couriers: ICourier[];
    lat: number;
    long: number;
    visible: boolean;
}

interface IAddOrderField {
    address: string;
    note: string;
    client_name: string;
    client_phone: string;
    delivery_time: Date;
}

const AddOrderForm: FC<AddOrderFormProps> = ({ couriers, lat, long, visible }) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IAddOrderField>({ mode: "onChange" });

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [couriersOptions, setCouriersOptions] = useState<Option[]>([
        { label: "Не выбран", value: null },
    ]);

    const [geoCodeLoading, setGeoCodeLoading] = useState(false);

    useEffect(() => {
        setCouriersOptions([
            { label: "Не выбран", value: null },
            ...couriers.map((courier) => {
                return {
                    value: courier.id,
                    label: `${courier.firstName} ${courier.lastName}`,
                };
            }),
        ]);

        const defaultOption = couriersOptions.find((o) => o.value === null);

        if (defaultOption) {
            setSelectedOption(defaultOption);
        }
    }, [couriers.length]);

    useEffect(() => {
        if (visible) {
            (async () => {
                setGeoCodeLoading(true)

                const response = await fetch(
                    `https://geocode-maps.yandex.ru/1.x/?apikey=${APIKey}&geocode=${long},${lat}&format=json&results=2`);

                if (response.status === 200) {
                    const result = await response.json();
                    setValue("address", result.response.GeoObjectCollection.featureMember[0].GeoObject.name);
                }
                
                setGeoCodeLoading(false)
            })();
        }
    }, [visible]);

    const onSubmit: SubmitHandler<IAddOrderField> = async (data) => {
        const formattedData = {
            ...data,
            delivery_time: selectedDate ? formatISO(selectedDate) : null,
            courier_id: selectedOption?.value,
        };
    };

    if (geoCodeLoading) {
        return <Loader />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="add-order__form">
            <h2>Создание нового заказа</h2>

            <div className="columns">
                <div className="left">
                    <CoolInput
                        label="Адрес"
                        type="text"
                        register={register("address", {
                            required: "Введите адрес",
                        })}
                        error={errors.address}
                    />

                    <CoolInput
                        label="Примечание"
                        type="text"
                        register={register("note")}
                        error={errors.note}
                    />

                    <CoolInput
                        label="Имя клиента"
                        type="text"
                        register={register("client_name", {
                            required: "Введите имя клиента",
                        })}
                        error={errors.client_name}
                    />

                    <CoolInput
                        label="Телефон клиента"
                        type="text"
                        register={register("client_phone", {
                            required: "Введите номер клиента",
                        })}
                        error={errors.client_phone}
                    />

                    <div className="form__group">
                        <label>Доставить до</label>
                        <DateTimePicker
                            selectedDate={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                setValue("delivery_time", date!);
                            }}
                        />
                    </div>

                    <div className="form__group">
                        <label>Курьер</label>
                        <Select
                            value={selectedOption}
                            options={couriersOptions}
                            styles={darkSelectConfig}
                            onChange={(selected) => setSelectedOption(selected)}
                        />
                    </div>
                </div>
                <div className="right">Товары</div>
            </div>
            <CoolButton>Создать</CoolButton>
        </form>
    );
};

export default AddOrderForm;
