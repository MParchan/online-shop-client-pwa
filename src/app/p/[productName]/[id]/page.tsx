import productsService from "@/api/services/productsService";
import ProductDetails from "@/components/products/productDetails/ProductDetails";
import { Product } from "@/types/models/product.types";
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

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
