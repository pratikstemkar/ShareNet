"use client";

import { useAppSelector } from "@/redux/store";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useGetProfileQuery } from "@/redux/features/apiSlice";
import { Skeleton } from "../ui/skeleton";

export default function ProfileAvatar(props: { userId: string }) {
	const { data, isLoading, isSuccess, isError } = useGetProfileQuery(
		props.userId
	);

	return (
		<>
			{isLoading ? (
				<>
					<Skeleton className="h-40 w-40 rounded-full mr-5" />
					<div>
						<Skeleton className="h-4 w-[100px]" />
						<Skeleton className="h-4 w-[200px] mt-2" />
					</div>
				</>
			) : (
				<>
					<Avatar className="h-40 w-40 mr-4">
						<AvatarImage src={data.user.image} alt="ProfilePicture" />
						<AvatarFallback>PC</AvatarFallback>
					</Avatar>
					<div>
						<div className="text-2xl font-extrabold">{data.user.name}</div>
						<div className="text-slate-500">@{data.user.username}</div>
						<div className="text-sm mt-2">{data.user.bio}</div>
					</div>
				</>
			)}
		</>
	);
}
