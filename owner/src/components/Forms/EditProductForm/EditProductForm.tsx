import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./EditProductForm.scss";

import { addToast } from "#store/toastSlice";

import ProductService from "#services/ProductService";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import IProduct from "#interfaces/IProduct";

interface EditProductField {
    name: string;
    price: number;
}

interface EditProductFormProps {
    product: IProduct;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const EditProductForm: FC<EditProductFormProps> = ({ 
    product,
    setProducts,
    setModalVisible
}) => {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<EditProductField>({ mode: "onBlur" });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setValue('name', product.name);
        setValue('price', product.price)
    }, [product]);

    const onSubmit: SubmitHandler<EditProductField> = async (data) => {
        try {
            if (isEditing) return

            setIsEditing(true)

            const response = await ProductService.EditProduct(product.id, data.name, data.price)

            if (response.status === 200) {
                setProducts(prev => 
                    prev.map(p => p.id === product.id ? response.data : p)
                )
                dispatch(addToast(`Товар успешно изменен`));
            }
        }
        catch (error) {
            dispatch(addToast(`Ошибка при изменении товара`));
            console.log(error)
        } finally {
            setIsEditing(false)
            setModalVisible(false)
            reset()
        }
    };

    return (
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <h4>Изменение информации о товара</h4>

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
                    required: "Введите стоимость",
                    valueAsNumber: true,
                    validate: value => !isNaN(value) || "Стоимость должна быть числом"
                })}
                error={errors.price}
            />

            <CoolButton disabled={isEditing}>Изменить</CoolButton>
        </form>
    );
};

export default EditProductForm;
