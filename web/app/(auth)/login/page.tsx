import LoginPage from "@/components/auth/LoginPage";

export const metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME + " - Sign In",
	description: "Cricket Ball by Ball Commentary",
};

export default function Login() {
	return <LoginPage />;
}
