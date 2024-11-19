"use client";
import { cn } from "@/libs/twMerge.lib";
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  maxLength?: number;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Textarea = ({ className, maxLength = 200, setValue, ...rest }: TextareaProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  const progressPercentage = (text.length / maxLength) * 100;
  return (
    <div className="textarea-wrapper">
      <textarea
        className={cn("textarea", className)}
        value={text}
        ref={textareaRef}
        onChange={(e) => {
          setText(e.target.value);
          if (setValue) {
            setValue(e.target.value);
          }
        }}
        maxLength={maxLength}
        {...rest}
      />
      <div className="textarea-progress-wrapper">
        <div className="textarea-progress-bar-wrapper">
          <div className="textarea-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="textarea-progress-characters">
          {maxLength - text.length} characters remaining
        </p>
      </div>
    </div>
  );
};

export default Textarea;
