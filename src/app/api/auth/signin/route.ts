import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
export async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log(email, password);
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 400 }
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...rest } = user;
      const res = NextResponse.json(
        { message: "Login successful", data: rest },
        { status: 200 }
      );
      // set cookies -----------------
      (await cookies()).set("userId", user.id.toString(), {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      // cros origin  -----------------
      
      return res;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
