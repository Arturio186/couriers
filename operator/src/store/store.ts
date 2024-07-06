import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import toastSlice from "./toastSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        toast: toastSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch