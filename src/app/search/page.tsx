export const dynamic = "force-dynamic";

import brandsService from "@/api/services/brandsService";
import categoriesService from "@/api/services/categoriesService";
import propertiesService from "@/api/services/propertiesService";
import subcategoriesService from "@/api/services/subcategoriesService";
import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import ProductSearchOverview from "@/components/products/productOverwiev/ProductSearchOverview";
import { Brand } from "@/types/models/brand.types";
import { Category } from "@/types/models/category.types";
import { Property } from "@/types/models/property.types";
import { Subcategory } from "@/types/models/subcategory.types";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface SearchProps {
  searchParams?: { [key: string]: string | undefined };
}

export async function generateMetadata({ searchParams }: SearchProps): Promise<Metadata> {
  if (!searchParams?.q || searchParams?.q === "") {
    redirect("/");
  }

  return {
    title: `Searching - ${searchParams?.q}`
  };
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const query = searchParams?.q || "";
  const categoryId = searchParams?.category?.split("-")[0];
  const subcategoryId = searchParams?.subcategory?.split("-")[0];
  let category: Category | undefined = undefined;
  if (categoryId) {
    category = await categoriesService.getCategoryById(categoryId);
  }
  let subcategory: Subcategory | undefined = undefined;
  let subcategoryBrands: Brand[] | undefined = undefined;
  if (subcategoryId) {
    subcategory = await subcategoriesService.getSubcategoryById(subcategoryId);
    subcategoryBrands = await brandsService.getBrands({
      subcategory: subcategoryId
    });
  }

  const categories: Category[] = await categoriesService.getCategories({
    productName: query
  });

  const urlParamBrands = searchParams?.brands?.toString().split(",");
  const selectedBrands: Brand[] = [];
  if (urlParamBrands) {
    for (const brandId of urlParamBrands) {
      try {
        const brand = await brandsService.getBrandById(brandId);
        selectedBrands.push(brand);
      } catch {
        const brandIndex = urlParamBrands.indexOf(brandId);
        urlParamBrands.splice(brandIndex, 1);
      }
    }
  }
  const urlParamProperties = searchParams?.properties?.toString().split(",");
  const selectedProperties: Property[] = [];
  if (urlParamProperties) {
    for (const propertyId of urlParamProperties) {
      try {
        const property = await propertiesService.getPropertyById(propertyId);
        selectedProperties.push(property);
      } catch {
        const propertyIndex = urlParamProperties.indexOf(propertyId);
        urlParamProperties.splice(propertyIndex, 1);
      }
    }
  }

  return (
    <div className="w-full">
      <CategoryNavigation category={category} subcategory={subcategory} query={query} />
      <ProductSearchOverview
        searchQuery={query}
        category={category}
        subcategory={subcategory}
        categories={categories}
        subcategoryBrands={subcategoryBrands}
        urlSelectedBrands={selectedBrands}
        urlSelectedProperties={selectedProperties}
        urlParamBrands={urlParamBrands}
        urlParamProperties={urlParamProperties}
        urlParamPage={searchParams?.page?.toString()}
        urlParamLimit={searchParams?.limit?.toString()}
        urlParamSorting={searchParams?.sorting?.toString()}
      />
    </div>
  );
}
