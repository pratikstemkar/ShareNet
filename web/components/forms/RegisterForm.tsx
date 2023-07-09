"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

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
import { useToast } from "../ui/use-toast";
import { useRegisterUserMutation } from "@/redux/features/authApi";
import { useEffect } from "react";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().min(2).max(50).email(),
	password: z.string().min(8).max(18),
});

export function RegisterForm() {
	const [
		registerUser,
		{ data: rData, isSuccess: rSuccess, isError: rError, isLoading: rLoading },
	] = useRegisterUserMutation();
	const router = useRouter();
	const { toast } = useToast();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		if (values.email && values.password) {
			registerUser({
				email: values.email,
				password: values.password,
				roles: [{ name: "user" }],
			});
		}
	}

	useEffect(() => {
		if (rError) {
			toast({
				variant: "destructive",
				title: "Registration Failed!",
			});
		}

		if (rSuccess) {
			if (rData) {
				console.log(rData);
				router.push("/login");
				toast({
					title: "User Registered Successfully!",
				});
			}
		}
	}, [rLoading]);

	return (
		<Card>
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Create an account</CardTitle>
				<CardDescription>
					Enter your email below to create your account
				</CardDescription>
			</CardHeader>

			<CardContent className="grid gap-4">
				<div className="grid grid-cols-2 gap-6">
					<Button variant="outline">
						<Icons.gitHub className="mr-2 h-4 w-4" />
						Github
					</Button>
					<Button variant="outline">
						<Icons.google className="mr-2 h-4 w-4" />
						Google
					</Button>
				</div>
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} type="password" />
									</FormControl>
									{/* <FormDescription>Password is saved in hash.</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Create Account
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="text-sm ">
				Already signed up?{" "}
				<Link href="/login" className="text-blue-500 ml-2">
					Sign In
				</Link>
			</CardFooter>
		</Card>
	);
}
