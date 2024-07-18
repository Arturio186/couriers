import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import "./EditBusinessForm.scss";

import { addToast } from "#store/toastSlice";

import BusinessService from "#services/BusinessService";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import IBusiness from "#interfaces/IBusiness";

interface EditBusinessField {
    name: string;
}

interface EditBusinessFormProps {
    business: IBusiness;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setBusinesses: React.Dispatch<React.SetStateAction<IBusiness[] | null>>;
}

const EditBusinessForm: FC<EditBusinessFormProps> = ({
    business,
    setModalVisible,
    setBusinesses
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<EditBusinessField>({ mode: "onBlur" });

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    
    const dispatch = useDispatch()

    useEffect(() => {
        setValue('name', business.name);
    }, [business]);


    const onSubmit: SubmitHandler<EditBusinessField> = async (data) => {
        try {
            if (isUpdating) 
                return

            setIsUpdating(true)

            const response = await BusinessService.UpdateBusiness(business.id, data.name)

            if (response.status === 200) {
                setBusinesses(prev => {
                    if (!prev) return null

                    return prev?.map(b => {
                        if (b.id === business.id) {
                            b = response.data;
                        }
                        return b
                    })
                })

                dispatch(addToast("Сеть успешно изменена"))
            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setIsUpdating(false)
            setModalVisible(false)
        }
    };

    return (
        <>
            <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
                <h4>Изменение информации о сети</h4>

                <CoolInput
                    label="Название"
                    type="text"
                    register={register("name", {
                        required: "Введите название",
                    })}
                    error={errors.name}
                />

                <CoolButton disabled={isUpdating}>Изменить</CoolButton>
            </form>
        </>
    );
};

export default EditBusinessForm; 