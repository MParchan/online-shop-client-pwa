"use client";

import Image from "next/image";
import Input from "../input/Input";
import { cn } from "@/libs/twMerge.lib";
import { ChangeEvent, useState } from "react";
import Select from "../select/Select";

interface PaginationProps {
  currentPage: number;
  allPages: number;
  limit?: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit?: React.Dispatch<React.SetStateAction<string>>;
}

export default function Pagination({
  currentPage,
  allPages,
  limit,
  setPage,
  setLimit
}: PaginationProps) {
  const [inputValue, setInputValue] = useState("1");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (Number(value) > allPages) {
        setInputValue(allPages.toString());
        setPage(allPages);
      } else if (!value.length) {
        setInputValue("");
      } else {
        setInputValue(value);
        setPage(Number(value));
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || Number(inputValue) < 1) {
      setInputValue("");
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
      {setLimit && limit && (
        <Select
          options={["6", "12", "24"]}
          defaultValue={limit}
          className="pagination-select"
          setValue={setLimit}
        />
      )}
      <button
        className={cn("pagination-button", { disabled: currentPage === 1 })}
        disabled={currentPage === 1}
        onClick={() => {
          setPage(currentPage - 1);
          setInputValue((Number(inputValue) - 1).toString());
        }}
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
        name="pagintaion-page"
        value={inputValue.length ? currentPage : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="pagination-input"
      />
      <span>of {allPages}</span>
      <button
        className={cn("pagination-button", { disabled: currentPage === allPages })}
        disabled={currentPage === allPages}
        onClick={() => {
          setPage(currentPage + 1);
          setInputValue((Number(inputValue) + 1).toString());
        }}
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
