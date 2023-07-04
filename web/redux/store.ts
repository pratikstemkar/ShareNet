import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/authSlice";
import { postApi } from "@/redux/features/apiSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authApi } from "./features/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
	reducer: {
		authReducer,
		[postApi.reducerPath]: postApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(postApi.middleware)
			.concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
