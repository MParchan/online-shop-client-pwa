import { Subcategory } from "@/types/models/subcategory.types";
import subcategoriesService from "@/api/services/subcategoriesService";
import { redirect } from "next/navigation";
import createSlug from "@/utils/createSlug";
import { Metadata } from "next";
import ProductOverview from "@/components/products/productOverwiev/ProductOverwiev";
import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import { Category } from "@/types/models/category.types";
import brandsService from "@/api/services/brandsService";

interface SubcategoryProps {
  params: { subcategoryName: string; id: string };
}
export async function generateMetadata({ params }: SubcategoryProps): Promise<Metadata> {
  const subcategory: Subcategory = await subcategoriesService.getSubcategoryById(params.id);
  return {
    title: `${subcategory.name}`
  };
}

export default async function SubcategoryPage({ params }: SubcategoryProps) {
  const subcategory: Subcategory = await subcategoriesService.getSubcategoryById(params.id);

  if (params.subcategoryName !== createSlug(subcategory.name)) {
    redirect(`/p/${createSlug(subcategory.name)}/${params.id}`);
  }

  const subcategoryBrands = await brandsService.getBrands({
    subcategory: subcategory._id
  });
  const category = subcategory.category as Category;

  return (
    <div>
      <CategoryNavigation category={category} subcategory={subcategory} />
      <ProductOverview subcategory={subcategory} subcategoryBrands={subcategoryBrands} />
    </div>
  );
}
