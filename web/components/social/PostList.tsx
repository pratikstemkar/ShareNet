"use client";

import { useGetAllPostsQuery } from "@/redux/features/apiSlice";
import PostCardSkeleton from "./PostCardSkeleton";
import PostCard from "./PostCard";

export default function PostList() {
	const { data, isSuccess, isError, isLoading, isFetching } =
		useGetAllPostsQuery("");

	return (
		<>
			{isLoading ? (
				<>
					<PostCardSkeleton />
					<PostCardSkeleton />
				</>
			) : (
				data?.post_list?.map((post: any) => (
					<PostCard key={post.id} {...post} />
				))
			)}
			{isError ? <>Error occured while fetching posts.</> : null}
		</>
	);
}
