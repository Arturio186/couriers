import "./RegisterForm.scss";

import { LOGIN_ROUTE } from "#utils/consts";
import { NavLink } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import AuthBox from "#components/UI/AuthBox/AuthBox";
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

    const onSubmit: SubmitHandler<IRegisterField> = async (data) => {
        console.log(data);
    };


    return (
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="auth__title">Регистрация</h1>

            <div className="auth__content">
                <AuthBox
                    label="Имя"
                    type="text"
                    register={register("name", {
                        required: "Введите Ваше имя",
                    })}
                    error={errors.name}
                />

                <AuthBox
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

                <AuthBox
                    label="Пароль"
                    type="password"
                    register={register("password", {
                        required: "Введите пароль",
                    })}
                    error={errors.password}
                />

                <AuthBox
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

            <div className="link__container">
                <NavLink to={LOGIN_ROUTE} className="auth__link">
                    Забыли пароль?
                </NavLink>
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
