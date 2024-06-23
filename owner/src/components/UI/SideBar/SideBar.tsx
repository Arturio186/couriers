import React, { FC } from "react";
import { Link } from "react-router-dom"; 
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "./SideBar.scss"

import {  AppDispatch } from "#store/store";
import { logout } from "#store/userSlice";
import { privateRoutes } from "#routes/routes"; 

interface SideBarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleClickLogout = () => {
        dispatch(logout());
    }

    return ( 
        <> 
            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                    <FaBars />
                </button>
                <nav>
                    <ul>
                        {privateRoutes[0].children?.map(route => (
                                route.icon &&
                                <Link
                                    className="nav__link"
                                    key={route.title}
                                    to={route.path}
                                >
                                    <li>
                                        {route.icon}
                                        <span className={`${isOpen ? "visible" : ""}`}>{route.title}</span>
                                    </li>
                                </Link>
                            )
                        )}
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleClickLogout}>
                    <FaSignOutAlt />
                    {isOpen && <span>Выйти</span>}
                </button>
            </div>
        </> 
    ); 
};

export default SideBar;
