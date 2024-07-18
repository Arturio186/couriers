import { useDispatch } from "react-redux";
import './Forbidden.scss'

import { AppDispatch } from "#store/store";
import { logout } from "#store/userSlice";

import CoolButton from "#components/UI/CoolButton/CoolButton";

const Forbidden = () => {
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="forbidden__container">
            <span className="clown">🤡</span>
            <p className="forbidden__message">Вы не являетесь владельцем</p>
            <CoolButton onClick={handleLogout}>Выйти</CoolButton>
        </div>
    )
};

export default Forbidden;
