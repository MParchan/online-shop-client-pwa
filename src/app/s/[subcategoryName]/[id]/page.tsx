import { Subcategory } from "@/types/models/subcategory.types";
import { redirect } from "next/navigation";
import createSlug from "@/utils/createSlug";
import { Metadata } from "next";
import ProductOverview from "@/components/products/productOverwiev/ProductOverwiev";
import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import { Category } from "@/types/models/category.types";
import { Brand } from "@/types/models/brand.types";
import { Property } from "@/types/models/property.types";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";

interface SubcategoryProps {
  params: { subcategoryName: string; id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const revalidate = 3600;

export async function generateMetadata({ params }: SubcategoryProps): Promise<Metadata> {
  const subcategory: Subcategory = await fetch(
    getApiBaseUrl() + "/subcategories/" + params.id
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
  if (params.subcategoryName !== createSlug(subcategory.name)) {
    redirect(`/p/${createSlug(subcategory.name)}/${params.id}`);
  }
  return {
    title: `${subcategory.name}`
  };
}

export default async function SubcategoryPage({ params, searchParams }: SubcategoryProps) {
  const subcategory: Subcategory = await fetch(
    getApiBaseUrl() + "/subcategories/" + params.id
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
  const category = subcategory.category as Category;

  const subcategoryBrands: Brand[] = await fetch(
    getApiBaseUrl() + "/brands?subcategory=" + subcategory._id
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });

  const urlParamBrands = searchParams?.brands?.toString().split(",");
  const selectedBrands: Brand[] = [];
  if (urlParamBrands) {
    for (const brandId of urlParamBrands) {
      try {
        const brand: Brand = await fetch(getApiBaseUrl() + "/brands/" + brandId).then((res) => {
          if (res.ok) {
            return res.json();
          }
        });
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
        const property: Property = await fetch(getApiBaseUrl() + "/properties/" + propertyId).then(
          (res) => {
            if (res.ok) {
              return res.json();
            }
          }
        );
        selectedProperties.push(property);
      } catch {
        const propertyIndex = urlParamProperties.indexOf(propertyId);
        urlParamProperties.splice(propertyIndex, 1);
      }
    }
  }

  return (
    <div className="w-full">
      <CategoryNavigation category={category} subcategory={subcategory} />
      <ProductOverview
        subcategory={subcategory}
        subcategoryBrands={subcategoryBrands}
        urlSelectedBrands={selectedBrands}
        urlSelectedProperties={selectedProperties}
        urlParamPage={searchParams?.page?.toString()}
        urlParamLimit={searchParams?.limit?.toString()}
        urlParamSorting={searchParams?.sorting?.toString()}
        urlParamBrands={urlParamBrands}
        urlParamProperties={urlParamProperties}
        startTime={searchParams?.startTime}
      />
    </div>
  );
}
