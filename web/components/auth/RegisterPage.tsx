"use client";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
	const isAuth = useAppSelector((state) => state.persistedReducer.value.isAuth);
	const router = useRouter();

	if (isAuth) {
		router.push("/");
	}

	return (
		<main className="max-w-5xl flex flex-col my-5 m-auto">
			<div className="m-auto">
				<RegisterForm />
			</div>
		</main>
	);
};

export default RegisterPage;
