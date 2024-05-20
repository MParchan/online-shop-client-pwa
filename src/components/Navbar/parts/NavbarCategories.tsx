import { Category } from "@/types/models/category.types";

export default function NavbarCategories({ categories }: { categories: Category[] }) {
  return (
    <div className="navbar-categories">
      <ul>
        {categories.map((category: Category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
