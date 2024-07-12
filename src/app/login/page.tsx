"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import authService from "@/api/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      await authService.login(user);
      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.errorMessage);
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user.email, user.password]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold">{loading ? "Processing" : "Login"}</h1>
      <hr className="w-full my-4 " />
      <div className="w-64">
        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <button
          onClick={handleLogin}
          disabled={buttonDisabled}
          className={`w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none ${buttonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <hr className="w-full my-4 " />
        <a href="/forgotpassword" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
        <p className="mt-2">
          Not registered?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
