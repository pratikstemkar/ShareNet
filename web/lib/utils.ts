import { type ClassValue, clsx } from "clsx";
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
