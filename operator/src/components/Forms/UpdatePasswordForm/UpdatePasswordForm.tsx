import { useEffect, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "#store/store";
import "./UpdatePasswordForm.scss";

import ProfileInput from "#components/UI/ProfileInput/ProfileInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import IUser from "#interfaces/IUser";

import AuthService from "#services/AuthService";

import { addToast } from "#store/toastSlice";

interface UpdatePasswordField {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const UpdatePasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<UpdatePasswordField>({ mode: "onBlur" });

    const dispatch = useDispatch<AppDispatch>();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const onSubmit: SubmitHandler<UpdatePasswordField> = async (data) => {
        try {
            if (isEditing) return;

            setIsEditing(true);

            const response = await AuthService.UpdatePassword(data.oldPassword, data.newPassword)

            if (response.status === 200) {
                dispatch(addToast(`Пароль успешно обновлен`));
            }
            
        } catch (error: any) {
            dispatch(
                addToast(
                    error.response?.data?.message ||
                        "Произошла ошибка при обновлении пароля"
                )
            );
        } finally {
            setIsEditing(false);
            reset()
        }
    };

    return (
        <div className="update-password__form-container">
            <h3>Обновить пароль</h3>

            <p className="action__description">
                Убедитесь, что ваш аккаунт использует длинный, случайный пароль
                для обеспечения безопасности.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <ProfileInput
                    label="Текущий пароль"
                    placeholder="Введите Ваш пароль"
                    type="password"
                    autoComplete="current-password"
                    register={register("oldPassword", {
                        required: "Введите пароль",
                    })}
                    error={errors.oldPassword}
                />

                <ProfileInput
                    label="Новый пароль"
                    placeholder="Введите новый пароль"
                    type="password"
                    autoComplete="new-password"
                    register={register("newPassword", {
                        required: "Введите пароль",
                        minLength: {
                            value: 6,
                            message: "Пароль должен быть не менее 6 символов",
                        },
                        maxLength: {
                            value: 32,
                            message: "Пароль должен быть не более 32 символов",
                        },
                        validate: (val: string) => {
                            if (watch("oldPassword") == val) {
                                return "Новый пароль должен отличаться от текущего";
                            }
                        },
                    })}
                    error={errors.newPassword}
                />

                <ProfileInput
                    label="Подтвердите пароль"
                    placeholder="Повторите новый пароль"
                    type="password"
                    autoComplete="new-password"
                    register={register("confirmNewPassword", {
                        required: "Повторите пароль",
                        validate: (val: string) => {
                            if (watch("newPassword") != val) {
                                return "Пароли не совпадают";
                            }
                        },
                    })}
                    error={errors.confirmNewPassword}
                />

                <CoolButton>Сохранить</CoolButton>
            </form>
        </div>
    );
};

export default UpdatePasswordForm;
