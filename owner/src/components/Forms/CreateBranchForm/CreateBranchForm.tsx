import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";

import "./CreateBranchForm.scss";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

interface Option {
    value: string;
    label: string;
}

interface CreateBranchField {
    name: string;
    city: { value: string; label: string } | null;
}

interface CreateBranchFormProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBranchForm: FC<CreateBranchFormProps> = ({ setModalVisible }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateBranchField>({ mode: "onBlur" });

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<{
        value: string;
        label: string;
    } | null>(null);

    const [cityOptions, setCityOptions] = useState<Option[]>([
        { value: "branch1", label: "Филиал 1" },
        { value: "branch2", label: "Филиал 2" },
    ])

    const onSubmit: SubmitHandler<CreateBranchField> = async (data) => {
        try {
            if (!selectedCity) {
                alert("Выберите город")
                return
            }

            console.log(data);
            console.log(selectedCity)
        } catch (error) {
            console.log(error);
        } finally {
            setIsCreating(false);
            setModalVisible(false);
        }
    };

    return (
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <h4>Создание нового филиала</h4>

            <CoolInput
                label="Название"
                type="text"
                register={register("name", {
                    required: "Введите название",
                })}
                error={errors.name}
            />

            <Select
                options={cityOptions}
                value={selectedCity}
                onChange={(selectedOption) => setSelectedCity(selectedOption)}
                placeholder="Выберите город..."
                styles={{
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: "#2b2b2b", // Background color
                        borderColor: "#555555", // Border color
                        minHeight: "40px", // Control height
                        boxShadow: "none", // Remove default box shadow
                        "&:hover": {
                            borderColor: "#555555", // Hover border color
                        },
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? "#444" : "#2b2b2b", // Selected and default background color
                        "&:hover": {
                            backgroundColor: "#555", // Hover background color
                        },
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: "#ffffff", // Text color
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: "#999999", // Placeholder color
                    }),
                    menu: (provided) => ({
                        ...provided, 
                        backgroundColor: "#2b2b2b",
                    }),
                    input: (provided) => ({
                        ...provided,
                        color: "#fff",
                    })
                }}
            />

            <CoolButton disabled={isCreating}>Создать</CoolButton>
        </form>
    );
};

export default CreateBranchForm;
