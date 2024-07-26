import productsService from "@/api/services/productsService";
import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import ProductDetails from "@/components/products/productDetails/ProductDetails";
import { Category } from "@/types/models/category.types";
import { Product } from "@/types/models/product.types";
import { Subcategory } from "@/types/models/subcategory.types";
import createSlug from "@/utils/createSlug";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface ProductProps {
  params: { productName: string; id: string };
}
export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const product: Product = await productsService.getProductById(params.id);
  return {
    title: `${product.name}`
  };
}

export default async function ProductPage({ params }: ProductProps) {
  const product: Product = await productsService.getProductById(params.id);

  if (params.productName !== createSlug(product.name)) {
    redirect(`/p/${createSlug(product.name)}/${params.id}`);
  }
  const subcategory = product.subcategory as Subcategory;
  const category = subcategory.category as Category;

  return (
    <div>
      <CategoryNavigation category={category} subcategory={subcategory} />
      <ProductDetails product={product} />
    </div>
  );
}
