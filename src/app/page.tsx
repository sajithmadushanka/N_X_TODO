'use client';
import { useState } from "react";
import AddTodoBtn from "./components/AddTodoBtn";
import Card from "./components/Card";
import TodoModal from "./components/TodoModal";
import { UserStateContext } from "./context/ContextProvider";

export default function Home() {

  interface Todo {
    id?: string;
    userId?: string;
    title?: string;
    description?: string;
    completed?: string;
    createdAt?: string;
}

  const { isOpenTodoModal, openTodoModal } = UserStateContext();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleOpenModalForEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    openTodoModal(); // Ensure modal opens
  };

  const handleOpenModalForCreate = () => {
    setSelectedTodo(null); // Reset for a new todo
    openTodoModal();
  };

  return (
    <>
      <AddTodoBtn onClick={handleOpenModalForCreate} />
      <Card onEditTodo={handleOpenModalForEdit} />
      {isOpenTodoModal && (
        <TodoModal 
          isUpdate={!!selectedTodo} 
          initialData={selectedTodo || {}} // Provide default values for required fields
        />
      )}
    </>
  );
}
