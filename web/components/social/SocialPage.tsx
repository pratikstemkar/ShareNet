"use client";

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
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SocialPage() {
	const router = useRouter();

	return (
		<div className="grid grid-cols-4 gap-5">
			<div className="col-span-3 space-y-5">
				<Card>
					{/* <CardHeader className="font-bold">Create Post</CardHeader> */}
					<CardContent className="mt-5">
						<div className="flex space-x-2 items-center">
							<Avatar className="h-8 w-8 mr-2">
								<AvatarImage
									src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU"
									alt="ProfilePicture"
								/>
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
				<div className="space-y-5">
					<Card
						className="dark:hover:border-white hover:border-black hover:cursor-pointer"
						onClick={() => router.push("/post/asd")}
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
											India
										</Link>
									</HoverCardTrigger>
									<HoverCardContent className="w-80">
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
													{/* <div>56k members</div> */}
												</div>
												<p className="text-sm">
													The React Framework – created and maintained by
													@vercel.
												</p>
												<Button className="rounded-full w-full mt-4" size="sm">
													Join Team
												</Button>
												{/* <div className="flex items-center pt-2">
														<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
														<span className="text-xs text-muted-foreground">
															Joined December 2021
														</span>
													</div> */}
											</div>
										</div>
									</HoverCardContent>
								</HoverCard>
								<span className="mr-2">
									Posted by{" "}
									<Link href="/" className="hover:underline">
										Pratik
									</Link>{" "}
								</span>
								<span>4 Hours ago</span>
							</div>
							<CardTitle>Post Title</CardTitle>
						</CardHeader>
						<CardContent>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
							reiciendis animi corporis omnis! Nemo quas laboriosam voluptas
							distinctio eius voluptatem facere, eaque magnam a earum ratione
							qui maxime laborum iure?
						</CardContent>
						<CardFooter>
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
									23 Comments
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
				</div>
			</div>
			<div className="space-y-5">
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
