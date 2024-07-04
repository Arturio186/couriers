import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./CreateProductForm.scss";

import { addToast } from "#store/toastSlice";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import ProductService from "#services/ProductService";

import ICategory from "#interfaces/ICategory";
import IProduct from "#interfaces/IProduct";

interface CreateProductField {
    name: string;
    price: number;
}

interface CreateProductFormProps {
    category: ICategory;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const CreateProductForm: FC<CreateProductFormProps> = ({
    category,
    setModalVisible,
    setProducts,
}) => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProductField>({ mode: "onBlur" });

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const onSubmit: SubmitHandler<CreateProductField> = async (data) => {
        try {
            if (isCreating) return;

            setIsCreating(true);

            const response = await ProductService.CreateProduct(
                category.id,
                data.name,
                data.price
            );

            if (response.status === 200) {
                setProducts((prev) => [response.data, ...prev]);
                dispatch(
                    addToast(`Товар ${response.data.name} успешно добавлен`)
                );
            }
        } catch (error) {
            dispatch(addToast(`Ошибка при добавлении товара`));
            console.log(error);
        } finally {
            setIsCreating(false);
            setModalVisible(false);
        }
    };

    return (
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <h4>Добавление нового товара</h4>

            <CoolInput
                label="Название"
                type="text"
                register={register("name", {
                    required: "Введите название",
                })}
                error={errors.name}
            />

            <CoolInput
                label="Стоимость"
                type="number"
                register={register("price", {
                    required: "Введите название",
                    valueAsNumber: true,
                    validate: value => !isNaN(value) || "Стоимость должна быть числом"
                })}
                error={errors.price}
            />

            <CoolButton disabled={isCreating}>Добавить</CoolButton>
        </form>
    );
};

export default CreateProductForm;
