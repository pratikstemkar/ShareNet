import SubmitPost from "@/components/post/SubmitPost";

export const metadata = {
	title: "Create a Post • " + process.env.NEXT_PUBLIC_APP_NAME,
	description: "Cricket Ball by Ball Commentary",
};

export default function Page() {
	return <SubmitPost />;
}
