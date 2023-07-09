"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
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
	convertTimestampToReadableTimeProfile,
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
			<div className="space-y-2" key={comment.id}>
				<div className="flex items-center">
					{profileSuccess ? (
						<>
							<Avatar className="h-8 w-8 mr-2">
								<AvatarImage
									src={profileData.user.image}
									alt="ProfilePicture"
								/>
								<AvatarFallback>PF</AvatarFallback>
							</Avatar>
							<HoverCard>
								<HoverCardTrigger asChild>
									<Link
										href={`/profile/${comment.user_id}`}
										className="mr-2 dark:text-white text-black hover:underline"
									>
										{profileData.user.name}
									</Link>
								</HoverCardTrigger>
								<HoverCardContent className="w-80 hover:cursor-default">
									<div className="flex  space-x-4">
										<Avatar>
											<AvatarImage src={profileData.user.image} />
											<AvatarFallback>VC</AvatarFallback>
										</Avatar>

										<div className="space-y-2 w-full">
											<div className="grid grid-cols-2">
												<div>
													<h4 className="text-sm font-semibold">
														{profileData.user.name}
													</h4>
													<span className="text-sm font-mono text-slate-500">
														@{profileData.user.username}
													</span>
												</div>
												<div className="text-sm">
													<span className="font-semibold">143k</span>{" "}
													<span className="text-slate-500">members</span>
												</div>
											</div>
											<p className="text-sm">{profileData.user.bio}</p>
											<Button className="rounded-full w-full mt-4" size="sm">
												Follow
											</Button>
											<div className="flex items-center pt-2">
												<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
												<span className="text-xs text-muted-foreground">
													Joined{" "}
													{convertTimestampToReadableTimeProfile(
														profileData.user.CreatedAt
													)}
												</span>
											</div>
										</div>
									</div>
								</HoverCardContent>
							</HoverCard>
							<span className="text-slate-500 mr-2">
								@{profileData.user.username}
							</span>
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
						{comment.upvotes > 0 ? (
							<span className="mr-2">{comment.upvotes}</span>
						) : null}
						<ThumbsUpIcon className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="sm">
						{comment.downvotes > 0 ? (
							<span className="mr-2">{comment.downvotes}</span>
						) : null}
						<ThumbsDownIcon className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="sm">
						<ReplyIcon className="h-4 w-4 mr-2" />
						Reply
					</Button>
					<Button variant="ghost" size="sm">
						<MoreHorizontalIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</>
	);
}
