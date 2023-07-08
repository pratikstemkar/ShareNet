"use client";
import { LoginForm } from "@/components/forms/LoginForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
	const { data, status } = useSession();

	if (status === "authenticated") {
		return redirect("/");
	}

	return (
		<main className="flex flex-col m-auto max-w-5xl">
			<div className="grid grid-cols-2">
				<div className="p-10 space-y-5">
					<h1 className="text-5xl flex items-center font-extrabold ">
						Let the games begin!
					</h1>
					<p>
						Join the community of cricket enthusiasts and experience the
						excitement together. Share your thoughts, engage in lively
						discussions, and cheer for your favorite teams and players.
					</p>
					<p>
						Unleash your passion for the sport and dive into a world of live
						scores, thrilling updates, and in-depth analysis. From international
						matches to domestic tournaments, we&apos;ve got you covered with
						comprehensive coverage and real-time updates.
					</p>
				</div>
				<div className="flex justify-center items-center p-10">
					<LoginForm />
				</div>
			</div>
		</main>
	);
}
