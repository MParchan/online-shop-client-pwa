import { Category } from "@/types/models/category.types";
import CategoryList from "../categoryList/CategoryList";

interface CategoryOverviewProps {
  categories: Category[];
  selectedCategory: Category;
}

export default function CategoryOverview({ categories, selectedCategory }: CategoryOverviewProps) {
  return (
    <div className="category-overview">
      <div className="category-overview-name">{selectedCategory.name}</div>
      <div>
        <CategoryList categories={categories} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
