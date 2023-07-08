import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	value: AuthState;
};

type AuthState = {
	isAuth: boolean;
	username: string;
	name: string;
	bio: string;
	email: string;
	id: string;
	image: string;
	access_token: string;
	refresh_token: string;
	roles: Array<string>;
};

const initialState = {
	value: {
		isAuth: false,
		username: "",
		email: "",
		bio: "",
		name: "",
		id: "",
		image: "",
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
				bio: string;
				name: string;
				id: string;
				image: string;
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
					bio: action.payload.bio,
					name: action.payload.name,
					id: action.payload.id,
					image: action.payload.image,
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
					bio: action.payload.bio,
					name: action.payload.name,
					id: action.payload.id,
					image: action.payload.image,
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
