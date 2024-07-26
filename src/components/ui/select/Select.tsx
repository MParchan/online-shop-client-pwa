"use client";

import { cn } from "@/libs/twMerge.lib";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface SelectProps {
  options: string[];
  defaultValue: string;
  className?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Select = ({ options, defaultValue, className, setValue }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setValue(option);
  };

  return (
    <div className={cn("select", className)} ref={selectRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="select-button">
        <div className="select-button-option">{selectedOption}</div>
        <span className="select-button-span">
          {isOpen ? (
            <Image
              src="/assets/icons/arrow_close.svg"
              alt="Arrow close logo"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/assets/icons/arrow_open.svg"
              alt="Arrow open logo"
              width={20}
              height={20}
            />
          )}
        </span>
      </button>
      {isOpen && (
        <ul className="select-list">
          {options.map((option, index) => (
            <li key={index} className="select-list-item" onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
