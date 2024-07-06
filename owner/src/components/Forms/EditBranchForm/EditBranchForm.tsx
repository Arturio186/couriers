import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";

import useDebouncing from "#hooks/useDebouncing";

import { addToast } from "#store/toastSlice";

import CityService from "#services/CityService";
import BranchService from "#services/BranchService";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import darkSelectConfig from "#utils/darkSelectConfig";

import IBranch from "#interfaces/IBranch";
import Option from "#interfaces/Option";

interface EditBranchField {
    name: string;
}

interface EditBranchFormProps {
    branch: IBranch;
    setBranches: React.Dispatch<React.SetStateAction<IBranch[]>>;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBranchForm : FC<EditBranchFormProps> = ({ branch, setBranches, setModalVisible }) => {
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

    const dispatch = useDispatch()

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
                dispatch(addToast("Выберите город!"))
                return
            }

            const response = await BranchService.UpdateBranch(branch.id, data.name, Number(selectedCity.value))

            if (response.status === 200) {
                setBranches(prev => 
                    prev.map(b => b.id === branch.id ? { ...response.data, city_name: selectedCity.label, region: '' } : b)
                )
                dispatch(addToast("Сеть успешно изменена"))
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
                styles={darkSelectConfig}
            />

            <CoolButton disabled={isEditing}>Изменить</CoolButton>
        </form>
    );
};

export default EditBranchForm;
