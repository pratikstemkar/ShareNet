// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Data = {
	name: string;
};

export function GET(res: NextApiResponse<Data>) {
	return NextResponse.json({ message: "hello" });
}
