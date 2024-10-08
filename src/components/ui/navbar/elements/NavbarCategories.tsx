"use client";

import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import { Subcategory } from "@/types/models/subcategory.types";
import createSlug from "@/utils/createSlug";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

interface NavbarCategoriesProps {
  categories: Category[];
  isHidden: boolean;
}

export default function NavbarCategories({ categories, isHidden }: NavbarCategoriesProps) {
  const [categorySelected, setCategorySelected] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isHidden) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setCategorySelected(null);
    }
  }, [isHidden, timeoutId]);

  const handleMouseEnter = (categoryId: string) => {
    if (categorySelected) {
      setCategorySelected(categoryId);
    } else {
      const id = setTimeout(() => {
        setCategorySelected(categoryId);
      }, 200);
      setTimeoutId(id);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setCategorySelected(null);
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
            <Link
              href={`/c/${createSlug(category.name)}/${category._id}`}
              className="navbar-category-tile"
            >
              <Image
                src={`/assets/icons/${category.name}.svg`}
                alt={`${category.name} logo`}
                width={24}
                height={24}
                className="navbar-category-icon"
              />
              {category.name}
            </Link>

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
                    <Link
                      className="navbar-category-dropdown-link"
                      href={`/s/${createSlug(subcategory.name)}/${subcategory._id}`}
                    >
                      <span>{subcategory.name}</span>
                      <Image
                        src="/assets/icons/arrow_right.svg"
                        alt={`Arrow right logo`}
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <div
        className={`navbar-categories-overlay ${categorySelected !== null ? "vis" : "hid"}`}
      ></div>
    </div>
  );
}
