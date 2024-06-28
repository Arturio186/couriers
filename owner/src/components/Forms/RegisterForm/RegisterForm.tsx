import { NavLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux'
import "./RegisterForm.scss";

import { AppDispatch } from "#store/store";

import { registration } from "#store/userSlice";
import { LOGIN_ROUTE } from "#utils/consts";

import CoolInput from "#components/UI/CoolInput/CoolInput";
import AuthButton from "#components/UI/AuthButton/AuthButton";

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

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit: SubmitHandler<IRegisterField> = async (data) => {
        dispatch(registration({ name: data.name, email: data.email, password: data.password }));
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

            <AuthButton>Войти</AuthButton>

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
