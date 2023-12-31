import ProfilePage from "@/components/profile/ProfilePage";

export const metadata = {
	title: "Profile • " + process.env.NEXT_PUBLIC_APP_NAME,
	description: "Cricket Ball by Ball Commentary",
};

export default function Profile({ params }: { params: { userId: string } }) {
	return <ProfilePage {...params} />;
}
