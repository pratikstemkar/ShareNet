import { CopyIcon } from "@radix-ui/react-icons";
import copy from "copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ForwardIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";

export function SharePop(props: { postId: number }) {
	const { toast } = useToast();
	const copyLink = () => {
		copy(`http://localhost:3000/post/${props.postId}`);
		toast({
			title: "Link Copied!",
		});
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="sm">
					<ForwardIcon className="h-4 w-4 mr-2" />
					Share
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-[520px]">
				<div className="flex flex-col space-y-2 text-center sm:text-left">
					<h3 className="text-lg font-semibold">Share Post</h3>
					<p className="text-sm text-muted-foreground">
						Anyone who has this link will be able to view this.
					</p>
				</div>
				<div className="flex items-center space-x-2 pt-4">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input
							id="link"
							defaultValue={`http://localhost:3000/post/${props.postId}`}
							readOnly
							className="h-9"
						/>
					</div>
					<Button
						type="submit"
						size="sm"
						className="px-3"
						onClick={() => copyLink()}
					>
						<span className="sr-only">Copy</span>
						<CopyIcon className="h-4 w-4" />
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
