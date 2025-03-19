// signup endpoint

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email, password);
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser;
    return NextResponse.json(
      { message: "User created successfully", data: rest },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
