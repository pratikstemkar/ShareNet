"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/store";

const formSchema = z.object({
	email: z.string().min(2).max(50).email(),
	username: z.string(),
});

export function EditProfile() {
	const email = useAppSelector((state) => state.authReducer.value.email);
	const username = useAppSelector((state) => state.authReducer.value.username);

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email,
			username,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm">
					<Edit className="h-[1.2rem] w-[1.2rem] mr-2" /> Edit Profile
				</Button>
			</DialogTrigger>

			<DialogContent className="grid gap-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when you&apos;re
								done.
							</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email@example.com" {...field} />
									</FormControl>
									{/* <FormDescription>
									This is your public display name.
								</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									{/* <FormDescription>Password is saved in hash.</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
