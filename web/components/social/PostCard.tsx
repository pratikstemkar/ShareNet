"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	CalendarIcon,
	ForwardIcon,
	MoreHorizontalIcon,
	SaveIcon,
	ThumbsDownIcon,
	ThumbsUp,
	ThumbsUpIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	convertTimestampToReadableTime,
	convertTimestampToRelativeTime,
} from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { useGetProfileQuery } from "@/redux/features/apiSlice";
import { Skeleton } from "../ui/skeleton";
import { SharePop } from "./SharePop";

interface PostCardProps {
	post_id: number;
	title: string;
	content: string;
	user_id: number;
	CreatedAt: string;
	comment_count: number;
	upvotes: number;
	downvotes: number;
}

export default function PostCard({
	post_id,
	title,
	content,
	user_id,
	CreatedAt,
	comment_count,
	upvotes,
	downvotes,
}: PostCardProps) {
	const router = useRouter();

	const {
		data: userData,
		isSuccess: userSuccess,
		isLoading: userLoading,
	} = useGetProfileQuery(user_id);

	return (
		<Card className="dark:hover:border-white hover:border-black">
			<CardHeader>
				{userLoading ? (
					<div className="text-sm flex items-center">
						<Skeleton className="h-4 w-4 mr-2" />
						<Skeleton className="h-3 w-[300px]" />
					</div>
				) : (
					<div className="text-sm text-slate-500 flex items-center">
						<Avatar className="h-6 w-6 mr-2">
							<AvatarImage src={userData.user.pfp_url} alt="ProfilePicture" />
							<AvatarFallback>PC</AvatarFallback>
						</Avatar>
						<HoverCard>
							<HoverCardTrigger asChild>
								<Link
									href={`/profile/${user_id}`}
									className="mr-2 dark:text-white text-black hover:underline"
								>
									{userData.user.username}
								</Link>
							</HoverCardTrigger>
							<HoverCardContent className="w-80 hover:cursor-default">
								<div className="flex justify-between space-x-4">
									<Avatar>
										<AvatarImage src={userData.user.pfp_url} />
										<AvatarFallback>VC</AvatarFallback>
									</Avatar>

									<div className="space-y-2">
										<div className="grid grid-cols-2">
											<h4 className="text-sm font-semibold">
												{userData.user.username}
											</h4>
											<div className="text-sm">
												<span className="font-semibold">143k</span>{" "}
												<span className="text-slate-500">members</span>
											</div>
										</div>
										{/* <p className="text-sm">
											The React Framework – created and maintained by @vercel.
										</p> */}
										<Button className="rounded-full w-full mt-4" size="sm">
											Follow
										</Button>
										<div className="flex items-center pt-2">
											<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
											<span className="text-xs text-muted-foreground">
												Joined{" "}
												{convertTimestampToReadableTime(
													userData.user.CreatedAt
												)}
											</span>
										</div>
									</div>
								</div>
							</HoverCardContent>
						</HoverCard>
						{/* <span className="mr-2">
						Posted by{" "}
						<Link href="/" className="hover:underline">
							{user_id}
						</Link>{" "}
					</span> */}

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<span>{convertTimestampToRelativeTime(CreatedAt)}</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>{convertTimestampToReadableTime(CreatedAt)}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
				<CardTitle
					className="hover:cursor-pointer hover:text-indigo-500 text-2xl"
					onClick={() => router.push(`/post/${post_id}`)}
				>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>{content}</CardContent>
			<CardFooter>
				<div className="flex">
					<Button variant="ghost" size="sm">
						{upvotes}
						<ThumbsUpIcon className="h-4 w-4 ml-2" />
					</Button>
					<Button variant="ghost" size="sm">
						{downvotes}
						<ThumbsDownIcon className="h-4 w-4 ml-2" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => router.push(`/post/${post_id}`)}
					>
						{comment_count} Comment{comment_count > 1 ? "s" : null}
					</Button>
					<SharePop postId={post_id} />
					<Button variant="ghost" size="sm">
						<SaveIcon className="h-4 w-4 mr-2" />
						Save
					</Button>
					<Button variant="ghost" size="sm">
						<MoreHorizontalIcon className="h-4 w-4" />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
