"use client";

import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import { Subcategory } from "@/types/models/subcategory.types";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function NavbarCategories({ categories }: { categories: Category[] }) {
  const [categorySelected, setCategorySelected] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (categoryId: string) => {
    if (categorySelected) {
      setCategorySelected(categoryId);
      document.getElementById("overlay")?.classList.add("overlay-block");
    } else {
      const id = setTimeout(() => {
        setCategorySelected(categoryId);
        document.getElementById("overlay")?.classList.add("overlay-block");
      }, 200);
      setTimeoutId(id);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setCategorySelected(null);
    document.getElementById("overlay")?.classList.remove("overlay-block");
  };

  return (
    <div className="navbar-categories">
      <ul className="navbar-category-list">
        {categories.map((category: Category, index: number) => (
          <li
            key={category._id}
            onMouseEnter={() => handleMouseEnter(category._id)}
            onMouseLeave={() => handleMouseLeave()}
            className={cn("navbar-category-item", {
              active: categorySelected === category._id
            })}
          >
            <a href="/" className="navbar-category-tile">
              <Image
                src={`/assets/icons/${category.name}.svg`}
                alt={`${category.name} logo`}
                width={24}
                height={24}
                className="navbar-category-icon"
              />
              {category.name}
            </a>

            <div
              className={cn("navbar-category-dropdown", {
                active: categorySelected === category._id,
                left: index < categories.length / 2,
                right: index >= categories.length / 2
              })}
            >
              <ul className="navbar-category-dropdown-list">
                {category.subcategories.map((subcategory: Subcategory) => (
                  <li className="navbar-category-dropdown-item" key={subcategory._id}>
                    <a className="navbar-category-dropdown-link" href="/">
                      <span>{subcategory.name}</span>
                      <Image
                        src="/assets/icons/arrow_right.svg"
                        alt={`Arrow right logo`}
                        width={24}
                        height={24}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}