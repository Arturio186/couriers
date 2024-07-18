import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import { formatISO } from "date-fns";
import "./AddOrderForm.scss";

import { RootState } from "#store/store";
import { addToast } from "#store/toastSlice";

import OrderService from "#services/OrderService";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import DateTimePicker from "#components/UI/DateTimePicker/DateTimePicker";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Loader from "#components/UI/Loader/Loader";


import ICourier from "#interfaces/ICourier";
import Option from "#interfaces/Option";
import IOrder from "#interfaces/IOrder";
import IAssortmentCategory from "#interfaces/IAssortmentCategory";
import IAssortmentProduct from "#interfaces/IAssortmentProduct";
import AddOrderProduct from "#interfaces/request/AddOrderProduct";
import AddOrderRequest from "#interfaces/request/AddOrderRequest";

import darkSelectConfig from "#utils/darkSelectConfig";

const APIKey = import.meta.env.VITE_MAP_API_KEY;

interface AddOrderFormProps {
    couriers: ICourier[];
    lat: number;
    long: number;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    assortment: IAssortmentCategory[];
    setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
    setCreatorPlacemark: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

interface IAddOrderField {
    address: string;
    note: string;
    client_name: string;
    client_phone: string;
    delivery_time: Date;
    products: AddOrderProduct[];
}

const AddOrderForm: FC<AddOrderFormProps> = ({
    couriers,
    lat,
    long,
    visible,
    setVisible,
    assortment,
    setOrders,
    setCreatorPlacemark
}) => {
    const dispatch = useDispatch()

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<IAddOrderField>({ mode: "onChange" });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [couriersOptions, setCouriersOptions] = useState<Option[]>([
        { label: "Не выбран", value: null },
    ]);

    const [geoCodeLoading, setGeoCodeLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [productOptions, setProductOptions] = useState<{
        [key: string]: IAssortmentProduct[];
    }>({});

    const user = useSelector((state: RootState) => state.user);

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
                setGeoCodeLoading(true);

                const response = await fetch(
                    `https://geocode-maps.yandex.ru/1.x/?apikey=${APIKey}&geocode=${lat},${long}&format=json&results=2`
                );

                if (response.status === 200) {
                    const result = await response.json();
                    setValue(
                        "address",
                        result.response.GeoObjectCollection.featureMember[0]
                            .GeoObject.name
                    );
                }

                setGeoCodeLoading(false);
            })();
        }
        else {
            reset({
                address: "",
                note: "",
                client_name: "",
                client_phone: "",
                products: [{ id: "", quantity: 1 }]
            });
            setSelectedDate(null);
            setSelectedOption({ label: "Не выбран", value: null });
            setSelectedCategories([]);
        }
       
    }, [visible]);

    useEffect(() => {
        const initialProductOptions: { [key: string]: IAssortmentProduct[] } =
            {};
        assortment.forEach((category) => {
            initialProductOptions[category.id] = category.products;
        });
        setProductOptions(initialProductOptions);
    }, [assortment]);

    const onSubmit: SubmitHandler<IAddOrderField> = async (data) => {
        const formattedData: AddOrderRequest = {
            ...data,
            delivery_time: selectedDate ? formatISO(selectedDate) : null,
            courier_id: selectedOption?.value,
            branch_id: user.currentBranch?.id,
            lat,
            long
        };

        if (formattedData.products.length === 0) {
            alert("Добавьте к заказу хотя бы один товар")
            return
        }

        if (formattedData.products.some(p => p.id === "")) {
            alert("Некорректный список товаров")
            return
        }

        try {
            const response = await OrderService.AddOrder(formattedData)

            if (response.status === 200) {
                dispatch(addToast("Заказ создан"))
    
                setOrders(prev => [
                    response.data,
                    ...prev
                ])
            }
        }
        catch (error: any) {
            dispatch(addToast(error.response?.data?.message || "Произошла ошибка при создании заказа"));
        } finally {
            setVisible(false)
            setCreatorPlacemark(false)
        }
    };

    const handleCategoryChange = (index: number, categoryId: string) => {
        setSelectedCategories((prevState) => {
            const newState = [...prevState];
            newState[index] = categoryId;
            return newState;
        });
        setValue(`products.${index}.id`, "");
    };

    if (geoCodeLoading) {
        return <Loader />;
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
                <div className="right">
                    <h3>Продукты</h3>
                    <div className="centered">
                        {fields.map((product, index) => (
                            <div key={product.id}>
                                <div className="simpleInputs">
                                    <select onChange={(e) =>handleCategoryChange(index, e.target.value)}>
                                        <option value="" disabled selected>
                                            Выберите категорию
                                        </option>
                                        {assortment.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        {...register(`products.${index}.id`)}
                                    >
                                        <option value="">
                                            Выберите продукт
                                        </option>
                                        {selectedCategories[index] &&
                                            productOptions[
                                                selectedCategories[index]
                                            ]?.map((product) => (
                                                <option
                                                    key={product.id}
                                                    value={product.id}
                                                >
                                                    {product.name}
                                                </option>
                                            ))}
                                    </select>
                                    <input
                                        className="quantity"
                                        type="number"
                                        min="1"
                                        {...register(
                                            `products.${index}.quantity`
                                        )}
                                    />
                                    <button onClick={() => remove(index)}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CoolButton
                        onClick={(e) => {
                            e.preventDefault();
                            append({ id: "", quantity: 1 });
                        }}
                    >
                        Добавить
                    </CoolButton>
                </div>
            </div>
            <CoolButton>Создать</CoolButton>
        </form>
    );
};

export default AddOrderForm;
