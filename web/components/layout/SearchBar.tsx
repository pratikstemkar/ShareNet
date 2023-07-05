import {
	CalendarIcon,
	EnvelopeClosedIcon,
	FaceIcon,
	GearIcon,
	PersonIcon,
	RocketIcon,
} from "@radix-ui/react-icons";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { PopoverContent } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";

export function SearchBar() {
	return (
		<Command className="rounded-lg border">
			<Popover>
				<PopoverTrigger asChild>
					<CommandInput placeholder="Type a command or search..." />
				</PopoverTrigger>
				<PopoverContent className="min-w-5xl bg-slate-950 border-2 rounded-sm mt-1">
					<div>
						<CommandList className="z-20">
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading="Teams">
								<CommandItem>
									<Skeleton className="h-4 w-4 rounded-full mr-2" />
									<Skeleton className="h-2 w-[220px]" />
								</CommandItem>
								<CommandItem>
									<Skeleton className="h-4 w-4 rounded-full mr-2" />
									<Skeleton className="h-2 w-[220px]" />
								</CommandItem>
								<CommandItem>
									<Skeleton className="h-4 w-4 rounded-full mr-2" />
									<Skeleton className="h-2 w-[220px]" />
								</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Users">
								<CommandItem>
									<Skeleton className="h-4 w-4 rounded-full mr-2" />
									<Skeleton className="h-2 w-[220px]" />
								</CommandItem>
								<CommandItem>
									<Skeleton className="h-4 w-4 rounded-full mr-2" />
									<Skeleton className="h-2 w-[220px]" />
								</CommandItem>
								<CommandItem>
									<Skeleton className="h-4 w-4 rounded-full mr-2" />
									<Skeleton className="h-2 w-[220px]" />
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</div>
				</PopoverContent>
			</Popover>
		</Command>
	);
}
