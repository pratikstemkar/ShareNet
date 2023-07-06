"use client";

import { useAppSelector } from "@/redux/store";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function ProfileAvatar() {
	const email = useAppSelector((state) => state.authReducer.value.email);
	const username = useAppSelector((state) => state.authReducer.value.username);
	const pfp_url = useAppSelector((state) => state.authReducer.value.pfp_url);
	return (
		<>
			<Avatar className="h-40 w-40 mr-5">
				<AvatarImage src={pfp_url} alt="ProfilePicture" />
				<AvatarFallback>PC</AvatarFallback>
			</Avatar>
			<div>
				<div className="text-lg font-extrabold">{username}</div>
				<div className="text-sm">i am good for nothing</div>
			</div>
		</>
	);
}
