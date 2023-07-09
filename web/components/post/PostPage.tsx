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
	convertTimestampToReadableTimeProfile,
	convertTimestampToRelativeTime,
} from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import PostCardSkeleton from "../social/PostCardSkeleton";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import CommentList from "./CommentList";
import { SharePop } from "../social/SharePop";
import { PostDropdown } from "../social/PostDropdown";

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
	const isAuth = useAppSelector((state) => state.persistedReducer.value.isAuth);
	const app_user_id = useAppSelector(
		(state) => state.persistedReducer.value.id
	);

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
				user_id: app_user_id,
				post_id: post.post.id,
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
				variant: "destructive",
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
								<CardTitle className="text-2xl">{post.post.title}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-5">
								<p>{post.post.content}</p>
								<div className="flex">
									<Button variant="ghost" size="sm">
										{post.post.upvotes > 0 ? (
											<span className="mr-2">{post.post.upvotes}</span>
										) : null}
										<ThumbsUpIcon className="h-4 w-4" />
									</Button>
									<Button variant="ghost" size="sm">
										{post.post.downvotes > 0 ? (
											<span className="mr-2">{post.post.downvotes}</span>
										) : null}
										<ThumbsDownIcon className="h-4 w-4" />
									</Button>
									<SharePop postId={props.postId} />
									{/* <Button variant="ghost" size="sm">
										<SaveIcon className="h-4 w-4 mr-2" />
										Save
										</Button> */}
									{app_user_id === post.post.user_id.toString() ? (
										<PostDropdown />
									) : null}
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
											src={results.data.user.image}
											alt="ProfilePicture"
										/>
										<AvatarFallback>PF</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<Link
											href={`/profile/${results.data.user.id}`}
											className="font-semibold"
										>
											{results.data.user.name}
										</Link>
										<span className="text-slate-500 font-mono text-sm">
											@{results.data.user.username}
										</span>
									</div>
								</div>
								<p className="text-sm">{results.data?.user.bio}</p>
								<div className="flex items-center pt-2">
									<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
									<span className="text-xs text-muted-foreground">
										Joined{" "}
										{convertTimestampToReadableTimeProfile(
											results.data?.user.CreatedAt
										)}
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
