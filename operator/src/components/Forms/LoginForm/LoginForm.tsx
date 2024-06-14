import "./LoginForm.scss";

import { REGISTER_ROUTE } from "#utils/consts";
import { NavLink } from "react-router-dom";

import AuthBox from "#components/UI/AuthBox/AuthBox";
import AuthButton from "#components/UI/AuthButton/AuthButton";

const LoginForm = () => {
    return (
        <form className="auth__form">
            <h1 className="auth__title">Вход</h1>

            <div className="auth__content">
                <AuthBox label="Email" type="email" />

                <AuthBox label="Пароль" type="password" />
            </div>

            <div className="link__container">
                <NavLink to={REGISTER_ROUTE} className="auth__link">
                    Забыли пароль?
                </NavLink>
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
