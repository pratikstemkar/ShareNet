"use client";

import { useAppSelector } from "@/redux/store";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function ProfileAvatar() {
	const email = useAppSelector((state) => state.authReducer.value.email);
	const username = useAppSelector((state) => state.authReducer.value.username);
	return (
		<>
			<Avatar className="h-40 w-40 mr-5">
				<AvatarImage
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSUaGEEgvFL2qP9pjsihLs2hqzVKqvlT1Bxg&usqp=CAU"
					alt="ProfilePicture"
				/>
				<AvatarFallback>PC</AvatarFallback>
			</Avatar>
			<div>
				<div className="text-lg">{username}</div>
				<div className="text-sm">{email}</div>
			</div>
		</>
	);
}
