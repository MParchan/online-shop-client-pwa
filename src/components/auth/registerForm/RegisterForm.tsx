"use client";

import InputWithLabel from "@/components/ui/input/InputWithLabel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useRegisterMutation } from "@/libs/redux/features/api/services/authService";
import Button from "@/components/ui/button/Button";
import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3,4})/, "Invalid phone number format"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+])[a-zA-Z0-9!@#$%^&*()\-_=+]+$/,
        "The password must contain an uppercase letter, a lowercase letter, a special character and a number"
      ),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not the same",
    path: ["confirmPassword"]
  });

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [apiError, setApiError] = useState("");

  const [register] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setErrors({});
    e.preventDefault();
    const result = registerSchema.safeParse({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword
    });
    if (!result.success) {
      const validationErrors: Record<string, string | undefined> = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]])
      );
      setErrors(validationErrors);
      setLoading(false);
    } else {
      try {
        await register({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          confirmPassword
        }).unwrap();
        setLoading(false);
        router.push("/auth/login");
      } catch (error) {
        const err = error as { data: { message: string } };
        setApiError(err.data.message);
        setLoading(false);
      }
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
            label="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="register-form-input-error">{errors.firstName}</p>}
        </div>
        <div className="register-form-input-wrapper">
          <InputWithLabel
            label="Last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="register-form-input-error">{errors.lastName}</p>}
        </div>
        <div className="register-form-input-wrapper">
          <InputWithLabel
            label="Phone number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <p className="register-form-input-error">{errors.phoneNumber}</p>}
        </div>
        <div className="register-form-input-wrapper">
          <InputWithLabel
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="register-form-error">{errors.email}</p>}
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
          {errors.password && <p className="register-form-input-error">{errors.password}</p>}
        </div>
        <div className="register-form-input-wrapper">
          <InputWithLabel
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
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
          {errors.confirmPassword && (
            <p className="register-form-input-error">{errors.confirmPassword}</p>
          )}
        </div>
        {apiError && <p className="register-form-error">{apiError}</p>}
        <div className="register-form-submit">
          <Button type="submit" disabled={loading} loading={loading}>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
