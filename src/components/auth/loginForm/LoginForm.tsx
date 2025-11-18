"use client";

import Button from "@/components/ui/button/Button";
import InputWithLabel from "@/components/ui/input/InputWithLabel";
import { useSubscribeToPushMutation } from "@/libs/redux/features/api/services/subscriptionService";
import { login } from "@/libs/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { urlBase64ToUint8Array } from "@/utils/urlBase64ToUint8Array";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [subscribeToPush] = useSubscribeToPushMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setShowError(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (status === "succeeded") {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const subscribeUser = async () => {
          const reg = await navigator.serviceWorker.ready;

          let subscription = await reg.pushManager.getSubscription();

          if (!subscription) {
            subscription = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
            });
          }

          await subscribeToPush({ webPush: subscription });
        };

        subscribeUser();
      }

      const previousPath = sessionStorage.getItem("path");
      router.push(previousPath || "/");
    }
  }, [status, router, subscribeToPush]);
  return (
    <div className="login-form-wrapper">
      <header className="login-form-header">Log In</header>
      <form onSubmit={handleSubmit}>
        <div className="login-form-input-wrapper">
          <InputWithLabel
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-form-input-wrapper">
          <InputWithLabel
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={togglePasswordVisibility} className="toggle-password-button">
            <div>
              {showPassword ? (
                <Image
                  src="/assets/icons/visibility.svg"
                  alt="visibility icon"
                  width={20}
                  height={20}
                  className="toggle-password-button-icon"
                />
              ) : (
                <Image
                  src="/assets/icons/visibility_off.svg"
                  alt="visibility icon"
                  width={20}
                  height={20}
                  className="toggle-password-button-icon"
                />
              )}
            </div>
          </span>
        </div>
        {showError && <p className="login-form-error">{error}</p>}
        <div className="login-form-submit">
          <Button type="submit" disabled={status === "loading"} loading={status === "loading"}>
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
