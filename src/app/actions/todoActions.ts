import { createTodoService } from "../services/todoService";

export async function handleTodoCreate(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  console.log(title, description);
  if (!title || !description) {
    return { success: false, message: "All fields are required" };
  }
  // Simulate todo creation (Replace with actual API call)
  try {
    const todo = await createTodoService(title, description);
    return { success: true, todo };
  }
  catch (error) {
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }
}
 