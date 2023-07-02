"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { UserNav } from "./UserNav";
import { ModeToggle } from "../dark-mode/ModeToggle";
import { Badge } from "../ui/badge";
import { NotiPop } from "./NotiPop";
import Image from "next/image";

const Navbar = () => {
	const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
	const roles = useAppSelector((state) => state.authReducer.value.roles);

	return (
		<header className="sticky top-0 z-10  border dark:bg-slate-950 bg-white">
			<nav className="max-w-7xl p-3 flex justify-between items-center m-auto">
				<h1 className="text-3xl font-extrabold leading-none tracking-tight hover:text-indigo-500 flex items-center">
					<Link href="/">
						<Image
							src="/cricket-ball.png"
							height={30}
							width={30}
							alt="logo"
							className="dark:invert mr-2 hover:cursor-pointer"
						/>
					</Link>
					<Link href="/">{process.env.NEXT_PUBLIC_APP_NAME}</Link>
					{roles?.includes("pro") ? (
						<sup>
							<Badge className="h-4 ml-1">PRO</Badge>
						</sup>
					) : null}
				</h1>

				<div className="space-x-5 items-center flex">
					{isAuth ? (
						<>
							<NotiPop />
							<UserNav />
						</>
					) : (
						<>
							<Link href="/auth/login">
								<Button variant="outline" size="sm">
									Login
								</Button>
							</Link>
							<Link href="/auth/register">
								<Button variant="outline" size="sm">
									Create Account
								</Button>
							</Link>
							<ModeToggle />
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
