import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

// create todo endpoint
export async function POST(req: Request) {
  const { title, description } = await req.json();
  const cookie = await cookies() 
  const userId = cookie.get("userId")?.value;

  console.log(userId);
  if(!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }
  if(!userId) {
    return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
        );
    }
  try {
    const todo = await prisma.todo.create({
        data: {
            title,
            description,
            userId: parseInt(userId),
        },
        });
        return NextResponse.json(
        { message: "Todo created successfully", data: todo },
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
// get toto endpoint
export async function GET() {
    console.log('get all todos')
  const cookie = await cookies()
    const userId = cookie.get("userId")?.value;
    if(!userId) {
        return NextResponse.json(
            { error: "User not authenticated" },
            { status: 401 }
            );
        }
  try {
    const todos = await prisma.todo.findMany({
        where: {
            userId: parseInt(userId),
        },
        });
        return NextResponse.json(
        { message: "Todos fetched successfully", data: todos },
        { status: 200 }
        );
    
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
        );
    }
}
