"use client";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { postApi } from "./features/apiSlice";

export function ReduxApiProvider({ children }: { children: React.ReactNode }) {
	return <ApiProvider api={postApi}>{children}</ApiProvider>;
}
