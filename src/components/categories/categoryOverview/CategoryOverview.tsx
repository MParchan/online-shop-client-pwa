import { Category } from "@/types/models/category.types";
import CategoryList from "../categoryList/CategoryList";
import Link from "next/link";
import Image from "next/image";
import createSlug from "@/utils/createSlug";

interface CategoryOverviewProps {
  categories: Category[];
  selectedCategory: Category;
}

export default function CategoryOverview({ categories, selectedCategory }: CategoryOverviewProps) {
  return (
    <div className="category-overview">
      <div className="category-overview-name">{selectedCategory.name}</div>
      <div className="category-overview-main">
        <CategoryList categories={categories} selectedCategory={selectedCategory} />
        <div className="category-overview-subcategories-wrapper">
          <div className="category-overview-subcategories-pretitle">Categories</div>
          <div className="category-overview-subcategories-title">in {selectedCategory.name}</div>
          <div className="category-overview-subcategories-list">
            {selectedCategory.subcategories.map((subcategory) => (
              <Link
                key={subcategory._id}
                href={`/s/${createSlug(subcategory.name)}/${subcategory._id}`}
                className="category-overview-subcategory-item"
              >
                <div className="category-overview-subcategory-wrapper">
                  <div className="category-overview-subcategory-image-wrapper">
                    <Image
                      src={`/assets/thumbnails/subcategories/${subcategory.name}.webp`}
                      alt={`${subcategory.name} thumbnail`}
                      width={600}
                      height={600}
                    />
                  </div>

                  <div className="category-overview-subcategory-name">{subcategory.name}</div>
                  <div className="category-overview-subcategory-quantity">
                    ({subcategory.productCount})
                  </div>
                </div>
                <div className="category-overview-subcategory-arrow">
                  <Image
                    src="/assets/icons/arrow_right.svg"
                    alt={`Arrow right logo`}
                    width={24}
                    height={24}
                  />
                </div>
              </Link>
            ))}
            {Array(3 - (selectedCategory.subcategories.length % 3))
              .fill(null)
              .map((_, index) => (
                <div
                  key={`spacer-${index}`}
                  className="category-overview-subcategories-filler"
                ></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
