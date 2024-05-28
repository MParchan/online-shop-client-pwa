"use client";

import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import { Product } from "@/types/models/product.types";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function NavbarSearchBar({ categories }: { categories: Category[] }) {
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const [productData, setProductData] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const productDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node) &&
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
    if (productQuery === "") {
      setProductData(null);
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    let url = "http://localhost:5001/api/v1/products?limit=5";
    url += `&name=${productQuery}`;
    if (selectedCategoryId !== null) {
      url += `&category=${selectedCategoryId}`;
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
  }, [productQuery, selectedCategoryId]);

  useEffect(() => {
    console.log("products: ", productData);
    console.log("Loader: ", isLoading);
  }, [isLoading, productData]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(inputRef.current?.value);
  }

  const handleSelectCategory = (categoryName: string, categoryId: null | string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategory(categoryName);
    setCategoryOpened(!categoryOpened);
    inputRef.current?.focus();
  };

  return (
    <form
      className={cn("navbar-search-bar", {
        dropdown_active: productData !== null && productData.length
      })}
      onSubmit={onSubmit}
    >
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
        ref={categoryDropdownRef}
      >
        <ul>
          <li
            onClick={() => handleSelectCategory("All categories", null)}
            className={cn("select-category-dropdown-item", {
              selected: selectedCategory === "All categories"
            })}
          >
            All categories
          </li>
          {categories.map((category: Category) => (
            <li
              key={category._id}
              onClick={() => handleSelectCategory(category.name, category._id)}
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
      <div
        className={cn("search-product-dropdown", {
          active: productData !== null && productData.length
        })}
        ref={productDropdownRef}
      >
        <ul>{productData?.map((product: Product) => <li key={product._id}>{product.name}</li>)}</ul>
      </div>
    </form>
  );
}
