import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreateBusinessForm.scss";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Toast from "#components/UI/Toast/Toast";

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

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const onSubmit: SubmitHandler<CreateBusinessField> = async (data) => {
        try {
            if (isCreating) 
                return

            setIsCreating(true)

            const response = await BusinessService.Create(data.name)

            if (response.status === 200) {
                setToastMessage(`Сеть "${data.name}" успешно создана`)
                setBusinesses(prev => {
                    if (!prev) {
                        return [response.data]
                    }
                    else {
                        return [response.data, ...prev]
                    }
                })
            }
        }
        catch (error) {
            setToastMessage(`Произошла ошибка при создании сети`)
        } finally {
            setIsCreating(false)
            setModalVisible(false)
        }
        
    };

    return (
        <>
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
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            )}
        </>
    );
};

export default CreateBusinessForm;
