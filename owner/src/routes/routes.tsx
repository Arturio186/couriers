import { Navigate } from "react-router-dom";

import IRoute from "#interfaces/IRoute";

import AuthenticationLayout from "#layouts/AuthenticationLayout/AuthenticationLayout";
import MainLayout from "#layouts/MainLayout/MainLayout";

import Login from "#pages/Login/Login";
import Register from "#pages/Register/Register";

import NotFound from "#pages/NotFound/NotFound";

import { DASHBOARD_ROUTE, MAIN_ROUTE, SETTINGS_ROUTE } from "#utils/consts";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "#utils/consts";

import { FaHome, FaUser, FaCog } from "react-icons/fa";

export const privateRoutes: IRoute[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: MAIN_ROUTE, element: <p>Main</p>, title: "Главная", icon: <FaHome /> },
            { path: DASHBOARD_ROUTE, element: <p>Dashboard</p>, title: "Личный кабинет", icon: <FaUser /> },
            { path: SETTINGS_ROUTE, element: <p>Settings</p>, title: "Настройки", icon: <FaCog /> },
            { path: "*", element: <NotFound />, title: "Страница не найдена" },
        ],
    },
];

export const publicRoutes: IRoute[] = [
    {
        path: "/",
        element: <AuthenticationLayout />,
        children: [
            { path: "/", element: <Navigate to={LOGIN_ROUTE} /> },
            { path: LOGIN_ROUTE, element: <Login />, title: "Вход" },
            { path: REGISTER_ROUTE, element: <Register />, title: "Регистрация" },
        ],
    },
    { path: "*", element: <Navigate to={LOGIN_ROUTE} /> },
];
