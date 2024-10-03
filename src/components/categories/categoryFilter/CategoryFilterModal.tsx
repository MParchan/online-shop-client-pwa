import { cn } from "@/libs/twMerge.lib";
import { Category } from "@/types/models/category.types";
import { Subcategory } from "@/types/models/subcategory.types";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface CategoryFilterModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  selectedCategory: Category | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
  selectedSubcategory: Subcategory | undefined;
  setSelectedSubcategory: React.Dispatch<React.SetStateAction<Subcategory | undefined>>;
  clearFiltersHandler: () => void;
}

export default function CategoryFilterModal({
  openModal,
  setOpenModal,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  clearFiltersHandler
}: CategoryFilterModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const sortCategories = categories
    .sort((a, b) => (b.productCount || 0) - (a.productCount || 0))
    .map((category) => ({
      ...category,
      subcategories: category.subcategories.sort(
        (a, b) => (b.productCount || 0) - (a.productCount || 0)
      )
    }));

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, setOpenModal]);

  return (
    <div className={cn("category-filters-modal-area", { open: openModal, close: !openModal })}>
      <div className={cn("category-filters-modal-wrapper", { open: openModal, close: !openModal })}>
        <div className="category-filter-modal" ref={modalRef}>
          <div className="category-filters-modal-header">
            Categories
            <div
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="Close logo"
                width={32}
                height={32}
                className="category-filters-modal-close"
              />
            </div>
          </div>
          <ul className="category-filter-list">
            {selectedCategory && (
              <div className="category-filter-back-wrapper">
                <div
                  className="category-filter-back"
                  onClick={() => {
                    setSelectedCategory(undefined);
                    setSelectedSubcategory(undefined);
                    clearFiltersHandler();
                    setOpenModal(false);
                  }}
                >
                  <span>
                    <Image
                      src="/assets/icons/arrow_left.svg"
                      alt={`Arrow left icon`}
                      width={20}
                      height={20}
                      className="category-filter-back-icon"
                    />
                  </span>
                  <span>All categories</span>
                </div>
              </div>
            )}
            {(selectedCategory
              ? sortCategories.filter((category) => category._id === selectedCategory._id)
              : sortCategories
            ).map((category: Category) => (
              <li key={category._id} className="category-filter-item">
                <div className="category-filter-category-wrapper">
                  <span
                    className={`category-filter-category-name ${selectedCategory && !selectedSubcategory ? "bold" : ""}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedSubcategory(undefined);
                      clearFiltersHandler();
                      setOpenModal(false);
                    }}
                  >
                    {category.name}
                  </span>
                  <span className="category-filter-category-quantity">
                    ({category.productCount})
                  </span>
                </div>
                {category.subcategories.map((subcategory: Subcategory) => (
                  <div key={subcategory._id} className="category-filter-subcategory-wrapper">
                    <span
                      className={`category-filter-subcategory-name ${selectedSubcategory?._id === subcategory._id ? "bold" : ""}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedSubcategory(subcategory);
                        clearFiltersHandler();
                        setOpenModal(false);
                      }}
                    >
                      {subcategory.name}
                    </span>
                    <span className="category-filter-subcategory-quantity">
                      ({subcategory.productCount})
                    </span>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={cn("category-filters-modal-overlay", { open: openModal, close: !openModal })}
      ></div>
    </div>
  );
}
