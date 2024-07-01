import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import "./CreateBranchForm.scss";

import useDebouncing from "#hooks/useDebouncing";

import CityService from "#services/CityService";

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
    const [selectedCity, setSelectedCity] = useState<{ value: string; label: string } | null>(null);
    const [cityOptions, setCityOptions] = useState<Option[]>([])

    const [searchCity, setSearchCity] = useState<string>("");
    const debouncedSearchCity = useDebouncing(searchCity, 500);

    const fetchCities = async () => {
        try {
            const response = await CityService.FindCities(searchCity);
            
            const newOptions = response.data.map((city) => {
                    return {
                        value: city.id.toString(),
                        label: `${city.name} ` + (city.region === "" ? "" : `(${city.region})`)
                    }
                }
            )

            setCityOptions(newOptions)
        } catch (error) {
            console.error("Ошибка при получении списка городов: ", error);
        }
    };

    useEffect(() => {
        if (debouncedSearchCity) {
            fetchCities();
        }
    }, [debouncedSearchCity]);

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
                onInputChange={(value) => setSearchCity(value)}
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
