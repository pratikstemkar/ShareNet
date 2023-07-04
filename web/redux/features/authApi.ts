import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/",
		credentials: "same-origin",
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
	}),
});

export const { useLoginUserMutation } = authApi;
