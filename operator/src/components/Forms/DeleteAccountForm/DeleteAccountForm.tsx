import { useEffect, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "#store/store";
import "./DeleteAccountForm.scss";

import ProfileInput from "#components/UI/ProfileInput/ProfileInput";
import CoolButton from "#components/UI/CoolButton/CoolButton";

import IUser from "#interfaces/IUser";

import AuthService from "#services/AuthService";

import { addToast } from "#store/toastSlice";
import { setUser, setAuth } from "#store/userSlice";

interface DeleteAccountField {
    password: string;
}

const DeleteAccountForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DeleteAccountField>({ mode: "onBlur" });

    const dispatch = useDispatch<AppDispatch>();

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const onSubmit: SubmitHandler<DeleteAccountField> = async (data) => {
        try {
            console.log(data);

            if (isDeleting) return;

            setIsDeleting(true);

            const response = await AuthService.DeleteAccount(data.password);

            if (response.status === 200) {
                console.log("Аккаунт удален")
                dispatch(setUser({} as IUser))
                dispatch(setAuth(false))
                localStorage.removeItem('token');
            }
        } catch (error: any) {
            dispatch(
                addToast(
                    error.response?.data?.message ||
                        "Произошла ошибка при удалении аккаунта"
                )
            );
        } finally {
            setIsDeleting(false);
            reset();
        }
    };

    return (
        <div className="delete-account__form-container">
            <h3>Удалить аккаунт</h3>

            <p className="action__description">
                После удаления вашего аккаунта все его ресурсы и данные будут
                безвозвратно удалены. Перед удалением аккаунта, загрузите любые
                данные или информацию, которые вы хотите сохранить.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <ProfileInput
                    label="Текущий пароль"
                    placeholder="Введите Ваш пароль"
                    type="password"
                    autoComplete="current-password"
                    register={register("password", {
                        required: "Введите пароль",
                    })}
                    error={errors.password}
                />

                <CoolButton>Удалить</CoolButton>
            </form>
        </div>
    );
};

export default DeleteAccountForm;
