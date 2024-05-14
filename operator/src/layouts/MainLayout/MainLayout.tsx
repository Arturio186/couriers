import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout</div>
      <Outlet />
    </>
  );
};

export default MainLayout;
