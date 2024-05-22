"use client";

import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SearchBar({ categories }: { categories: Category[] }) {
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-search-bar">
      <input type="text" placeholder="Search..." ref={inputRef} />
      <div className="separator" />
      <div
        className={cn("select-container", {
          active: categoryOpened
        })}
        onClick={() => setCategoryOpened(!categoryOpened)}
      >
        {selectedCategory}
        <Image
          src="/assets/icons/arrow.svg"
          alt="Arrow logo"
          width={16}
          height={16}
          className="arrow-icon"
        />
      </div>
      <div
        className={cn("category-dropdown", {
          active: categoryOpened
        })}
        ref={dropdownRef}
      >
        <ul>
          <li
            onClick={() => {
              setSelectedCategory("All categories");
              setCategoryOpened(!categoryOpened);
              inputRef.current?.focus();
            }}
            className={cn("category-item", {
              selected: selectedCategory === "All categories"
            })}
          >
            All categories
          </li>
          {categories.map((category: Category) => (
            <li
              key={category._id}
              onClick={() => {
                setSelectedCategory(category.name);
                setCategoryOpened(!categoryOpened);
                inputRef.current?.focus();
              }}
              className={cn("category-item", {
                selected: selectedCategory === category.name
              })}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <button type="submit">
        <Image
          src="/assets/icons/search.svg"
          alt="Search logo"
          width={24}
          height={24}
          className="search-icon"
        />
      </button>
    </div>
  );
}
