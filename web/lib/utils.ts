import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUsernameFromEmail(email: string): string | null {
	const atIndex = email.indexOf("@");
	if (atIndex !== -1) {
		return email.slice(0, atIndex);
	}
	return null;
}

interface MyObject {
	rolename: string;
}

export function convertStringArrayToObjectArray(
	strArray: string[]
): MyObject[] {
	const objArray: MyObject[] = [];

	for (const str of strArray) {
		const name = str.trim();

		const obj: MyObject = {
			rolename: name,
		};

		objArray.push(obj);
	}

	return objArray;
}

export function convertTimestampToReadableTime(timestamp: string): string {
	const date = new Date(timestamp);
	return date.toLocaleString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZoneName: "short",
	});
}

export function convertTimestampToRelativeTime(timestamp: string): string {
	const date = new Date(timestamp);
	return formatDistanceToNow(date, { addSuffix: true });
}
