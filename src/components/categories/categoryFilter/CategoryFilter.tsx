import { Category } from "@/types/models/category.types";
import { Subcategory } from "@/types/models/subcategory.types";
import Image from "next/image";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
  selectedSubcategory: Subcategory | undefined;
  setSelectedSubcategory: React.Dispatch<React.SetStateAction<Subcategory | undefined>>;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory
}: CategoryFilterProps) {
  const sortCategories = categories
    .sort((a, b) => (b.productCount || 0) - (a.productCount || 0))
    .map((category) => ({
      ...category,
      subcategories: category.subcategories.sort(
        (a, b) => (b.productCount || 0) - (a.productCount || 0)
      )
    }));

  return (
    <div className="category-filter-wrapper">
      <div className="category-filter">
        <ul className="category-filter-list">
          {selectedCategory && (
            <div className="category-filter-back-wrapper">
              <div
                className="category-filter-back"
                onClick={() => {
                  setSelectedCategory(undefined);
                  setSelectedSubcategory(undefined);
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
                  }}
                >
                  {category.name}
                </span>
                <span className="category-filter-category-quantity">({category.productCount})</span>
              </div>
              {category.subcategories.map((subcategory: Subcategory) => (
                <div key={subcategory._id} className="category-filter-subcategory-wrapper">
                  <span
                    className={`category-filter-subcategory-name ${selectedSubcategory?._id === subcategory._id ? "bold" : ""}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedSubcategory(subcategory);
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
  );
}
