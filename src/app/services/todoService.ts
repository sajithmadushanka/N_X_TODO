// create todo api call
export async function createTodoService(title:string, description:string){
    const response = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
        });
        return response.json();
}
// get all todo
export async function getTodoService(){
    const response = await fetch("http://localhost:3000/api/todo", {
        method: "GET",
        });
        return response.json();
}
// delete todo
export async function deleteTodoService(id:string){
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE",
        });
        return response.json();
    }

    // update todo
export async function updateTodoService(id:string,title:string, description:string){
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
        });
        return response.json();
}