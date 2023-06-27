import { PaymentForm } from "@/components/forms/PaymentForm";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Pro() {
	return (
		<main>
			<div className="flex justify-center items-center mt-20">
				<div className="flex flex-col items-center space-y-5 max-w-4xl text-center">
					<h1 className="text-8xl font-extrabold">
						{process.env.NEXT_PUBLIC_APP_NAME}{" "}
						<span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
							PRO
						</span>
					</h1>
					<h2 className="text-4xl font-extralight">
						Get all of {process.env.NEXT_PUBLIC_APP_NAME} ad-free, create your
						own team and much more.
					</h2>
					{/* <Dialog>
						<DialogTrigger asChild>
							<Button>Try {process.env.NEXT_PUBLIC_APP_NAME} PRO</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click save when you&apos;re
									done.
								</DialogDescription>
							</DialogHeader>
							<PaymentForm />
							<DialogFooter>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog> */}

					<PaymentForm />

					<h3 className="text-2xl font-extralight">
						Prepaid and subscription plans available. Prices start at
						₹129.00/month. Free trials available with subscription plans only.
					</h3>
					<Link href="/" className="text-sm text-indigo-500">
						Restrictions apply. Learn more here.
					</Link>
				</div>
			</div>
		</main>
	);
}
