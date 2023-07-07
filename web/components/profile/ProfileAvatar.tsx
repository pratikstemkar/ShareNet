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
					<Avatar className="h-40 w-40 mr-5">
						<AvatarImage src={data.user.pfp_url} alt="ProfilePicture" />
						<AvatarFallback>PC</AvatarFallback>
					</Avatar>
					<div>
						<div className="text-lg font-extrabold">{data.user.username}</div>
						<div className="text-sm">i am good for nothing</div>
					</div>
				</>
			)}
		</>
	);
}
