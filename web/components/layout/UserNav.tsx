"use client";

import {
	CreditCard,
	LayoutDashboardIcon,
	LogOut,
	Moon,
	PlusCircle,
	Settings,
	User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useToast } from "../ui/use-toast";
import { useCookies } from "react-cookie";
import { signOut } from "next-auth/react";

export function UserNav(data: {
	user: { name: string; email: string; image: string; id: string };
}) {
	const email = useAppSelector((state) => state.persistedReducer.value.email);
	const username = useAppSelector(
		(state) => state.persistedReducer.value.username
	);
	const user_id = useAppSelector(
		(state) => state.persistedReducer.value.user_id
	);
	const pfp_url = useAppSelector(
		(state) => state.persistedReducer.value.pfp_url
	);

	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { setTheme } = useTheme();
	const { toast } = useToast();

	const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

	const onClickLogOut = () => {
		dispatch(logOut());
		removeCookie("access_token");
		signOut();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 rounded-full shadow"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage src={data.user.image} alt="@shadcn" />
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						{data.user.name && (
							<p className="text-sm font-medium leading-none">
								{data.user.name}
							</p>
						)}
						<p className="text-xs leading-none text-muted-foreground">
							{data.user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{/* <DropdownMenuItem
						onClick={() => router.push("/")}
						className="hover:cursor-pointer"
					>
						<LayoutDashboardIcon className="mr-2 h-4 w-4" />
						<span>Dashboard</span>
					</DropdownMenuItem> */}
					<DropdownMenuItem
						className="hover:cursor-pointer"
						onClick={() => router.push("/post/submit")}
					>
						<PlusCircle className="mr-2 h-4 w-4" />
						<span>New Post</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="hover:cursor-pointer"
						onClick={() => router.push(`/profile/${user_id}`)}
					>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
					</DropdownMenuItem>
					{/* <DropdownMenuItem className="hover:cursor-pointer">
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
					</DropdownMenuItem> */}
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="hover:cursor-pointer">
							<Moon className="mr-2 h-4 w-4" />
							Appearance
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									onClick={() => setTheme("light")}
									className="hover:cursor-pointer"
								>
									Light
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme("dark")}
									className="hover:cursor-pointer"
								>
									Dark
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => setTheme("system")}
									className="hover:cursor-pointer"
								>
									System
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					{/* <DropdownMenuItem className="hover:cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenuItem> */}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						onClickLogOut();
						toast({
							title: "Successfully Logged Out!",
							description: "Friday, February 10, 2023 at 5:57 PM",
						});
					}}
					className="hover:cursor-pointer text-red-500"
				>
					<LogOut className="mr-2 h-4 w-4" />

					<span>Log Out</span>

					{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
