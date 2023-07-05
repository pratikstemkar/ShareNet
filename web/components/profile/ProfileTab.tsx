import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileTextIcon } from "@radix-ui/react-icons";
import {
	ForwardIcon,
	MessageSquareIcon,
	MoreHorizontalIcon,
	SaveIcon,
	ThumbsDownIcon,
	ThumbsUpIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import PostCardSkeleton from "../social/PostCardSkeleton";

export function ProfileTab() {
	return (
		<Tabs defaultValue="post" className="w-full">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="post">
					<FileTextIcon className="h-4" />
					Posts
				</TabsTrigger>
				<TabsTrigger value="comment">
					<MessageSquareIcon className="h-4" />
					Comments
				</TabsTrigger>
				<TabsTrigger value="like">
					<ThumbsUpIcon className="h-4" />
					Likes
				</TabsTrigger>
				<TabsTrigger value="save">
					<SaveIcon className="h-4" />
					Saved
				</TabsTrigger>
			</TabsList>
			<TabsContent value="post">
				<div className="p-2">
					<PostCardSkeleton />
				</div>
			</TabsContent>
			<TabsContent value="comment">Comments</TabsContent>
			<TabsContent value="like">Likes</TabsContent>
			<TabsContent value="save">Saved</TabsContent>
		</Tabs>
	);
}
