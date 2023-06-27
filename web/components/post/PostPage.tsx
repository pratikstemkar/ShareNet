"use client";

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

const PostPage = () => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<main className="max-w-5xl m-auto mt-5">
			<div className="grid grid-cols-6 gap-5">
				<div className="col-span-4">
					<Card>
						<CardHeader>
							<div className="text-sm text-slate-500">
								Posted by{" "}
								<Link href="/profile" className="hover:underline mr-2">
									username
								</Link>
								<span className="text-sm">4 Hours ago</span>
							</div>
							<CardTitle>Post Title</CardTitle>
						</CardHeader>
						<CardContent className="space-y-5">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
								mollitia quae quos voluptate quasi ullam commodi repudiandae
								labore saepe dicta ipsa rerum modi ab eaque distinctio accusamus
								maiores nulla nostrum?
							</p>
							<div className="flex">
								<Button variant="ghost" size="sm">
									24
									<ThumbsUpIcon className="h-4 w-4 ml-2" />
								</Button>
								<Button variant="ghost" size="sm">
									0
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
														You can <span>@mention</span> other users and teams.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button type="submit">Comment</Button>
									</form>
								</Form>
							</div>
							<Separator />
							<div className="space-y-5">
								<h4 className="text-lg font-semibold">24 Comments</h4>
								<div className="space-y-2">
									<div className="flex items-center">
										<Avatar className="h-8 w-8 mr-2">
											<AvatarImage
												src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU"
												alt="ProfilePicture"
											/>
											<AvatarFallback>PF</AvatarFallback>
										</Avatar>
										<Link href="/profile" className="mr-2 hover:underline">
											username
										</Link>
										<span className="text-sm text-slate-500">4 Hours ago</span>
									</div>
									<p className="text-sm">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Sapiente vero amet, ut, quisquam labore pariatur ipsa facere
										deserunt natus explicabo dolore alias doloribus voluptatem
										eaque ullam doloremque culpa tempore! Repellendus!
									</p>
									<div className="flex">
										<Button variant="ghost" size="sm">
											24
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
								<div className="space-y-2">
									<div className="flex items-center">
										<Avatar className="h-8 w-8 mr-2">
											<AvatarImage
												src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU"
												alt="ProfilePicture"
											/>
											<AvatarFallback>PF</AvatarFallback>
										</Avatar>
										<Link href="/profile" className="mr-2 hover:underline">
											username
										</Link>
										<span className="text-sm text-slate-500">4 Hours ago</span>
									</div>
									<p className="text-sm">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Sapiente vero amet, ut, quisquam labore pariatur ipsa facere
										deserunt natus explicabo dolore alias doloribus voluptatem
										eaque ullam doloremque culpa tempore! Repellendus!
									</p>
									<div className="flex">
										<Button variant="ghost" size="sm">
											24
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
								<div className="space-y-2">
									<div className="flex items-center">
										<Avatar className="h-8 w-8 mr-2">
											<AvatarImage
												src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU"
												alt="ProfilePicture"
											/>
											<AvatarFallback>PF</AvatarFallback>
										</Avatar>
										<Link href="/profile" className="mr-2 hover:underline">
											username
										</Link>
										<span className="text-sm text-slate-500">4 Hours ago</span>
									</div>
									<p className="text-sm">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Sapiente vero amet, ut, quisquam labore pariatur ipsa facere
										deserunt natus explicabo dolore alias doloribus voluptatem
										eaque ullam doloremque culpa tempore! Repellendus!
									</p>
									<div className="flex">
										<Button variant="ghost" size="sm">
											24
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
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>About Team</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="flex items-center">
								<Avatar className="mr-2">
									<AvatarImage
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU"
										alt="ProfilePicture"
									/>
									<AvatarFallback>PF</AvatarFallback>
								</Avatar>
								<Link href="/" className="font-semibold">
									India
								</Link>
							</div>
							<p className="text-sm">
								Ironic, satirical memes about Asia & its people. The sub is
								strictly based on serving as entertainment and does not condone
								any form of racism, homophobia, extremism or hyper-nationalism.{" "}
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
								Join Team
							</Button>
							<Button className="rounded-full w-full" size="sm">
								Create Post
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default PostPage;
