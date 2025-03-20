"use client";

import { useState, useTransition } from "react";
import { UserStateContext } from "../context/ContextProvider";
import { handleLogin, handleRegister } from "../actions/authActions";
export const ModelHandelBtn = () => {
  const { isOpen, closeModal,setUser  } = UserStateContext();
  const [haveAnAccount, setHaveAnAccount] = useState(true);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  
  const handleSubmit = (formData: FormData) => {
    console.log("Submitting:", formData.get("email"), formData.get("password"));
    startTransition(async () => {
      const response = haveAnAccount
        ? await handleLogin(formData)
        : await handleRegister(formData);

      setMessage(response.message || "");
      if (response.success) {
        console.log("User:", response.user.data);
        setUser(response.user.data);
        closeModal();
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="max-w-lg space-y-4 border bg-white p-12">
            <h2 className="text-xl font-bold mb-4">
              {haveAnAccount ? "Login" : "Register Here"}
            </h2>

            {message && <p className="text-red-500">{message}</p>}

            <form action={handleSubmit} className="space-y-4 p-4 border rounded">
              {!haveAnAccount && (
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : haveAnAccount ? "Login" : "Register"}
                </button>
              </div>
            </form>

            <button
              onClick={() => setHaveAnAccount(!haveAnAccount)}
              className="text-blue-500 hover:underline"
            >
              {haveAnAccount ? "I do not have an account" : "I have an account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
