import { Subcategory } from "@/types/models/subcategory.types";
import subcategoriesService from "@/api/services/subcategoriesService";
import { redirect } from "next/navigation";
import createSlug from "@/utils/createSlug";
import { Metadata } from "next";
import ProductOverview from "@/components/products/productOverwiev/ProductOverwiev";

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

  return (
    <div>
      <p>Subcategory properties: {subcategory.name}</p>
      <ProductOverview subcategory={subcategory} />
    </div>
  );
}
