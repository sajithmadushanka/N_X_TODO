
import { loginService, registerService } from "../services/authService";
export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email, password);
  if(!email || !password) {
    return { success: false, message: "All fields are required" };
  }
  try {
    const user = await loginService(email, password);
    return { success: true, user };
  } catch (error) {
    return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
  }

  
}

export async function handleRegister(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Simulate user registration (Replace with actual API call)
  if (!name || !email || !password) {
    return { success: false, message: "All fields are required" };
  }

    try {
        const user = await registerService(name, email, password);
        return { success: true, user };
    } catch (error) {
        return { success: false, message: (error instanceof Error ? error.message : "An unknown error occurred") };
    }
}
