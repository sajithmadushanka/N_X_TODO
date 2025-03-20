'use client'
import React, { useState } from 'react'

import { getTodoService } from '../services/todoService';
import { UserStateContext } from '../context/ContextProvider';
const Card = () => {
  const {user, todos} = UserStateContext();

  type todo ={
    id:string;
    title: string;
    description: string;
    completed:boolean;
    userId:string;

  }
  const [_todos, setTodos] = useState<todo[]>([]);

  React.useEffect(() => {
    if (user?.userId !== "") { // Only fetch todos if user is available
      getTodoService().then((data) => {
        console.log("Fetched todos:", data);
        if ("data" in data) {
          setTodos(data.data);
        }
      });
    }
  }, [user]); // ✅ Trigger refetch when user changes

  return (
    <div>
      {_todos.map((todo) => (
        <div key={todo.id} className="w-full flex justify-center py-6">
          <div className="w-[80%] bg-white shadow-lg rounded-2xl p-6 flex justify-between items-center border border-gray-200">
           {/* Left Side */}
            <div className="w-3/4 space-y-2">
                <h1 className="text-xl font-bold text-gray-800">{todo.title}</h1>
                <p className="text-gray-600">{todo.description}</p>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">Active</span>
            </div>
          
          {/* Right Side - Buttons */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all">Edit</button>
          <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all">Delete</button>
        </div>
          </div>
          </div>

      ))}
    </div>
  );
};

export default Card;
