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

	return (
		<Card
			className="dark:hover:border-white hover:border-black hover:cursor-pointer"
			onClick={() => router.push(`/post/${post_id}`)}
		>
			<CardHeader>
				<div className="text-sm text-slate-500 flex items-center">
					<Avatar className="h-4 w-4 mr-2">
						<AvatarImage
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU"
							alt="ProfilePicture"
						/>
						<AvatarFallback>PC</AvatarFallback>
					</Avatar>
					<HoverCard>
						<HoverCardTrigger asChild>
							<Link
								href="/"
								className="mr-2 dark:text-white text-black hover:underline"
							>
								{user_id}
							</Link>
						</HoverCardTrigger>
						<HoverCardContent className="w-80 hover:cursor-default">
							<div className="flex justify-between space-x-4">
								<Avatar>
									<AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU" />
									<AvatarFallback>VC</AvatarFallback>
								</Avatar>

								<div className="space-y-2">
									<div className="grid grid-cols-2">
										<h4 className="text-sm font-semibold">India</h4>
										<div className="text-sm">
											<span className="font-semibold">143k</span>{" "}
											<span className="text-slate-500">members</span>
										</div>
										<div>56k members</div>
									</div>
									<p className="text-sm">
										The React Framework – created and maintained by @vercel.
									</p>
									<Button className="rounded-full w-full mt-4" size="sm">
										Join Team
									</Button>
									<div className="flex items-center pt-2">
										<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
										<span className="text-xs text-muted-foreground">
											Joined December 2021
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
				<CardTitle>{title}</CardTitle>
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
					<Button variant="ghost" size="sm">
						{comment_count} Comment{comment_count > 1 ? "s" : null}
					</Button>
					<Button variant="ghost" size="sm">
						<ForwardIcon className="h-4 w-4 mr-2" />
						Share
					</Button>
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
