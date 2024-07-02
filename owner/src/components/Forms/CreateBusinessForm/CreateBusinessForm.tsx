import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./CreateBusinessForm.scss";

import { addToast } from "#store/toastSlice";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import BusinessService from "#services/BusinessService";

import IBusiness from "#interfaces/IBusiness";


interface CreateBusinessField {
    name: string;
}

interface CreateBusinessFormProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setBusinesses: React.Dispatch<React.SetStateAction<IBusiness[] | null>>;
}

const CreateBusinessForm: FC<CreateBusinessFormProps> = ({ 
    setModalVisible,
    setBusinesses
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateBusinessField>({ mode: "onBlur" });

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const dispatch = useDispatch()

    const onSubmit: SubmitHandler<CreateBusinessField> = async (data) => {
        try {
            if (isCreating) 
                return

            setIsCreating(true)

            const response = await BusinessService.CreateBusiness(data.name)

            if (response.status === 200) {
                setBusinesses(prev => {
                    if (!prev) {
                        return [response.data]
                    }
                    else {
                        return [response.data, ...prev]
                    }
                })

                dispatch(addToast(`Бизнес ${response.data.name} успешно создан`));
            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setIsCreating(false)
            setModalVisible(false)
        }
    };

    return (
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <h4>Создание новой сети</h4>

            <CoolInput
                label="Название"
                type="text"
                register={register("name", {
                    required: "Введите название",
                })}
                error={errors.name}
            />

            <CoolButton disabled={isCreating}>Создать</CoolButton>
        </form>
    );
};

export default CreateBusinessForm;
