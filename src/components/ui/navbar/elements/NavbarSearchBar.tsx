"use client";

import productsService from "@/api/services/productsService";
import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import { Product } from "@/types/models/product.types";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

interface ProductParams {
  limit: number;
  name: string;
  category?: string | null;
}

export default function NavbarSearchBar({ categories }: { categories: Category[] }) {
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const [productData, setProductData] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const categoryContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const productDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node) &&
        categoryContainerRef.current &&
        !categoryContainerRef.current.contains(event.target as Node)
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
    const params: ProductParams = {
      limit: 5,
      name: productQuery
    };
    if (selectedCategoryId !== null) {
      params.category = selectedCategoryId;
    }
    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const products = await productsService.getProducts(params);
        setProductData(products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
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
        className="navbar-search-bar-input"
        onChange={(e) => setProductQuery(e.target.value)}
        ref={inputRef}
      />
      <div className="separator" />
      <div
        className={cn("select-category-container", {
          active: categoryOpened
        })}
        onClick={() => {
          setCategoryOpened(!categoryOpened);
        }}
        ref={categoryContainerRef}
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
        <ul className="select-category-dropdown-list">
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
      <button type="submit" className="navbar-search-bar-button ">
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
        <ul className="search-product-dropdown-list">
          {productData?.map((product: Product) => (
            <li className="search-product-dropdown-item" key={product._id}>
              {product.name}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
