'use client'
import { UserStateContext } from "../context/ContextProvider"

const AddTodoBtn = ({ onClick }: { onClick: () => void }) => {

    const { user} = UserStateContext();

const todoModalHandler = () => {
    if(user.userId === ""){
        alert("Please login to add todo")
        return;
    }else{
      // setSelectedTodo(undefined);
        onClick();
    }
  }
  return (
    <>
    <button 
    onClick={()=> todoModalHandler()}
    
    className="fixed bottom-4 right-4 p-4 w-[50px] h-[50px] items-center bg-blue-500 text-white rounded-full shadow-lg">
      +
    </button>
   
    </>
  )
}

export default AddTodoBtn