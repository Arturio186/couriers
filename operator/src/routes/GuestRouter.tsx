import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { publicRoutes } from "./routes";

const guestBrowserRouter = createBrowserRouter(publicRoutes);

const GuestRouter = () => <RouterProvider router={guestBrowserRouter} />;

export default GuestRouter;
