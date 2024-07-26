import categoriesService from "@/api/services/categoriesService";
import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import { Category } from "@/types/models/category.types";
import createSlug from "@/utils/createSlug";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface CategoryProps {
  params: { categoryName: string; id: string };
}

export async function generateMetadata({ params }: CategoryProps): Promise<Metadata> {
  const category: Category = await categoriesService.getCategoryById(params.id);
  return {
    title: `${category.name}`
  };
}

export default async function CategoryPage({ params }: CategoryProps) {
  const category: Category = await categoriesService.getCategoryById(params.id);

  if (params.categoryName !== createSlug(category.name)) {
    redirect(`/p/${createSlug(category.name)}/${params.id}`);
  }
  return (
    <div>
      <CategoryNavigation category={category} />
    </div>
  );
}
