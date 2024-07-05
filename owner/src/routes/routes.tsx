import { Navigate } from "react-router-dom";

import IRoute from "#interfaces/IRoute";

import AuthenticationLayout from "#layouts/AuthenticationLayout/AuthenticationLayout";
import MainLayout from "#layouts/MainLayout/MainLayout";

import Login from "#pages/Login/Login";
import Register from "#pages/Register/Register";

import NotFound from "#pages/NotFound/NotFound";
import Businesses from "#pages/Businesses/Businesses";
import Business from "#pages/Business/Business";
import Branch from "#pages/Branch/Branch";
import Catalog from "#pages/Catalog/Catalog";
import Dashboard from "#pages/Dashboard/Dashboard";

import { DASHBOARD_ROUTE, BUSINESSES_ROUTE, STATISTIC_ROUTE, CATALOG_ROUTE, BRANCH_ROUTE } from "#utils/consts";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "#utils/consts";

import { FaCity, FaUser, FaChartBar, FaShoppingBasket } from "react-icons/fa";

export const privateRoutes: IRoute[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Navigate to={BUSINESSES_ROUTE} />, title: "Переадресация" },
            { path: `${BUSINESSES_ROUTE}/:id`, element: <Business />, title: "Сеть" },
            { path: `${BRANCH_ROUTE}/:id`, element: <Branch />, title: "Филиал" },
            { path: BUSINESSES_ROUTE, element: <Businesses />, title: "Сети", icon: <FaCity /> },
            { path: CATALOG_ROUTE, element: <Catalog />, title: "Каталог", icon: <FaShoppingBasket /> },
            { path: STATISTIC_ROUTE, element: <p>Statistic</p>, title: "Статистика", icon: <FaChartBar /> },
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
