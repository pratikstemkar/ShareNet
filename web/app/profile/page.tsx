import ProfilePage from "@/components/profile/ProfilePage";

export const metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME + " - pratiktemkarofficial",
	description: "Cricket Ball by Ball Commentary",
};

export default function Profile() {
	return <ProfilePage />;
}
