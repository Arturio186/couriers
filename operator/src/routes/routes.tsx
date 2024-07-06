import { Navigate } from "react-router-dom";

import IRoute from "#interfaces/IRoute";

import AuthenticationLayout from "#layouts/AuthenticationLayout/AuthenticationLayout";
import MainLayout from "#layouts/MainLayout/MainLayout";

import Login from "#pages/Login/Login";
import Register from "#pages/Register/Register";

import Dashboard from "#pages/Dashboard/Dashboard";
import NotFound from "#pages/NotFound/NotFound";

import { MAP_ROUTE, DASHBOARD_ROUTE } from "#utils/consts";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "#utils/consts";

import { FaCity, FaUser } from "react-icons/fa";

export const privateRoutes: IRoute[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Navigate to={MAP_ROUTE} />, title: "Переадресация" },
            { path: MAP_ROUTE, element: <>Map</>, title: "Карта", icon: <FaCity /> },
            { path: DASHBOARD_ROUTE, element: <Dashboard />, title: "Личный кабинет", icon: <FaUser /> },
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
    {path: '*', element: <Navigate to={LOGIN_ROUTE} />, title: "Переадресация"}
];
