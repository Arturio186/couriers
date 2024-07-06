import { useEffect, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "#store/store";
import "./ProfileForm.scss";

import ProfileInput from "#components/UI/ProfileInput/ProfileInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";
import Loader from "#components/UI/Loader/Loader";

import IUser from "#interfaces/IUser";

import useFetching from "#hooks/useFetching";
import AuthService from "#services/AuthService";

import { setUser } from "#store/userSlice";
import { addToast } from "#store/toastSlice";

interface ProfileFormField {
    name: string;
    surname: string;
    email: string;
}

const ProfileForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<ProfileFormField>({ mode: "onBlur" });

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { data, loading, error } = useFetching<IUser>(
        useCallback(() => AuthService.GetUserInfo(), [])
    );

    useEffect(() => {
        if (data) {
            dispatch(setUser(data))
            setValue('email', data.email)
            setValue('name', data.firstName)
            setValue('surname', data.lastName)
        }
    }, [data])

    const onSubmit: SubmitHandler<ProfileFormField> = async (data) => {
        try {
            if (isEditing) return

            setIsEditing(true)

            const response = await AuthService.EditProfile(data.name, data.surname, data.email)

            if (response.status === 200) {
                dispatch(setUser(response.data))
                console.log(response.data)
                console.log(user)
                dispatch(addToast(`Информация обновлена`));
            }
        }
        catch (error: any) {
            dispatch(addToast(error.response?.data?.message || "Произошла ошибка при изменении информации"));
            console.log(error)
        }
        finally {
            setIsEditing(false)
        }
    };

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile__form-container">
            <h3>Информация профиля</h3>

            <div className="action__description">
                {user.data.isActivated ? 
                    <p style={{ color: '#00FF7F' }}>Email адрес подтвержден</p> : 
                    <p style={{ color: '#EE204D' }}>Email адрес не подтвержден</p>
                }
            </div>

            <p className="action__description">
                Обновите информацию профиля и адрес электронной почты вашей учетной записи.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <ProfileInput
                    label="Имя"
                    placeholder="Введите имя"
                    type="text"
                    register={register("name", {
                        required: "Введите имя",
                        maxLength: {
                            value: 50,
                            message: "Имя должно быть не более 50 символов",
                        },
                    })}
                    error={errors.name}
                />

                <ProfileInput
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    type="text"
                    register={register("surname", {
                        maxLength: {
                            value: 50,
                            message: "Фамилия должна быть не более 50 символов",
                        },
                    })}
                    error={errors.surname}
                />

                <ProfileInput
                    label="E-Mail"
                    placeholder="Введите email"
                    type="email"
                    register={register("email", {
                        required: "Введите email",
                    })}
                    error={errors.surname}
                />

                <CoolButton>Сохранить</CoolButton>
            </form>
        </div>
    );
};

export default ProfileForm;
