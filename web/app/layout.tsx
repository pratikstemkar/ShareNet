import { ReduxProvider } from "@/redux/ReduxProvider";
import Footer from "./Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/dark-mode/ThemeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReduxApiProvider } from "@/redux/ReduxApiProvide";

export const metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME,
	description: "Cricket Ball by Ball Commentary",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="min-h-screen flex flex-col justify-between">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ReduxApiProvider>
						<ReduxProvider>
							<div>
								<Navbar />
								{children}
							</div>
							<Toaster />
							<Footer />
						</ReduxProvider>
					</ReduxApiProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
