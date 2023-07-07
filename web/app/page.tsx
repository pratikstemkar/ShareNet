import MatchList from "@/components/match/MatchList";
import SocialPage from "@/components/social/SocialPage";
import { Separator } from "@/components/ui/separator";

export const metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME,
	description: "Cricket Ball by Ball Commentary",
};

export default function Page() {
	return (
		<main className="flex flex-col items-center justify-center max-w-5xl m-auto mt-5">
			<div className="w-full items-center space-y-5">
				<MatchList />
				<Separator />
				<SocialPage />
			</div>
		</main>
	);
}
