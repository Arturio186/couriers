import { Navigate } from "react-router-dom";

import IRoute from "#interfaces/IRoute";

import AuthenticationLayout from "#layouts/AuthenticationLayout/AuthenticationLayout";
import MainLayout from "#layouts/MainLayout/MainLayout";

import Login from "#pages/Login/Login";
import Register from "#pages/Register/Register";

import NotFound from "#pages/NotFound/NotFound";

import { MAIN_ROUTE } from "#utils/consts";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "#utils/consts";

export const privateRoutes: IRoute[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: MAIN_ROUTE, element: <p>Main</p>, title: "Главная" },
      { path: "*", element: <NotFound />, title: "Страница не найдена" },
    ],
  },
];

export const publicRoutes: IRoute[] = [
  {
    path: "/",
    element: <AuthenticationLayout />,
    children: [
      { path: '*', element: <Navigate to={LOGIN_ROUTE} /> },
      { path: LOGIN_ROUTE, element: <Login />, title: "Вход" },
      { path: REGISTER_ROUTE, element: <Register />, title: "Регистрация" },
    ],
  },
];
