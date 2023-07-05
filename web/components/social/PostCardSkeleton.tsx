import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PostCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<div className="text-sm flex items-center">
					<Skeleton className="h-4 w-4 mr-2" />
					<Skeleton className="h-3 w-[300px]" />
				</div>
				<CardTitle>
					<Skeleton className="h-6 w-[300px]" />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-20 w-full" />
			</CardContent>
			<CardFooter>
				<Skeleton className="h-10 w-1/2" />
			</CardFooter>
		</Card>
	);
}
