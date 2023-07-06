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
import { useGetPostCommentsQuery } from "@/redux/features/apiSlice";
import Comment from "./Comment";
import { comment } from "postcss";

export default function CommentList(postId: { postId: string }) {
	const { data: comments, isSuccess: commentsSuccess } =
		useGetPostCommentsQuery(postId.postId);
	return (
		<>
			{commentsSuccess ? (
				<>
					{comments.count > 0 ? (
						<>
							<Separator />
							<div className="space-y-5">
								{commentsSuccess ? (
									<>
										<h4 className="text-lg font-semibold">
											{comments.count} Comments
										</h4>
										{comments?.comment_list?.map((comment: any) => (
											<Comment key={comment.comment_id} {...comment} />
										))}
									</>
								) : null}
							</div>
						</>
					) : null}
				</>
			) : null}
		</>
	);
}
