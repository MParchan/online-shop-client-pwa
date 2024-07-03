"use client";

import { Category } from "@/types/models/category.types";
import { Subcategory } from "@/types/models/subcategory.types";
import createSlug from "@/utils/createSlug";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarHamburgerMenu({ categories }: { categories: Category[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="hamburger-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image
          src="/assets/icons/menu.svg"
          alt="Menu logo"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
      </div>
      <div className={`hamburger-menu ${isMenuOpen ? "open" : "close"}`}>
        <div className="hamburger-menu-header">
          <span className="hamburger-menu-header-span">Menu</span>
          <div className="hamburger-menu-close-icon" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/assets/icons/close.svg"
              alt="Close logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </div>
        </div>
        <div className="hamburger-menu-categories">
          <ul className="hamburger-menu-category-list">
            {categories.map((category: Category) => (
              <li
                key={category._id}
                className="hamburger-menu-category-item"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="hamburger-menu-category-name">
                  <Image
                    src={`/assets/icons/${category.name}.svg`}
                    alt={`${category.name} logo`}
                    width={24}
                    height={24}
                    className="mr-3"
                  />
                  {category.name}
                </div>
                <Image
                  src="/assets/icons/arrow_right.svg"
                  alt={`Arrow right logo`}
                  width={24}
                  height={24}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={`hamburger-menu ${selectedCategory ? "open" : "close"}`}>
          <div className="hamburger-submenu-header">
            <div className="hamburger-menu-close-icon" onClick={() => setSelectedCategory(null)}>
              <Image
                src="/assets/icons/arrow_back.svg"
                alt="Back logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <span className="hamburger-menu-header-span">{selectedCategory?.name}</span>
          </div>
          <div className="hamburger-menu-categories">
            {selectedCategory ? (
              <Link
                href={`/c/${createSlug(selectedCategory.name)}/${selectedCategory._id}`}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setSelectedCategory(null);
                }}
                className="hamburger-menu-categoru-button"
              >
                Go to {selectedCategory.name}
              </Link>
            ) : null}
            <ul className="hamburger-menu-category-list">
              {selectedCategory?.subcategories.map((subcategory: Subcategory) => (
                <li key={subcategory._id} className="hamburger-menu-category-item">
                  <Link
                    href={`/s/${createSlug(subcategory.name)}/${subcategory._id}`}
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                      setSelectedCategory(null);
                    }}
                    className="hamburger-menu-category-name"
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="hamburger-menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
}
