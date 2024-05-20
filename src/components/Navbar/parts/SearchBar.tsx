"use client";

import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import Image from "next/image";
import { useState } from "react";

export default function SearchBar({ categories }: { categories: Category[] }) {
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  return (
    <div className="navbar-search-bar">
      <input type="text" placeholder="Search..." />
      <div className="separator" />
      <div className="select-container" onClick={() => setCategoryOpened(!categoryOpened)}>
        {selectedCategory}
      </div>
      <div
        className={cn("category-dropdown", {
          active: categoryOpened
        })}
      >
        <ul>
          <li onClick={() => setSelectedCategory("All categories")}>All categories</li>
          {categories.map((category: Category) => (
            <li
              key={category._id}
              onClick={() => {
                setSelectedCategory(category.name);
                setCategoryOpened(!categoryOpened);
              }}
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
