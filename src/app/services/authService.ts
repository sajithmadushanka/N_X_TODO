// login api call

export async function loginService(email:string, password:string){

    const response = await fetch("http://localhost:3000/api/auth/signin", {
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
    const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        });
        return response.json();
}

// logout
export async function logoutService(){
    console.log('logout service -------------')
    const res = await fetch("http://localhost:3000/api/auth/logout",
       {
        method:"GET",
        credentials: "include" });
       return res.json();
    
}