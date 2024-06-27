import { Subcategory } from "@/types/models/subcategory.types";
import { Product } from "@/types/models/product.types";
import ProductList from "@/components/products/productList/ProductList";
import productsService from "@/api/services/productsService";
import subcategoriesService from "@/api/services/subcategoriesService";
import ProductFilter from "@/components/products/productFilter/productFilter";
import { redirect } from "next/navigation";
import createSlug from "@/utils/createSlug";
import { Metadata } from "next";

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

  const products: Product[] = await productsService.getProducts({
    subcategory: subcategory._id
  });

  let extendedList: Product[] = [];
  if (products.length) {
    extendedList = Array.from({ length: 10 }, () => products[0]);
  }

  return (
    <div>
      <p>
        Subcategory properties: {subcategory.name} {products.length}
      </p>
      <div className="flex">
        <ProductFilter propertyTypes={subcategory.propertyTypes} />
        <ProductList products={extendedList} />
      </div>
    </div>
  );
}
