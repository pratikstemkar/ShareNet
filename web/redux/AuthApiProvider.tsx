"use client";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { authApi } from "./features/authApi";

export function AuthApiProvider({ children }: { children: React.ReactNode }) {
	return <ApiProvider api={authApi}>{children}</ApiProvider>;
}
