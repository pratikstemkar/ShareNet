"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import PostList from "./PostList";

export default function SocialPage() {
	const router = useRouter();

	const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
	const pfp_url = useAppSelector((state) => state.authReducer.value.pfp_url);
	const roles = useAppSelector((state) => state.authReducer.value.roles);

	return (
		<div className="grid grid-cols-4 gap-5">
			<div className="col-span-3 space-y-5">
				{isAuth ? (
					<Card>
						{/* <CardHeader className="font-bold">Create Post</CardHeader> */}
						<CardContent className="mt-5">
							<div className="flex space-x-2 items-center">
								<Avatar className="h-8 w-8 mr-2">
									<AvatarImage src={pfp_url} alt="ProfilePicture" />
									<AvatarFallback>PC</AvatarFallback>
								</Avatar>
								<Input
									placeholder="Create Post"
									className="dark:hover:border-white hover:border-black"
									onClick={() => router.push("/post/submit")}
								/>
								<Button size="sm">Post</Button>
							</div>
						</CardContent>
					</Card>
				) : null}
				<PostList />
			</div>
			<div className="space-y-5">
				{isAuth && roles?.includes("pro") ? null : (
					<Card>
						<CardHeader className="font-semibold">
							Try {process.env.NEXT_PUBLIC_APP_NAME} PRO!
						</CardHeader>
						<CardContent className="text-sm">
							Create your own team and much more.
						</CardContent>
						<CardFooter>
							<Link href="/pro" className="w-full">
								<Button className="w-full" size="sm">
									Try Now
								</Button>
							</Link>
						</CardFooter>
					</Card>
				)}
				<Card>
					<CardHeader className="font-semibold">
						Welcome to {process.env.NEXT_PUBLIC_APP_NAME}!
					</CardHeader>
					<CardContent className="text-sm">
						Come here to check in with your favorite teams.
					</CardContent>
					<CardFooter>
						<Button className="w-full" size="sm">
							Create Team
						</Button>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader className="font-semibold">Site Links</CardHeader>
					<CardContent className="text-sm ">
						<div className="grid grid-cols-2 ">
							<div className="flex flex-col">
								<Link href="/">User</Link>
								<Link href="/">Privacy</Link>
							</div>
							<div className="flex flex-col">
								<Link href="/">Content</Link>
								<Link href="/">Moderator</Link>
							</div>
						</div>
					</CardContent>
					<CardFooter className="text-sm font-mono text-slate-500">
						{process.env.NEXT_PUBLIC_APP_NAME} &copy; 2023
						<br />
						All rights reserved.
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
