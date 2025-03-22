'use client'
import { UserStateContext } from "../context/ContextProvider"
import TodoModal from "./TodoModal";
const AddTodoBtn = () => {
    const {isOpenTodoModal, openTodoModal, user} = UserStateContext();

const todoModalHandler = () => {
    if(user.userId === ""){
        alert("Please login to add todo")
        return;
    }else{
        openTodoModal();
    }
  }
  return (
    <>
    <button 
    onClick={()=> todoModalHandler()}
    
    className="fixed bottom-4 right-4 p-4 w-[50px] h-[50px] items-center bg-blue-500 text-white rounded-full shadow-lg">
      +
    </button>
    {isOpenTodoModal && (
        <TodoModal isUpdate={false} />
    )}
    </>
  )
}

export default AddTodoBtn