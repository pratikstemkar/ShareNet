"use client";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { productsApi } from "./features/apiSlice";

export function ReduxApiProvider({ children }: { children: React.ReactNode }) {
	return <ApiProvider api={productsApi}>{children}</ApiProvider>;
}
