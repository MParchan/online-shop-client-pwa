import { cn } from "@/libs/twMerge.lib";
import { ButtonHTMLAttributes, FC } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({ className, ...props }) => {
  return <button className={cn("button", { className })} {...props} />;
};
