import RegisterPage from "@/components/auth/RegisterPage";

export const metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME + " - Create Account",
	description: "Cricket Ball by Ball Commentary",
};

const Register = () => {
	return <RegisterPage />;
};

export default Register;
