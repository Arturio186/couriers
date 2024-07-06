import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastMessage {
    id: number;
    message: string;
}

interface ToastState {
    toasts: ToastMessage[];
}

const initialState: ToastState = {
    toasts: [],
};

let nextToastId = 1;

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast(state, action: PayloadAction<string>) {
            state.toasts.push({
                id: nextToastId++,
                message: action.payload,
            });
        },
        removeToast(state, action: PayloadAction<number>) {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
        },
    },
});

export const { 
    addToast, 
    removeToast 
} = toastSlice.actions;

export default toastSlice.reducer;
