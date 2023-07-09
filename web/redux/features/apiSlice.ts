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
		getProfile: builder.query({
			query: (userId) => `api/v1/profile/${userId}`,
		}),
		postPost: builder.mutation({
			query: (body: {
				title: string;
				content: string;
				user_id: string;
				link: string;
				image: string;
				caption: string;
			}) => {
				return {
					url: "api/v1/post",
					method: "post",
					body,
				};
			},
		}),
		postComment: builder.mutation({
			query: (body: { content: string; user_id: string; post_id: string }) => {
				return {
					url: "api/v1/comment",
					method: "post",
					body,
				};
			},
		}),
	}),
});

export const {
	useGetAllPostsQuery,
	useGetPostQuery,
	useGetPostCommentsQuery,
	useGetProfileQuery,
	useLazyGetProfileQuery,
	usePostPostMutation,
	usePostCommentMutation,
} = postApi;
