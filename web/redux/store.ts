import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/authSlice";
import { postApi } from "@/redux/features/apiSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authApi } from "./features/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		persistedReducer,
		[postApi.reducerPath]: postApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(postApi.middleware)
			.concat(authApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
