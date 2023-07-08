import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

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
				roles: [{ name: string }];
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
				id: string;
				name: string;
				bio: string;
				email: string;
				username: string;
				image: string;
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
