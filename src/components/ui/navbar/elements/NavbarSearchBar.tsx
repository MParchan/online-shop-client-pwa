"use client";

import { useGetProductsQuery } from "@/libs/redux/features/api/services/productsService";
import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import { ProductImage } from "@/types/models/image.types";
import { Product } from "@/types/models/product.types";
import createSlug from "@/utils/createSlug";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

interface NavbarSearchBarProps {
  categories: Category[];
  isHidden?: boolean;
}

export default function NavbarSearchBar({ categories, isHidden }: NavbarSearchBarProps) {
  const [categoryOpened, setCategoryOpened] = useState(false);
  const [productsOpened, setProductsOpened] = useState(false);
  const [productQuery, setProductQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const categoryContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const productDropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node) &&
        categoryContainerRef.current &&
        !categoryContainerRef.current.contains(event.target as Node)
      ) {
        setCategoryOpened(false);
      }

      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setProductsOpened(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        inputRef.current?.blur();
        setCategoryOpened(false);
        setProductsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const buildQuery = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("limit", "5");
    queryParams.set("name", productQuery);
    if (selectedCategoryId) {
      queryParams.set("category", selectedCategoryId);
    }
    return queryParams.toString();
  };
  const { data: productRes } = useGetProductsQuery(buildQuery());
  useEffect(() => {
    if (productRes?.products.length) {
      setProductsOpened(true);
    }
  }, [productRes]);

  useEffect(() => {
    if (isHidden) {
      setCategoryOpened(false);
    }
  }, [isHidden]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputRef.current?.blur();
    setCategoryOpened(false);
    setProductsOpened(false);
    const query = inputRef.current?.value;
    if (query) {
      const params = new URLSearchParams();
      params.set("q", query);
      if (selectedCategoryId) {
        params.set("category", `${selectedCategoryId}-${createSlug(selectedCategory)}`);
      }
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleSelectCategory = (categoryName: string, categoryId: null | string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategory(categoryName);
    setCategoryOpened(!categoryOpened);
    inputRef.current?.focus();
  };

  return (
    <form
      className={cn("navbar-search-bar", {
        dropdown_active:
          productRes && productRes.products.length && productQuery.length && productsOpened
      })}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        name="navbar-search-bar-input"
        autoComplete="off"
        placeholder="Search..."
        className="navbar-search-bar-input"
        onChange={(e) => setProductQuery(e.target.value)}
        onClick={() => setProductsOpened(true)}
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
          src="/assets/icons/arrow_open.svg"
          alt="Arrow open logo"
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
      <button type="submit" className="navbar-search-bar-button">
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
          active: productRes && productRes.products.length && productsOpened && productQuery.length
        })}
        ref={productDropdownRef}
      >
        <ul className="search-product-dropdown-list">
          {productRes?.products.map((product: Product) => (
            <Link
              href={`/p/${createSlug(product.name)}/${product._id}`}
              key={product._id}
              onClick={() => {
                setProductQuery("");
              }}
            >
              <li className="search-product-dropdown-item">
                <Image
                  src={
                    product.images.find((image: ProductImage) => image.main)?.image ||
                    "/assets/icons/no-photography.svg"
                  }
                  alt={`${product.name} image`}
                  width={80}
                  height={60}
                  className="search-product-image"
                />
                <span className="search-product-name">{product.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </form>
  );
}
