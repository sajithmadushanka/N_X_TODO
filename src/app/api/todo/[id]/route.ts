import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

// get by id
export async function GET(req: Request,{ params }: { params: Promise<{ id: string }> }) {
    console.log("dynamic route")
    const {id} =  await params;

    console.log("todoId",id);
    const cookie = await cookies()
    const userId = cookie.get("userId")?.value;
    console.log(userId)
        if(!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
                );
            }

    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id),
            },
            });
            if(!todo) {
                return NextResponse.json(
                    { error: "Todo not found" },
                    { status: 404 }
                    );
                }
            if(todo.userId !== parseInt(userId)) {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 403 }
                    );
                }
                return NextResponse.json(
                { message: "Todo fetched successfully", data: todo },
                { status: 200 }
                );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                return NextResponse.json(
                { error: "Something went wrong" },
                { status: 500 }
                );
            }
    }

// update todo
export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }> }) {
    const {id} =  await params;
    const { title, description } = await req.json();
    const cookie = await cookies()
    const userId = cookie.get("userId")?.value;
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
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id),
            },
            });
            if(!todo) {
                return NextResponse.json(
                    { error: "Todo not found" },
                    { status: 404 }
                    );
                }
            if(todo.userId !== parseInt(userId)) {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 403 }
                    );
                }
                const updatedTodo = await prisma.todo.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        title,
                        description,
                    },
                    });
                    return NextResponse.json(
                    { message: "Todo updated successfully", data: updatedTodo },
                    { status: 200 }
                    );
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    return NextResponse.json(
                    { error: "Something went wrong" },
                    { status: 500 }
                    );
                }
    }

// delete todo  
export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
    const {id} =  await params;
    const cookie = await cookies()
    const userId = cookie.get("userId")?.value;
    if(!userId) {
        return NextResponse.json(
            { error: "User not authenticated" },
            { status: 401 }
            );
        }
    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id),
            },
            });
            if(!todo) {
                return NextResponse.json(
                    { error: "Todo not found" },
                    { status: 404 }
                    );
                }
            if(todo.userId !== parseInt(userId)) {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 403 }
                    );
                }
                await prisma.todo.delete({
                    where: {
                        id: parseInt(id),
                    },
                    });
                    return NextResponse.json(
                    { message: "Todo deleted successfully" },
                    { status: 200 }
                    );
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    return NextResponse.json(
                    { error: "Something went wrong" },
                    { status: 500 }
                    );
                }
    }