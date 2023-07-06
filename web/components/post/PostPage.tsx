"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Card,
	CardContent,
	CardHeader,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	useGetPostCommentsQuery,
	useGetPostQuery,
	useGetProfileQuery,
	useLazyGetProfileQuery,
	usePostCommentMutation,
} from "@/redux/features/apiSlice";
import {
	convertTimestampToReadableTime,
	convertTimestampToRelativeTime,
} from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import PostCardSkeleton from "../social/PostCardSkeleton";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import CommentList from "./CommentList";

const FormSchema = z.object({
	comment: z
		.string()
		.min(10, {
			message: "Bio must be at least 10 characters.",
		})
		.max(160, {
			message: "Bio must not be longer than 30 characters.",
		}),
});

const PostPage = (props: { postId: string }) => {
	const { toast } = useToast();

	const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

	const {
		data: post,
		isSuccess: postSuccess,
		isLoading: postLoading,
	} = useGetPostQuery(props.postId);

	const [trigger, results] = useLazyGetProfileQuery();
	const [
		postComment,
		{
			data: commentData,
			isSuccess: commentSuccess,
			isLoading: commentLoading,
			isError: commentError,
		},
	] = usePostCommentMutation();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (data.comment) {
			postComment({
				content: data.comment,
				post_id: post.post.post_id,
				user_id: post.post.user_id,
			});
		}
	}

	useEffect(() => {
		if (commentSuccess) {
			toast({
				title: "Comment Submitted!",
			});
		}
		if (commentError) {
			toast({
				title: "Comment Submission Failed!",
			});
		}
	}, [commentLoading]);

	useEffect(() => {
		if (postSuccess) {
			trigger(post.post.user_id);
		}
	}, [postLoading]);

	return (
		<main className="max-w-5xl m-auto mt-5">
			<div className="grid grid-cols-6 gap-5">
				<div className="col-span-4">
					{postSuccess ? (
						<Card>
							<CardHeader>
								<div className="text-sm text-slate-500">
									{results.data ? (
										<>
											Posted by{" "}
											<Link href="/profile" className="hover:underline mr-2">
												{results.data.user.username}
											</Link>
										</>
									) : (
										<Skeleton className="h-4 w-[300px]" />
									)}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<span>
													{convertTimestampToRelativeTime(post.post.CreatedAt)}
												</span>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													{convertTimestampToReadableTime(post.post.CreatedAt)}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<CardTitle>{post.post.title}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-5">
								<p>{post.post.content}</p>
								<div className="flex">
									<Button variant="ghost" size="sm">
										{post.post.upvotes}
										<ThumbsUpIcon className="h-4 w-4 ml-2" />
									</Button>
									<Button variant="ghost" size="sm">
										{post.post.downvotes}
										<ThumbsDownIcon className="h-4 w-4 ml-2" />
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
								{isAuth ? (
									<div>
										<Form {...form}>
											<form
												onSubmit={form.handleSubmit(onSubmit)}
												className="w-full space-y-2"
											>
												<FormField
													control={form.control}
													name="comment"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Comment</FormLabel>
															<FormControl>
																<Textarea
																	placeholder="What are your thoughts?"
																	className="resize-none"
																	rows={5}
																	{...field}
																/>
															</FormControl>
															<FormDescription>
																You can <span>@mention</span> other users and
																teams.
															</FormDescription>
															<FormMessage />
														</FormItem>
													)}
												/>
												<Button type="submit">Comment</Button>
											</form>
										</Form>
									</div>
								) : null}
								<CommentList postId={props.postId} />
							</CardContent>
						</Card>
					) : (
						<PostCardSkeleton />
					)}
				</div>
				<div className="col-span-2">
					{results.data ? (
						<Card>
							<CardHeader>
								<CardTitle>About Author</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex items-center">
									<Avatar className="mr-2">
										<AvatarImage
											src={results.data.user.pfp_url}
											alt="ProfilePicture"
										/>
										<AvatarFallback>PF</AvatarFallback>
									</Avatar>
									<Link
										href={`/profile/${results.data.user.user_id}`}
										className="font-semibold"
									>
										{results.data.user.username}
									</Link>
								</div>
								<p className="text-sm">
									Ironic, satirical memes about Asia & its people. The sub is
									strictly based on serving as entertainment and does not
									condone any form of racism, homophobia, extremism or
									hyper-nationalism.{" "}
								</p>
								<div className="flex items-center pt-2">
									<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
									<span className="text-xs text-muted-foreground">
										Created December 2021
									</span>
								</div>
								<div className="p-2 flex justify-center">
									<span className="font-semibold mr-2">143k </span>Members
								</div>
								<Button className="rounded-full w-full" size="sm">
									Follow
								</Button>
							</CardContent>
						</Card>
					) : null}
				</div>
			</div>
		</main>
	);
};

export default PostPage;
