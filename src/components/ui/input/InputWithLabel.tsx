"use client";

import { cn } from "@/libs/twMerge.lib";
import { InputHTMLAttributes, useRef } from "react";
import Input from "@/components/ui/input/Input";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const InputWithLabel = ({ label, className, ...rest }: InputWithLabelProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className={cn("input-with-label", className)}>
      <label
        onClick={() => {
          if (ref.current) {
            ref.current.focus();
          }
        }}
        className={`input-with-label-label ${ref.current?.value ? "focused" : ""}`}
      >
        {label}
      </label>
      <Input ref={ref} className="input-with-label-input" {...rest} />
    </div>
  );
};

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
