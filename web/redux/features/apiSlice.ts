import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
	endpoints: (builder) => ({
		getAllPosts: builder.query({
			query: () => "api/v1/post",
		}),
		getPost: builder.query({
			query: (postId) => `api/v1/post/${postId}`,
		}),
		getPostComments: builder.query({
			query: (postId) => `api/v1/comment/post/${postId}`,
		}),
	}),
});

export const { useGetAllPostsQuery, useGetPostQuery, useGetPostCommentsQuery } =
	postApi;
