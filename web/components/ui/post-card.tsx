import * as React from "react";

import { cn } from "@/lib/utils";

const CardPost = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"rounded-lg border bg-card text-card-foreground shadow-sm",
			className
		)}
		{...props}
	/>
));
CardPost.displayName = "CardPost";

const CardHeaderPost = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-0.5 pl-4 pt-4", className)}
		{...props}
	/>
));
CardHeaderPost.displayName = "CardHeaderPost";

const CardTitlePost = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	/>
));
CardTitlePost.displayName = "CardTitlePost";

const CardDescriptionPost = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CardDescriptionPost.displayName = "CardDescriptionPost";

const CardContentPost = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("px-4 py-2 text-sm", className)} {...props} />
));
CardContentPost.displayName = "CardContentPost";

const CardFooterPost = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(" flex items-center px-4 pb-4", className)}
		{...props}
	/>
));
CardFooterPost.displayName = "CardFooterPost";

export {
	CardPost,
	CardHeaderPost,
	CardFooterPost,
	CardTitlePost,
	CardDescriptionPost,
	CardContentPost,
};
