import PostPage from "@/components/post/PostPage";

const Post = ({ params }: { params: { postId: string } }) => {
	return (
		<>
			<PostPage {...params} />
		</>
	);
};

export default Post;
