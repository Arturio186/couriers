import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { privateRoutes } from "./routes";

const authBrowserRouter = createBrowserRouter(privateRoutes);

const AuthRouter = () => <RouterProvider router={authBrowserRouter} />;

export default AuthRouter;
