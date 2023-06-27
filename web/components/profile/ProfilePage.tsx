"use client";
import { EditProfile } from "@/components/profile/EditProfile";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
	const router = useRouter();

	if (!isAuth) {
		router.push("/auth/login");
	}

	return (
		<main className="max-w-5xl m-auto">
			<div className="grid">
				<div className="grid grid-rows-2">
					<div className="grid grid-cols-2">
						<div className="p-5">
							<div className="flex items-center">
								<ProfileAvatar />
							</div>
						</div>
						<div className="p-5 flex flex-row-reverse items-center">
							<EditProfile />
						</div>
					</div>
					{/* <div className="p-5">Hello</div> */}
				</div>
			</div>
		</main>
	);
}
