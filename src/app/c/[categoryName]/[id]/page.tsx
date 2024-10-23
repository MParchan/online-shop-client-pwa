import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import CategoryOverview from "@/components/categories/categoryOverview/CategoryOverview";
import { Category } from "@/types/models/category.types";
import createSlug from "@/utils/createSlug";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface CategoryProps {
  params: { categoryName: string; id: string };
}

export const revalidate = 3600;

export async function generateMetadata({ params }: CategoryProps): Promise<Metadata> {
  const category: Category = await fetch(getApiBaseUrl() + "/categories/" + params.id).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
    }
  );
  if (params.categoryName !== createSlug(category.name)) {
    redirect(`/c/${createSlug(category.name)}/${params.id}`);
  }
  return {
    title: `${category.name}`
  };
}

export default async function CategoryPage({ params }: CategoryProps) {
  const category: Category = await fetch(getApiBaseUrl() + "/categories/" + params.id).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
    }
  );
  const categories: Category[] = await fetch(getApiBaseUrl() + "/categories").then((res) => {
    if (res.ok) {
      return res.json();
    }
  });

  return (
    <div>
      <CategoryNavigation category={category} />
      <CategoryOverview categories={categories} selectedCategory={category} />
    </div>
  );
}
