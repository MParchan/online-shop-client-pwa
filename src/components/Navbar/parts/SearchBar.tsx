"use client";

import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function SearchBar({ categories }: { categories: Category[] }) {
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const [productData, setProductData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setCategoryOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryOpened]);

  useEffect(() => {
    if (productQuery === "") return;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    let url = "http://localhost:5001/api/v1/products?limit=5";
    if (selectedCategory !== "All categories") {
      url += `&${selectedCategory}`;
    }
    console.log(url);
    const id = setTimeout(() => {
      setLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setProductData(data);
          setLoading(false);
        });
    }, 1000);

    setTimeoutId(id);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productQuery]);

  useEffect(() => {
    console.log("products: ", productData);
    console.log("Loader: ", isLoading);
  }, [isLoading, productData]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(inputRef.current?.value);
  }

  const handleSelectCategory = (name: string) => {
    setSelectedCategory(name);
    setCategoryOpened(!categoryOpened);
    inputRef.current?.focus();
  };

  return (
    <form className="navbar-search-bar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setProductQuery(e.target.value)}
        ref={inputRef}
      />
      <div className="separator" />
      <div
        className={cn("select-container", {
          active: categoryOpened
        })}
        onClick={() => {
          setCategoryOpened(!categoryOpened);
        }}
        ref={containerRef}
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
        className={cn("select-category-dropdown", {
          active: categoryOpened
        })}
        ref={dropdownRef}
      >
        <ul>
          <li
            onClick={() => handleSelectCategory("All categories")}
            className={cn("select-category-dropdown-item", {
              selected: selectedCategory === "All categories"
            })}
          >
            All categories
          </li>
          {categories.map((category: Category) => (
            <li
              key={category._id}
              onClick={() => handleSelectCategory(category.name)}
              className={cn("select-category-dropdown-item", {
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
    </form>
  );
}
