'use client'
import React from 'react'

import { deleteTodoService, getTodoService } from '../services/todoService';
import { UserStateContext } from '../context/ContextProvider';


type Todo ={
    id:string,
    title:string,
    description:string,
    completed:string ,
    createdAt:string ,
    userId:string
}
const Card = ({ onEditTodo }: { onEditTodo: (todo: Todo) => void }) => {
  const {user ,setTodos ,todos,deleteTodo } = UserStateContext();
  // const [selectedTodo, setSelectedTodo] = React.useState<Todo | undefined>(undefined);


  React.useEffect(() => {
    if (user?.userId !== "") { // Only fetch todos if user is available
      getTodoService().then((data) => {
        console.log("Fetched todos:", data);
        if ("data" in data) {
          setTodos(data.data);
        }
      });
    }
  }, [user]); 

  const handleDeleteTodo = async (id: string) => {
    console.log('delete todo', id)
    try {
      const res = await deleteTodoService(id);
  
      if (res.error) {
        console.error("Delete failed:", res.error);
        return;
      }
      deleteTodo(id);
      console.log("Delete successful");
      
  
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
 

  return (
    <div>
      {todos.map((todo,index) => (
        <div key={index} className="w-full flex justify-center py-6">
          <div className="w-[80%] bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center border border-gray-200">
           {/* Left Side */}
            <div className="w-3/4 space-y-2">
                <h1 className="text-xl font-bold text-gray-800">{todo.title}</h1>
                <p className="text-gray-600">{todo.description}</p>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">Active</span>
            </div>
          
          {/* Right Side - Buttons */}
        <div className="flex space-x-3">
          <button 
          onClick={()=>onEditTodo(todo)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all">Edit</button>
          <button
          onClick={()=> handleDeleteTodo(todo.id)}
           className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all">Delete</button>
        </div>
          </div>
          </div>

      ))}

        {/* TodoModal for Update */}
        {/* {isOpenTodoModal && (
        <TodoModal 
          isUpdate={true}
          initialData={selectedTodo} 
     
        />
      )} */}
    </div>
  );
};

export default Card;
