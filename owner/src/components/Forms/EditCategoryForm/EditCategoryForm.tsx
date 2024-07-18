import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./EditCategoryForm.scss";

import { addToast } from "#store/toastSlice";

import CategoryService from "#services/CategoryService";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import ICategory from "#interfaces/ICategory";

interface EditCategoryField {
    name: string;
}

interface EditCategoryFormProps {
    category: ICategory;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const EditCategoryForm: FC<EditCategoryFormProps> = ({ 
    category,
    setModalVisible,
    setCategories 
}) => {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<EditCategoryField>({ mode: "onBlur" });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        setValue('name', category.name);
    }, [category]);

    const onSubmit: SubmitHandler<EditCategoryField> = async (data) => {
        try {
            if (isEditing) return

            setIsEditing(true)

            const response = await CategoryService.EditCategory(category.id, data.name)

            if (response.status === 200) {
                setCategories(prev => 
                    prev.map(c => c.id === category.id ? response.data : c)
                )
                dispatch(addToast(`Категория успешно изменена`));
            }
        }
        catch (error) {
            dispatch(addToast(`Ошибка при изменении категории`));
            console.log(error)
        } finally {
            setIsEditing(false)
            setModalVisible(false)
        }
    };

    return (
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <h4>Изменение информации о категории</h4>

            <CoolInput
                label="Название"
                type="text"
                register={register("name", {
                    required: "Введите название",
                })}
                error={errors.name}
            />

            <CoolButton disabled={isEditing}>Изменить</CoolButton>
        </form>
    );
};

export default EditCategoryForm;
