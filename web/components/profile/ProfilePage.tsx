"use client";
import { EditProfile } from "@/components/profile/EditProfile";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { useAppSelector } from "@/redux/store";
import { SettingProfile } from "./SettingProfile";
import { ProfileTab } from "./ProfileTab";

export default function ProfilePage(props: { userId: string }) {
	const user_id = useAppSelector((state) => state.persistedReducer.value.id);

	return (
		<main className="max-w-5xl m-auto">
			<div className="grid grid-cols-2 mt-5">
				<div className="flex items-center">
					<ProfileAvatar {...props} />
				</div>
				{props.userId === user_id ? (
					<div className="flex flex-row-reverse items-center">
						<SettingProfile />
						<EditProfile />
					</div>
				) : null}
			</div>
			<div className="mt-5">
				<ProfileTab />
			</div>
		</main>
	);
}
