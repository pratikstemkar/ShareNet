import { getUsernameFromEmail } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	value: AuthState;
};

type AuthState = {
	isAuth: boolean;
	username: string | null;
	email: string;
	user_id: string;
	pfp_url: string;
	roles: Array<string>;
};

const initialState = {
	value: {
		isAuth: false,
		username: "",
		email: "",
		user_id: "",
		pfp_url: "",
		roles: [],
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
					user_id: "asdasd",
					pfp_url:
						"https://pbs.twimg.com/profile_images/1675393092093091840/_jdt3xa5_400x400.jpg",
					roles: ["user", "pro"],
				},
			};
		},
	},
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
