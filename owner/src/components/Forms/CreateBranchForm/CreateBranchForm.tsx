import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";

import useDebouncing from "#hooks/useDebouncing";

import CityService from "#services/CityService";
import BranchService from "#services/BranchService";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import darkSelectConfig from "#utils/darkSelectConfig";

import IBusiness from "#interfaces/IBusiness";
import IBranch from "#interfaces/IBranch";
import Option from "#interfaces/Option";
import { useDispatch } from "react-redux";
import { addToast } from "#store/toastSlice";

interface CreateBranchField {
    name: string;
}

interface CreateBranchFormProps {
    business: IBusiness;
    setBranches: React.Dispatch<React.SetStateAction<IBranch[]>>;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBranchForm: FC<CreateBranchFormProps> = ({ setModalVisible, business, setBranches }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateBranchField>({ mode: "onBlur" });

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<{ value: string; label: string } | null>(null);
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
        if (debouncedSearchCity) {
            fetchCities();
        }
    }, [debouncedSearchCity]);

    useEffect(() => {
        fetchCities();
    }, [])

    const onSubmit: SubmitHandler<CreateBranchField> = async (data) => {
        try {
            if (!selectedCity) {
                dispatch(addToast("Вы не выбрали город филиала"))
                return
            }
            
            const response = await BranchService.CreateBranch(data.name, business.id, Number(selectedCity.value))

            if (response.status === 200) {
                setBranches((prev) => [response.data, ...prev])
                dispatch(addToast(`Бизнес ${data.name} успешно создан`))
            }

        } catch (error) {
            dispatch(addToast(`Произошла ошибка при создании бизнеса`))
            console.log(error);
        } finally {
            setIsCreating(false);
            setModalVisible(false);
            reset()
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
                styles={darkSelectConfig}
            />

            <CoolButton disabled={isCreating}>Создать</CoolButton>
        </form>
    );
};

export default CreateBranchForm;
