import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/",
	}),
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (body: { email: string; password: string }) => {
				return {
					url: "api/v1/login",
					method: "post",
					body,
				};
			},
		}),
		registerUser: builder.mutation({
			query: (body: {
				email: string;
				password: string;
				roles: [{ rolename: string }];
			}) => {
				return {
					url: "api/v1/register",
					method: "post",
					body,
				};
			},
		}),
		updateUser: builder.mutation({
			query: (body: {
				user_id: string;
				email: string;
				username: string;
				pfp_url: string;
			}) => {
				return {
					url: "api/v1/user",
					method: "put",
					body,
				};
			},
		}),
		readUser: builder.query({
			query: (email: string) => {
				return {
					url: `api/v1/user/email/${email}`,
					method: "GET",
				};
			},
		}),
	}),
});

export const {
	useLoginUserMutation,
	useLazyReadUserQuery,
	useRegisterUserMutation,
	useUpdateUserMutation,
} = authApi;
