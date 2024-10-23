"use client";

import { login } from "@/libs/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Logowanie..." : "Zaloguj"}
      </button>
      {error && <p>Błąd: {error}</p>}
    </form>
  );
}
