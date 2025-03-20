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