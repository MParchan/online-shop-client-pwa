import { Category } from "@/types/models/category.types";

export default function SearchBar({ categories }: { categories: Category[] }) {
  return (
    <div>
      <input type="text" placeholder="Search..." />
      <select>
        <option value="all">All Categories</option>
        {categories.map((category: Category, index: number) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">A</button>
    </div>
  );
}
