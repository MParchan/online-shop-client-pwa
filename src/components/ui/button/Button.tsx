import { cn } from "@/libs/twMerge.lib";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "blue" | "green" | "red";
}

const buttonVariants = {
  primary: "primary",
  blue: "blue",
  green: "green",
  red: "red"
};

const Button = ({ children, className, variant = "primary", ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        "button",
        {
          [buttonVariants.primary]: variant === "primary",
          [buttonVariants.blue]: variant === "blue",
          [buttonVariants.green]: variant === "green",
          [buttonVariants.red]: variant === "red"
        },
        className
      )}
      {...rest}
    >
      <div className="button-text">{children}</div>
    </button>
  );
};

export default Button;
