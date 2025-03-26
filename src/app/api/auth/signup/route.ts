


// signup endpoint

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password , name} = await req.json();
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
        name,
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
    const res = NextResponse.json(
      { message: "User created successfully", data: rest },
      { status: 201 }
    );
    // set cookies -----------------
     (await cookies()).set("userId", newUser.id.toString(), {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          return res
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
