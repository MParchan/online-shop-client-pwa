"use client";

import RegisterForm from "@/components/auth/registerForm/RegisterForm";
import { useEffect } from "react";

export default function RegisterPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);
  return (
    <div className="w-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
}
