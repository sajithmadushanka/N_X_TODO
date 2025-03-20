
'use client';

import {createContext, useContext, useState} from 'react';

// type Modal = {
//     isOpen: boolean;
//     openModal: () => void;
//     closeModal: () => void;
// }
// const defaultModal: Modal = {
//     isOpen: false,
//     openModal: () => {},
//     closeModal: () => {},
// }
type User = {
    userId: string;
    email: string;
    name: string | null;
};
const defaultUser: User = {
    userId: "",
    email: "",
    name: "",
}
type Todo ={
    id:string,
    title:string,
    description:string,
    completed:string ,
    createdAt:string ,
    userId:string
}
// const defaultTodo ={
//     id:"",
//     title:"",
//     description:"",
//     completed:"" ,
//     createdAt:"" ,
//     userId:""
// }
// export const UserContext = createContext<User>(defaultUser);

// const ModalContext = createContext<Modal>(defaultModal);
const StateContext = createContext({
    isOpen: false,
    openModal: () => {},
    closeModal: () => {},
    user: defaultUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (user: User) => {},

    // todo modal
    isOpenTodoModal: false,
    openTodoModal: () => {},
    closeTodoModal: () => {},
    //--------------
    todos: [] as Todo[],
    setTodos: (todos: Todo[]) => {},
    addTodo: (todo: Todo) => {},
    updateTodo: (todo: Todo) => {},
    deleteTodo: (id: string) => {},
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Functions to open and close modal
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [user, setUser] = useState<User>(defaultUser);

    // todo modal
    const [isOpenTodoModal, setIsOpenTodoModal] = useState(false);
    const openTodoModal = () => setIsOpenTodoModal(true);
    const closeTodoModal = () => setIsOpenTodoModal(false);
 // Todo state management
 const [todos, setTodos] = useState<Todo[]>([]);

 const addTodo = (todo: Todo) => {
     setTodos((prevTodos) => [...prevTodos, todo]);
 };

 const updateTodo = (updatedTodo: Todo) => {
     setTodos((prevTodos) =>
         prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
     );
 };

 const deleteTodo = (id: string) => {
     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
 };

    
    return (
        <StateContext.Provider value={{ isOpen, openModal, closeModal, user, setUser,
        isOpenTodoModal, openTodoModal, closeTodoModal,
        todos,
        setTodos,
        addTodo,
        updateTodo,
        deleteTodo,
         }}>
            {children}
        </StateContext.Provider>
    );
};

export const UserStateContext = () => {
    return useContext(StateContext);
};