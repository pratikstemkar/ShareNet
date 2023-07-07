import PostPage from "@/components/post/PostPage";

export const metadata = {
	title: "Post Page • " + process.env.NEXT_PUBLIC_APP_NAME,
	description: "Cricket Ball by Ball Commentary",
};

const Post = ({ params }: { params: { postId: string } }) => {
	return (
		<>
			<PostPage {...params} />
		</>
	);
};

export default Post;
