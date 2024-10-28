import { cn } from "@/libs/twMerge.lib";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, ref) => {
  return <input ref={ref} className={cn("input", className)} {...rest} />;
});

Input.displayName = "Input";

export default Input;
