import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";

import useDebouncing from "#hooks/useDebouncing";

import CityService from "#services/CityService";
import BranchService from "#services/BranchService";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import IBusiness from "#interfaces/IBusiness";
import IBranch from "#interfaces/IBranch";

interface Option {
    value: string;
    label: string;
}

interface EditBranchField {
    name: string;
}

interface EditBranchFormProps {
    business?: IBusiness;
    branch: IBranch | null;
    refetchBranches: (...args: any[]) => Promise<void>
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBranchForm : FC<EditBranchFormProps> = ({ business, branch, refetchBranches, setModalVisible }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<EditBranchField>({ mode: "onBlur" });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<{ value: string; label: string } | null>();

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
        setSelectedCity({ 
            value: branch ? branch.city_id.toString() : "-1",
            label: `${branch?.city_name} ` + (branch?.region === "" ? "" : `(${branch?.region})`) 
        });
        setValue('name', branch ? branch.name : "")
    }, [branch]);

    useEffect(() => {
        if (debouncedSearchCity) {
            fetchCities();
        }
    }, [debouncedSearchCity]);

    useEffect(() => {
        fetchCities();
    }, [])

    const onSubmit: SubmitHandler<EditBranchField> = async (data) => {
        try {
            if (!selectedCity) {
                alert("Выберите город")
                return
            }

            if (!business) {
                alert("Бизнес не найден")
                return
            }

            if (!branch) {
                alert("Филиал не найден")
                return
            }

            console.log({
                data,
                selectedCity, 
                business,
                branch
            })

            const response = await BranchService.UpdateBranch(business.id, branch.id, data.name, Number(selectedCity.value))

            if (response.status === 200) {
                console.log(response.data)
                await refetchBranches()
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsEditing(false);
            setModalVisible(false);
        }
    };


    
    return (
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
            <h4>Изменение информации о филиале</h4>

            <CoolInput
                label="Название"
                type="text"
                register={register("name", {
                    required: "Введите название"
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
                        backgroundColor: "#2b2b2b", 
                        borderColor: "#555555", 
                        minHeight: "40px", 
                        boxShadow: "none", 
                        "&:hover": {
                            borderColor: "#555555", 
                        },
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? "#444" : "#2b2b2b", 
                        "&:hover": {
                            backgroundColor: "#555", 
                        },
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        color: "#ffffff",
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        color: "#999999",
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

            <CoolButton disabled={isEditing}>Изменить</CoolButton>
        </form>
    );
};

export default EditBranchForm;
