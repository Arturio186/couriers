import { NavLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux'
import "./LoginForm.scss";

import { AppDispatch } from "#store/store";

import { login } from "#store/userSlice";
import { REGISTER_ROUTE } from "#utils/consts";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import AuthButton from "#components/UI/AuthButton/AuthButton";

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

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit: SubmitHandler<ILoginField> = async (data) => {
        dispatch(login({ email: data.email, password: data.password }));
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
                    })}
                    error={errors.password}
                />
            </div>

            <AuthButton>Войти</AuthButton>

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
