import { FC, useEffect, useState } from "react";

import AuthRouter from "./AuthRouter";
import GuestRouter from "./GuestRouter";

const AppRouter: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return isAuth ? <AuthRouter /> : <GuestRouter />;
};

export default AppRouter;
