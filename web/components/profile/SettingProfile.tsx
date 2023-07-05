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
import { Edit, SettingsIcon } from "lucide-react";

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
import { useUpdateUserMutation } from "@/redux/features/authApi";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2Icon } from "lucide-react";

const formSchema = z.object({
	email: z.string().min(2).max(50).email(),
	username: z.string(),
	pfp_url: z.string(),
});

export function SettingProfile() {
	const email = useAppSelector((state) => state.authReducer.value.email);
	const username = useAppSelector((state) => state.authReducer.value.username);
	const pfp_url = useAppSelector((state) => state.authReducer.value.pfp_url);
	const user_id = useAppSelector((state) => state.authReducer.value.user_id);

	const { toast } = useToast();

	const [
		updateUser,
		{
			data: updateData,
			isSuccess: updateSuccess,
			isError: updateError,
			isLoading: updateLoading,
		},
	] = useUpdateUserMutation();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email,
			username,
			pfp_url,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		if (values.email && values.username && values.pfp_url) {
			updateUser({
				user_id,
				username: values.username,
				email: values.email,
				pfp_url: values.pfp_url,
			});
		}
	}

	useEffect(() => {
		if (updateError) {
			toast({
				title: "Update Failed!",
			});
		}

		if (updateSuccess) {
			if (updateData) {
				console.log(updateData);
				toast({
					title: "User updated Successfully!",
				});
			}
		}
	}, [updateLoading]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="ghost" className="ml-2">
					<SettingsIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>

			<DialogContent className="grid gap-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<DialogHeader>
							<DialogTitle>Settings</DialogTitle>
							<DialogDescription>
								Manage your profile settings.
							</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="email@example.com"
											{...field}
											disabled
										/>
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
							<DialogClose>
								<Button type="submit" variant="destructive">
									<Trash2Icon className="h-4 w-4 mr-1" /> Delete Account
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
