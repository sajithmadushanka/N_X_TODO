'use client'

import { useState, useTransition } from "react";
import { UserStateContext } from "../context/ContextProvider"
import { handleTodoCreate, handleTodoUpdate } from "../actions/todoActions";

interface TodoData {
    id?: string;
    userId: string;
    title?: string;
    description?: string;
    completed?: string;
    createdAt: string;
}

const TodoModal = ({ initialData = {} as TodoData, isUpdate = false }) => {
    const { closeTodoModal, addTodo,updateTodo } = UserStateContext();

    const [title, setTitle] = useState(initialData.title || "");
    const [description, setDescription] = useState(initialData.description || "");

    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const response = isUpdate
                ? initialData.id
                    ? await handleTodoUpdate(initialData.id, initialData.userId, formData)
                    : { success: false, message: "Invalid ID" }
                : await handleTodoCreate(formData);

            setMessage(response.message || "");
            if (response.success) {
                if(isUpdate){
                  updateTodo(response.todo.data);
                }else{
                    addTodo(response.todo.data);
                }
                closeTodoModal();
            }
        });
    };

    return (
        <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className="fixed inset-0 flex items-center justify-center"
        >
            <div className="max-w-lg space-y-4 border bg-white p-12">
                <h2 className="text-xl font-bold mb-4">
                    {isUpdate ? "Update Todo" : "Add a new todo"}
                </h2>
                {message && <p className="text-red-500">{message}</p>}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append("title", title);
                        formData.append("description", description);
                        handleSubmit(formData);
                    }}
                    className="space-y-4 p-4 border rounded"
                >
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}  // Added `onChange`
                        type="text"
                        name="title"
                        placeholder="Enter todo title"
                        className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}  // Added `onChange`
                        name="description"
                        placeholder="Enter todo description"
                        className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    ></textarea>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                            onClick={closeTodoModal}
                        >
                            Cancel
                        </button>
                        {isPending ? (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                disabled
                            >
                                {isUpdate ? "Updating..." : "Adding..."}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                {isUpdate ? "Update Todo" : "Add Todo"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoModal;
