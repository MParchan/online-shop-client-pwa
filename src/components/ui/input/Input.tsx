import { cn } from "@/libs/twMerge.lib";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...rest }: InputProps) => {
  return <input className={cn("input", className)} {...rest} />;
};

export default Input;
