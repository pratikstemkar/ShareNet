import { getUsernameFromEmail } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	value: AuthState;
};

type AuthState = {
	isAuth: boolean;
	username: string | null;
	email: string | null;
	user_id: string | null;
	pfp_url: string | null;
	access_token: string | null;
	refresh_token: string | null;
	roles: Array<string> | null;
};

const initialState = {
	value: {
		isAuth: false,
		username: "",
		email: "",
		user_id: "",
		pfp_url: "",
		access_token: "",
		refresh_token: "",
		roles: [],
	} as AuthState,
} as InitialState;

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: () => {
			localStorage.removeItem("user");
			return initialState;
		},

		setUser: (
			state,
			action: PayloadAction<{
				username: string;
				email: string;
				user_id: string;
				pfp_url: string;
				access_token: string;
				refresh_token: string;
				roles: Array<string>;
			}>
		) => {
			localStorage.setItem(
				"user",
				JSON.stringify({
					isAuth: true,
					username: action.payload.username,
					email: action.payload.email,
					user_id: action.payload.user_id,
					pfp_url: action.payload.pfp_url,
					roles: action.payload.roles,
					access_token: action.payload.access_token,
					refresh_token: action.payload.refresh_token,
				})
			);
			return {
				value: {
					isAuth: true,
					username: action.payload.username,
					email: action.payload.email,
					user_id: action.payload.user_id,
					pfp_url: action.payload.pfp_url,
					roles: action.payload.roles,
					access_token: action.payload.access_token,
					refresh_token: action.payload.refresh_token,
				},
			};
		},
	},
});

export const { logOut, setUser } = auth.actions;
export default auth.reducer;
