import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: () => "products",
		}),
		getAllPosts: builder.query({
			query: () => "posts",
		}),
		getPost: builder.query({
			query: (postId) => `posts/${postId}`,
		}),
		getPostComments: builder.query({
			query: (postId) => `posts/${postId}/comments`,
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useGetAllPostsQuery,
	useGetPostQuery,
	useGetPostCommentsQuery,
} = postApi;
