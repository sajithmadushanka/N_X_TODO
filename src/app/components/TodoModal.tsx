// todo modal
'use client'

import { useState, useTransition } from "react";
import { UserStateContext } from "../context/ContextProvider"
import { handleTodoCreate } from "../actions/todoActions";

const TodoModal = () => {
    const {closeTodoModal, addTodo} = UserStateContext();
const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const response = await handleTodoCreate(formData);
    
          setMessage(response.message || "");
          if (response.success) {
            console.log(response.todo);
            // console.log("User:", response);
            // setUser(response.user.data);
            // closeModal();
            closeTodoModal();
            addTodo(response.todo)
            
          }
        });
      };
  return (
    <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
     className="fixed inset-0 flex items-center justify-center">
        <div className="max-w-lg space-y-4 border bg-white p-12">
            <h2 className="text-xl font-bold mb-4">
            Add a new todo
            </h2>
            {message && <p className="text-red-500">{message}</p>}
            <form action={handleSubmit} className="space-y-4 p-4 border rounded">
            <input
                type="text"
                name="title"
                placeholder="Enter todo title"
                className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
            <textarea
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
                    Adding...
                    </button>
                ) : (
                    <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                    Add Todo
                    </button>
                )}
            </div>
            </form>
        </div>
    </div>

  )
}

export default TodoModal