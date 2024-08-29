import categoriesService from "@/api/services/categoriesService";
import CategoryNavigation from "@/components/categories/categoryNavigation/CategoryNavigation";
import ProductSearchOverview from "@/components/products/productSearchOverview/ProductSearchOverview";
import { Category } from "@/types/models/category.types";
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
  let category: Category | undefined = undefined;
  if (categoryId) {
    category = await categoriesService.getCategoryById(categoryId);
  }
  return (
    <div>
      <CategoryNavigation category={category} query={query} />
      <ProductSearchOverview
        searchQuery={query}
        category={category}
        urlParamPage={searchParams?.page?.toString()}
        urlParamLimit={searchParams?.limit?.toString()}
      />
    </div>
  );
}
