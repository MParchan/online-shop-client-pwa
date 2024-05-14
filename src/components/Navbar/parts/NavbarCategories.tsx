import { Category } from "@/types/models/category.types";

export default async function NavbarCategories() {
  const res = await fetch("http://localhost:5001/api/v1/categories");
  const categories = await res.json();

  return (
    <div>
      <ul className="flex">
        {categories.map((category: Category, index: number) => (
          <li key={index} className="px-4">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
