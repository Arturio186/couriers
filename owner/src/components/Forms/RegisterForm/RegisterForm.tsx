import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux'
import "./RegisterForm.scss";

import { AppDispatch } from "#store/store";

import { registration } from "#store/userSlice";
import { BUSINESSES_ROUTE, LOGIN_ROUTE } from "#utils/consts";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import AuthButton from "#components/UI/AuthButton/AuthButton";
import Loader from "#components/UI/Loader/Loader";

interface IRegisterField {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<IRegisterField>({ mode: "onBlur" });

    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IRegisterField> = async (data) => {
        setIsLoading(true)

        try {
            await dispatch(registration({ name: data.name, email: data.email, password: data.password })).unwrap();

            navigate(BUSINESSES_ROUTE);
        }
        catch (error: any) {
            setAuthError(error || "Ошибка при аутентификации")
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="auth__title">Регистрация</h1>

            <div className="auth__content">
                <CoolInput
                    label="Имя"
                    type="text"
                    register={register("name", {
                        required: "Введите Ваше имя",
                        maxLength: {
                            value: 50,
                            message: "Имя должен быть не более 50 символов",
                        },
                    })}
                    error={errors.name}
                />

                <CoolInput
                    label="Email"
                    type="email"
                    register={register("email", {
                        required: "Введите email адрес",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Некорректный email адрес",
                        },
                    })}
                    error={errors.email}
                />

                <CoolInput
                    label="Пароль"
                    type="password"
                    register={register("password", {
                        required: "Введите пароль",
                        minLength: {
                            value: 6,
                            message: "Пароль должен быть не менее 6 символов",
                        },
                        maxLength: {
                            value: 32,
                            message: "Пароль должен быть не более 32 символов",
                        },
                    })}
                    error={errors.password}
                />

                <CoolInput
                    label="Повторите пароль"
                    type="password"
                    register={register("confirmPassword", {
                        required: "Повторите пароль",
                        validate: (val: string) => {
                            if (watch('password') != val) {
                              return "Пароли не совпадают!";
                            }
                        },
                    })}
                    error={errors.confirmPassword}
                />
            </div>

            <AuthButton
                disabled={isLoading}
            >
                {isLoading ? <Loader /> : "Зарегистрироваться"}
            </AuthButton>

            {authError && <p className="auth__error">{authError}</p>}

            <p className="auth__redirect">
                Уже есть аккаунт?{" "}
                <NavLink to={LOGIN_ROUTE} className="auth__link">
                    Войдите!
                </NavLink>
            </p>
        </form>
    );
};

export default RegisterForm;
