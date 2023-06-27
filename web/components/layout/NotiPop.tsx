import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { BellDotIcon } from "lucide-react";
import Link from "next/link";

export function NotiPop() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<BellDotIcon className="h-5 hover:cursor-pointer" />
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Notifications</h4>
						{/* <p className="text-sm text-muted-foreground">
							Find all your notifications here.
						</p> */}
					</div>
				</div>
				<div className="grid gap-2 mt-5">
					<Link href="/">
						<div>
							<span className="text-red-500">Noti 1</span>
							<p className="text-sm">
								asomejhg d ahsgdf asd jasgd asd jasgd ad jashdg ajsgd asdjhg
							</p>
						</div>
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	);
}
