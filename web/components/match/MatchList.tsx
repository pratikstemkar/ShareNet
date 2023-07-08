"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MatchList() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setInterval(() => setLoading(false), 1000);
	}, []);
	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{loading ? (
					<>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									<Skeleton className="h-4 w-[100px]" />
								</CardTitle>
								<Skeleton className="h-4 w-4" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-4 w-1/2 mt-1" />
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									<Skeleton className="h-4 w-[100px]" />
								</CardTitle>
								<Skeleton className="h-4 w-4" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-4 w-1/2 mt-1" />
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									<Skeleton className="h-4 w-[100px]" />
								</CardTitle>
								<Skeleton className="h-4 w-4" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-4 w-1/2 mt-1" />
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									<Skeleton className="h-4 w-[100px]" />
								</CardTitle>
								<Skeleton className="h-4 w-4" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-8 w-full" />
								<Skeleton className="h-4 w-1/2 mt-1" />
							</CardContent>
						</Card>
					</>
				) : (
					<>
						<Link href="/match/asdadsas">
							<Card className="transition ease-in-out hover:scale-110 hover:-translate-y-1">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Ind vs Aus
									</CardTitle>
									<Radio className="h-4 w-4 text-red-500" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">IND: 234/9 (45.7)</div>
									<p className="text-xs text-muted-foreground">
										Aus: 198/4 (50)
									</p>
								</CardContent>
							</Card>
						</Link>
						<Link href="/match/asdadsas">
							<Card className="transition ease-in-out hover:scale-110 hover:-translate-y-1">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Ind vs Aus
									</CardTitle>
									<Radio className="h-4 w-4 text-red-500" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">IND: 234/9 (45.7)</div>
									<p className="text-xs text-muted-foreground">
										Aus: 198/4 (50)
									</p>
								</CardContent>
							</Card>
						</Link>
						<Link href="/match/asdadsas">
							<Card className="transition ease-in-out hover:scale-110 hover:-translate-y-1">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Ind vs Aus
									</CardTitle>
									<Radio className="h-4 w-4 text-red-500" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">IND: 234/9 (45.7)</div>
									<p className="text-xs text-muted-foreground">
										Aus: 198/4 (50)
									</p>
								</CardContent>
							</Card>
						</Link>
						<Link href="/match/asdadsas">
							<Card className="transition ease-in-out hover:scale-110 hover:-translate-y-1">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Ind vs Aus
									</CardTitle>
									<Radio className="h-4 w-4 text-red-500" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">IND: 234/9 (45.7)</div>
									<p className="text-xs text-muted-foreground">
										Aus: 198/4 (50)
									</p>
								</CardContent>
							</Card>
						</Link>
					</>
				)}
			</div>
		</>
	);
}
