import MatchList from "@/components/match/MatchList";
import SocialPage from "@/components/social/SocialPage";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Loading from "./loading";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export const metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME,
	description: "Cricket Ball by Ball Commentary",
};

export default async function Page() {
	const session = await getServerSession(options);
	return (
		<main className="flex flex-col items-center justify-center max-w-5xl m-auto mt-5">
			{JSON.stringify(session)}
			<div className="w-full items-center space-y-5">
				<Suspense fallback={<Loading />}>
					<MatchList />
				</Suspense>
				<Separator />
				<Suspense fallback={<Loading />}>
					<SocialPage />
				</Suspense>
			</div>
		</main>
	);
}
