import { Navigate } from "react-router-dom";

import IRoute from "#interfaces/IRoute";

import AuthenticationLayout from "#layouts/AuthenticationLayout/AuthenticationLayout";
import MainLayout from "#layouts/MainLayout/MainLayout";

import Login from "#pages/Login/Login";
import Register from "#pages/Register/Register";

import NotFound from "#pages/NotFound/NotFound";
import Businesses from "#pages/Businesses/Businesses";
import Business from "#pages/Business/Business";

import { DASHBOARD_ROUTE, BUSINESSES_ROUTE } from "#utils/consts";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "#utils/consts";

import { FaCity, FaUser } from "react-icons/fa";


export const privateRoutes: IRoute[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: BUSINESSES_ROUTE, element: <Businesses />, title: "Сети", icon: <FaCity /> },
            { path: `${BUSINESSES_ROUTE}/:id`, element: <Business />, title: "Сеть" },
            { path: DASHBOARD_ROUTE, element: <p>Dashboard</p>, title: "Личный кабинет", icon: <FaUser /> },
            { path: "*", element: <NotFound />, title: "Страница не найдена" }
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
    {path: '*', element: <Navigate to={LOGIN_ROUTE}/>, title: "Переадресация"}
];
