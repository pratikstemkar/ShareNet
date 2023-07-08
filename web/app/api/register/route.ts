import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const registerUserSchema = z.object({
	email: z.string().min(10).max(20),
	password: z.string().min(8).max(20),
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	console.log("start");
	const data = await request.json();
	console.log(data);
	const { email, password } = data;

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user !== null)
		return NextResponse.json({ user: null, message: "User already exists." });

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	console.log("new " + newUser);

	return NextResponse.json({
		user: newUser,
		message: "User created successfully",
	});
}
