import { getUsernameFromEmail } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	value: AuthState;
};

type AuthState = {
	isAuth: boolean;
	username: string | null;
	email: string;
	uid: string;
	isAdmin: boolean;
};

const initialState = {
	value: {
		isAuth: false,
		username: "",
		email: "",
		uid: "",
		isAdmin: false,
	} as AuthState,
} as InitialState;

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: () => {
			return initialState;
		},

		logIn: (state, action: PayloadAction<string>) => {
			return {
				value: {
					isAuth: true,
					username: getUsernameFromEmail(action.payload),
					email: action.payload,
					uid: "asdasd",
					isAdmin: false,
				},
			};
		},
	},
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
