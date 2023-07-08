"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { FileTextIcon, ImageIcon, LinkIcon, Trash2Icon } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { usePostPostMutation } from "@/redux/features/apiSlice";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
	postTitle: z
		.string()
		.min(5, {
			message: "Title must be at least 10 characters.",
		})
		.max(160, {
			message: "Title must not be longer than 30 characters.",
		}),
	postText: z
		.string()
		.min(10, {
			message: "Post must be at least 10 characters.",
		})
		.max(500, {
			message: "Post must not be longer than 500 characters.",
		}),
});

const LinkFormSchema = z.object({
	postTitle: z
		.string()
		.min(5, {
			message: "Title must be at least 10 characters.",
		})
		.max(160, {
			message: "Title must not be longer than 30 characters.",
		}),
	postLink: z.string().min(5).url(),
});

const ImgFormSchema = z.object({
	postTitle: z
		.string()
		.min(5, {
			message: "Title must be at least 10 characters.",
		})
		.max(160, {
			message: "Title must not be longer than 30 characters.",
		}),
	postImg: z.string().min(5),
});

const SubmitPost = () => {
	const [selectedImage, setSelectedImage] = useState<File | undefined>();
	const { toast } = useToast();
	const id = useAppSelector((state) => state.persistedReducer.value.id);
	const router = useRouter();

	const [
		postPost,
		{
			data: postData,
			isLoading: postLoading,
			isSuccess: postSuccess,
			isError: postError,
		},
	] = usePostPostMutation();

	const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
			// imgForm.setValue("postImg", "selectedImage");
		}
	};

	const removeSelectedImage = () => {
		setSelectedImage(undefined);
	};

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const linkForm = useForm<z.infer<typeof LinkFormSchema>>({
		resolver: zodResolver(LinkFormSchema),
	});

	const imgForm = useForm<z.infer<typeof ImgFormSchema>>({
		resolver: zodResolver(ImgFormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (data.postTitle && data.postText) {
			postPost({
				title: data.postTitle,
				content: data.postText,
				user_id: id,
			});
		}
	}

	useEffect(() => {
		if (postSuccess) {
			router.push("/");
			toast({
				title: "Post Submitted!",
			});
		}
		if (postError) {
			toast({
				title: "Post submission failed!",
			});
		}
	}, [postLoading]);

	function linkOnSubmit(data: z.infer<typeof LinkFormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	function imgOnSubmit(data: z.infer<typeof ImgFormSchema>) {
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
			<div className="grid grid-cols-4 gap-5">
				<div className="col-span-3">
					<h3 className="text-lg font-bold">Create a post</h3>
					<Tabs defaultValue="text" className="mt-2">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="text">
								<FileTextIcon className="h-4" />
								Post
							</TabsTrigger>
							<TabsTrigger value="image">
								<ImageIcon className="h-4" />
								Image
							</TabsTrigger>
							<TabsTrigger value="link">
								<LinkIcon className="h-4" />
								Link
							</TabsTrigger>
						</TabsList>
						<TabsContent value="text" className="mt-1">
							<Card>
								{/* <CardHeader>
									<CardTitle>Text</CardTitle>
									<CardDescription>POst your text here</CardDescription>
								</CardHeader> */}
								<CardContent className="mt-5">
									<Form {...form}>
										<form
											onSubmit={form.handleSubmit(onSubmit)}
											className="w-full space-y-2"
										>
											<FormField
												control={form.control}
												name="postTitle"
												render={({ field }) => (
													<FormItem>
														{/* <FormLabel>Title</FormLabel> */}
														<FormControl>
															<Input placeholder="Title" {...field} />
														</FormControl>
														{/* <FormDescription>Not private</FormDescription> */}
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="postText"
												render={({ field }) => (
													<FormItem>
														{/* <FormLabel>Comment</FormLabel> */}
														<FormControl>
															<Textarea
																placeholder="What are your thoughts?"
																className="resize-none"
																rows={8}
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
											<Button type="submit">Post</Button>
										</form>
									</Form>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="image" className="mt-1">
							<Card>
								{/* <CardHeader>
									<CardTitle>Text</CardTitle>
									<CardDescription>POst your text here</CardDescription>
								</CardHeader> */}
								<CardContent className="mt-5">
									<Form {...imgForm}>
										<form
											onSubmit={imgForm.handleSubmit(imgOnSubmit)}
											className="w-full space-y-2"
										>
											<FormField
												control={imgForm.control}
												name="postTitle"
												render={({ field }) => (
													<FormItem>
														{/* <FormLabel>Title</FormLabel> */}
														<FormControl>
															<Input placeholder="Title" {...field} />
														</FormControl>
														{/* <FormDescription>Not private</FormDescription> */}
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={imgForm.control}
												name="postImg"
												render={({ field }) => (
													<FormItem>
														{/* <FormLabel>Comment</FormLabel> */}
														<FormControl>
															<Input
																type="file"
																{...field}
																onChange={imageChange}
															/>
														</FormControl>
														{/* <FormDescription>
															You can <span>@mention</span> other users and
															teams.
														</FormDescription> */}
														<FormMessage />
													</FormItem>
												)}
											/>
											{selectedImage && (
												<div className="flex flex-col justify-center items-center space-y-2">
													<Image
														src={URL.createObjectURL(selectedImage)}
														alt="Thumb"
														height={800}
														width={800}
													/>
													<Button
														variant="destructive"
														onClick={removeSelectedImage}
														size="sm"
													>
														<Trash2Icon className="h-4" />
														Remove This Image
													</Button>
												</div>
											)}
											<Button type="submit">Post</Button>
										</form>
									</Form>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="link" className="mt-1">
							<Card>
								{/* <CardHeader>
									<CardTitle>Text</CardTitle>
									<CardDescription>POst your text here</CardDescription>
								</CardHeader> */}
								<CardContent className="mt-5">
									<Form {...linkForm}>
										<form
											onSubmit={linkForm.handleSubmit(linkOnSubmit)}
											className="w-full space-y-2"
										>
											<FormField
												control={linkForm.control}
												name="postTitle"
												render={({ field }) => (
													<FormItem>
														{/* <FormLabel>Title</FormLabel> */}
														<FormControl>
															<Input placeholder="Title" {...field} />
														</FormControl>
														{/* <FormDescription>Not private</FormDescription> */}
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={linkForm.control}
												name="postLink"
												render={({ field }) => (
													<FormItem>
														{/* <FormLabel>Comment</FormLabel> */}
														<FormControl>
															<Input placeholder="Url" {...field} />
														</FormControl>
														<FormDescription>
															You can <span>@mention</span> other users and
															teams.
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<Button type="submit">Post</Button>
										</form>
									</Form>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
				<div className="col-span-1">
					<h3 className="text-lg font-bold">
						Posting to {process.env.NEXT_PUBLIC_APP_NAME}
					</h3>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>Is it accessible?</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Is it styled?</AccordionTrigger>
							<AccordionContent>
								Yes. It comes with default styles that matches the other
								components&apos; aesthetic.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Is it animated?</AccordionTrigger>
							<AccordionContent>
								Yes. It&apos;s animated by default, but you can disable it if
								you prefer.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</main>
	);
};

export default SubmitPost;
