
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
// login api call

export async function loginService(email:string, password:string){

    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error("Login failed! please check your credentials");
          }
        return response.json();
}

// register api call
export async function registerService(name:string, email:string, password:string){
  
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            throw new Error("Registration failed! please try again");
          }
        return response.json();
}

// logout
export async function logoutService(){
    console.log('logout service -------------')
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`,
       {
        method:"GET",
        credentials: "include" });
       return res.json();
    
}