import Link from "next/link";
import Image from "next/image";
import createSlug from "@/utils/createSlug";
import { Subcategory } from "@/types/models/subcategory.types";
import { Category } from "@/types/models/category.types";

interface CategoryNavigationProps {
  category: Category;
  subcategory?: Subcategory;
}
export default function CategoryNavigation({ category, subcategory }: CategoryNavigationProps) {
  return (
    <div className="category-navigation">
      <Link href="/">OnlineShop</Link>
      <Image
        src="/assets/icons/arrow_right.svg"
        alt="Arrow right icon"
        width={20}
        height={20}
        className="w-auto h-[20px]"
      />
      <Link href={`/c/${createSlug(category.name)}/${category._id}`}>{category.name}</Link>
      {subcategory !== undefined && (
        <>
          <Image
            src="/assets/icons/arrow_right.svg"
            alt="Arrow right icon"
            width={20}
            height={20}
            className="w-auto h-[20px]"
          />
          <Link href={`/s/${createSlug(subcategory.name)}/${subcategory._id}`}>
            {subcategory.name}
          </Link>
        </>
      )}
    </div>
  );
}
