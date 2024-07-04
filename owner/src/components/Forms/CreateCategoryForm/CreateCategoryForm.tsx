import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./CreateCategoryForm.scss";

import { addToast } from "#store/toastSlice";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import CategoryService from "#services/CategoryService";

import ICategory from "#interfaces/ICategory";
import IBusiness from "#interfaces/IBusiness";

interface CreateCategoryField {
    name: string;
}

interface CreateCategoryFormProps {
    business: IBusiness;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

const CreateCategoryForm: FC<CreateCategoryFormProps> = ({ 
    business,
    setModalVisible,
    setCategories 
}) => {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategoryField>({ mode: "onBlur" });

    const [isCreating, setIsCreating] = useState<boolean>(false);
    
    const onSubmit: SubmitHandler<CreateCategoryField> = async (data) => {
        try {
            if (isCreating) 
                return

            setIsCreating(true)

            const response = await CategoryService.CreateCategory(business.id, data.name)

            if (response.status === 200) {
                setCategories(prev => [response.data, ...prev])
                dispatch(addToast(`Категория ${response.data.name} успешно добавлена`));
            }
        }
        catch (error) {
            dispatch(addToast(`Ошибка при добавлении категории`));
            console.log(error)
        } finally {
            setIsCreating(false)
            setModalVisible(false)
        }
    };


    return (
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <h4>Добавление новой категории</h4>

            <CoolInput
                label="Название"
                type="text"
                register={register("name", {
                    required: "Введите название",
                })}
                error={errors.name}
            />

            <CoolButton disabled={isCreating}>Добавить</CoolButton>
        </form>
    );
};

export default CreateCategoryForm;
