import { ReduxProvider } from "@/redux/ReduxProvider";
import Footer from "./Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/dark-mode/ThemeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReduxApiProvider } from "@/redux/ReduxApiProvide";
import { AuthApiProvider } from "@/redux/AuthApiProvider";
import AuthProvider from "./context/AuthProvider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<AuthProvider>
						<AuthApiProvider>
							<ReduxApiProvider>
								<ReduxProvider>
									<div className="min-h-screen flex flex-col justify-between">
										<div>
											<Navbar />
											{children}
										</div>
										<Toaster />
										<Footer />
									</div>
								</ReduxProvider>
							</ReduxApiProvider>
						</AuthApiProvider>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
