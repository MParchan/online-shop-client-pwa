import { Category } from "@/types/models/category.types";
import createSlug from "@/utils/createSlug";
import Link from "next/link";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category;
}
export default function CategoryList({ categories, selectedCategory }: CategoryListProps) {
  return (
    <div className="category-list-wrapper">
      <ul className="category-list">
        {categories.map((category: Category) => (
          <li key={category._id} className="category-list-item">
            <Link
              href={`/c/${createSlug(category.name)}/${category._id}`}
              className={`category-list-item-name ${category._id === selectedCategory._id ? "bold" : ""}`}
            >
              {category.name}
            </Link>

            {category._id === selectedCategory._id && (
              <ul className="category-list-subcategories">
                {selectedCategory.subcategories.map((subcategory) => (
                  <li key={subcategory._id} className="category-list-subcategories-item">
                    <Link href={`/s/${createSlug(subcategory.name)}/${subcategory._id}`}>
                      {subcategory.name + " "}
                      <span className="category-list-subcategories-item-quantity">
                        ({subcategory.productCount})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
