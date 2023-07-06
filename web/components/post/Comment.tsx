"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
	ThumbsUpIcon,
	ThumbsDownIcon,
	ForwardIcon,
	SaveIcon,
	MoreHorizontalIcon,
	ReplyIcon,
	CalendarIcon,
} from "lucide-react";
import {
	convertTimestampToReadableTime,
	convertTimestampToRelativeTime,
} from "@/lib/utils";
import { useGetProfileQuery } from "@/redux/features/apiSlice";
import { Skeleton } from "../ui/skeleton";

export default function Comment(comment: any) {
	const {
		data: profileData,
		isLoading: profileLoading,
		isSuccess: profileSuccess,
		isError: profileError,
	} = useGetProfileQuery(comment.user_id);
	return (
		<>
			<div className="space-y-2" key={comment.comment_id}>
				<div className="flex items-center">
					{profileSuccess ? (
						<>
							<Avatar className="h-8 w-8 mr-2">
								<AvatarImage
									src={profileData.user.pfp_url}
									alt="ProfilePicture"
								/>
								<AvatarFallback>PF</AvatarFallback>
							</Avatar>
							<Link href="/profile" className="mr-2 hover:underline">
								{profileData.user.username}
							</Link>
						</>
					) : (
						<>
							<Skeleton className="h-8 w-8 mr-2" />
							<Skeleton className="h-4 w-[100px] mr-2" />
						</>
					)}
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<span className="text-sm text-slate-500">
									{convertTimestampToRelativeTime(comment.CreatedAt)}
								</span>
							</TooltipTrigger>
							<TooltipContent>
								<p>{convertTimestampToReadableTime(comment.CreatedAt)}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<p className="text-sm">{comment.content}</p>
				<div className="flex">
					<Button variant="ghost" size="sm">
						{comment.upvotes}
						<ThumbsUpIcon className="h-4 w-4 ml-2" />
					</Button>
					<Button variant="ghost" size="sm">
						0
						<ThumbsDownIcon className="h-4 w-4 ml-2" />
					</Button>
					<Button variant="ghost" size="sm">
						<ReplyIcon className="h-4 w-4 mr-2" />
						Reply
					</Button>
					<Button variant="ghost" size="sm">
						<ForwardIcon className="h-4 w-4 mr-2" />
						Share
					</Button>

					<Button variant="ghost" size="sm">
						<MoreHorizontalIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</>
	);
}
