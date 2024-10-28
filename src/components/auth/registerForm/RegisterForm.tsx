"use client";

import InputWithLabel from "@/components/ui/input/InputWithLabel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useRegisterMutation } from "@/libs/redux/features/api/services/authService";
import Button from "@/components/ui/button/Button";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [register] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      await register({ email, password, confirmPassword }).unwrap();
      setLoading(false);
      router.push("/auth/login");
    } catch (error) {
      const err = error as { data: { message: string } };
      setError(err.data.message);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="register-form-wrapper">
      <header className="register-form-header">Sign up</header>
      <form onSubmit={handleSubmit}>
        <div className="register-form-input-wrapper">
          <InputWithLabel
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register-form-input-wrapper">
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
        <div className="register-form-input-wrapper">
          <InputWithLabel
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span onClick={toggleConfirmPasswordVisibility} className="toggle-password-button">
            <div>
              {showConfirmPassword ? (
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
        {error && <p className="register-form-error">{error}</p>}
        <div className="register-form-submit">
          <Button type="submit" disabled={loading} loading={loading}>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
