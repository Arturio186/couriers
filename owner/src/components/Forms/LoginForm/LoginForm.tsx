import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux'
import "./LoginForm.scss";

import { AppDispatch } from "#store/store";
import { login } from "#store/userSlice";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import AuthButton from "#components/UI/AuthButton/AuthButton";
import Loader from "#components/UI/Loader/Loader";

import { BUSINESSES_ROUTE, REGISTER_ROUTE } from "#utils/consts";

interface ILoginField {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginField>({ mode: "onBlur" });

    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ILoginField> = async (data) => {
        setIsLoading(true)

        try {
            await dispatch(login({ email: data.email, password: data.password })).unwrap();

            navigate(BUSINESSES_ROUTE);
        }
        catch (error : any) {
            setAuthError(error || "Ошибка при аутентификации")
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="auth__title">Вход</h1>

            <div className="auth__content">
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
            </div>

            <AuthButton
                disabled={isLoading}
            >
                {isLoading ? <Loader /> : "Войти"}
            </AuthButton>
            
            {authError && <p className="auth__error">{authError}</p>}

            <p className="auth__redirect">
                Нет аккаунта?{" "}
                <NavLink to={REGISTER_ROUTE} className="auth__link">
                    Зарегистрируйтесь!
                </NavLink>
            </p>
        </form>
    );
};

export default LoginForm;
