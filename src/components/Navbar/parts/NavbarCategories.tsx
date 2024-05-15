import { Category } from "@/types/models/category.types";

export default function NavbarCategories({ categories }: { categories: Category[] }) {
  return (
    <div className="navbar-categories">
      <ul className="navbar-categories-wrapper">
        {categories.map((category: Category, index: number) => (
          <li key={index} className="px-4">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
