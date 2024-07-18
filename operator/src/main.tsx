import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import AppRouter from "#routes/AppRouter";
import store from "#store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
