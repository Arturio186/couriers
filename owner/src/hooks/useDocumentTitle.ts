import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import IRoute from "#interfaces/IRoute";

const findRoute = (routes: IRoute[], pathname: string): IRoute | null => {
    for (const route of routes) {
        if (route.path === pathname) {
            return route;
        }
        if (route.children) {
            const childRoute = findRoute(route.children, pathname);
            if (childRoute) {
                return childRoute;
            }
        }
    }
    return null;
};

const useDocumentTitle = (routes: IRoute[]) => {
    const location = useLocation();

    useEffect(() => {
        const currentRoute = findRoute(routes, location.pathname);

        if (currentRoute && currentRoute.title) {
            document.title = currentRoute.title;
        }
    }, [location]);
};

export default useDocumentTitle;
