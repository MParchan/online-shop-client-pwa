"use client";

import Image from "next/image";
import Input from "../input/Input";
import { cn } from "@/libs/twMerge.lib";
import { ChangeEvent, useEffect, useState } from "react";
import Select from "../select/Select";

interface PaginationProps {
  currentPage: number;
  allPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ currentPage, allPages, setPage, setLimit }: PaginationProps) {
  const [inputValue, setInputValue] = useState("1");
  const [limitValue, setLimitValue] = useState("9");

  useEffect(() => {
    setLimit(Number(limitValue));
  }, [limitValue, setLimit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || Number(inputValue) < 1) {
      setInputValue("1");
      setPage(1);
    } else if (Number(inputValue) > allPages) {
      setInputValue(allPages.toString());
      setPage(allPages);
    } else {
      setPage(Number(inputValue));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue === "" || Number(inputValue) < 1) {
        setInputValue("1");
        setPage(1);
      } else if (Number(inputValue) > allPages) {
        setInputValue(allPages.toString());
        setPage(allPages);
      } else {
        setPage(Number(inputValue));
      }
    }
  };

  return (
    <div className="pagination">
      <Select
        options={["6", "9", "12", "24"]}
        defaultValue="9"
        className="pagination-select"
        setValue={setLimitValue}
      />
      <button
        className={cn("pagination-button", { disabled: currentPage === 1 })}
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        <Image
          src="/assets/icons/arrow_left.svg"
          alt="Arrow left icon"
          width={24}
          height={24}
          className="w-auto h-[24px]"
        />
      </button>
      <Input
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="pagination-input"
      />
      <span>of {allPages}</span>
      <button
        className={cn("pagination-button", { disabled: currentPage === allPages })}
        disabled={currentPage === allPages}
        onClick={() => setPage(currentPage + 1)}
      >
        <Image
          src="/assets/icons/arrow_right.svg"
          alt="Arrow right icon"
          width={24}
          height={24}
          className="w-auto h-[24px]"
        />
      </button>
    </div>
  );
}
