import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import ProductSearchOverview from "@/components/products/productOverwiev/ProductSearchOverview";
import { Brand } from "@/types/models/brand.types";
import { Category } from "@/types/models/category.types";
import { Property } from "@/types/models/property.types";
import { Subcategory } from "@/types/models/subcategory.types";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface SearchProps {
  searchParams?: { [key: string]: string | undefined };
}

export const revalidate = 3600;

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
    const categoryRes = await fetch(getApiBaseUrl() + "/categories/" + categoryId);
    category = await categoryRes.json();
  }
  let subcategory: Subcategory | undefined = undefined;
  let subcategoryBrands: Brand[] | undefined = undefined;
  if (subcategoryId) {
    subcategory = await fetch(getApiBaseUrl() + "/subcategories/" + subcategoryId).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });

    subcategoryBrands = await fetch(
      getApiBaseUrl() +
        "/brands?" +
        new URLSearchParams({
          subcategory: subcategoryId
        }).toString()
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  const categories: Category[] = await fetch(
    getApiBaseUrl() +
      "/categories?" +
      new URLSearchParams({
        productName: query
      }).toString()
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
