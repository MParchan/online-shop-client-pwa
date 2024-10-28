"use client";

import LoginForm from "@/components/auth/loginForm/LoginForm";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}
