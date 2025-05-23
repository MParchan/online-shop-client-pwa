"use client";

import Image from "next/image";
import { Category } from "@/types/models/category.types";
import { useEffect, useState } from "react";
import ProductList from "../productList/ProductList";
import Loader from "@/components/ui/loader/Loader";
import Pagination from "@/components/ui/pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryFilter from "@/components/categories/categoryFilter/CategoryFilter";
import Select from "@/components/ui/select/Select";
import createSlug from "@/utils/createSlug";
import { Subcategory } from "@/types/models/subcategory.types";
import { Brand } from "@/types/models/brand.types";
import { Property } from "@/types/models/property.types";
import { sortPropertyTypes } from "@/utils/sortPropertyTypes";
import ProductFilters from "../productFilters/ProductFilters";
import ProductFiltersModal from "../productFilters/ProductFiltersModal";
import CategoryFilterModal from "@/components/categories/categoryFilter/CategoryFilterModal";
import { useGetProductsQuery } from "@/libs/redux/features/api/services/productsService";

interface ProductSearchOverviewProps {
  searchQuery: string;
  category?: Category;
  categories: Category[];
  subcategory?: Subcategory;
  subcategoryBrands?: Brand[];
  urlSelectedBrands: Brand[];
  urlSelectedProperties: Property[];
  urlParamBrands?: string[];
  urlParamProperties?: string[];
  urlParamSorting?: string;
  urlParamPage?: string;
  urlParamLimit?: string;
}

export default function ProductSearchOverview({
  searchQuery,
  category,
  categories,
  subcategory,
  subcategoryBrands,
  urlSelectedBrands,
  urlSelectedProperties,
  urlParamBrands,
  urlParamProperties,
  urlParamSorting,
  urlParamPage,
  urlParamLimit
}: ProductSearchOverviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(category);
  const [selectedSubcategory, setSelectedCSubcategory] = useState<Subcategory | undefined>(
    subcategory
  );
  const [brands, setBrands] = useState<string[]>(urlParamBrands ?? []);
  const [properties, setProperties] = useState<string[]>(urlParamProperties ?? []);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>(urlSelectedBrands);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(urlSelectedProperties);
  const [sorting, setSorting] = useState(urlParamSorting ?? "From the latest");
  const [page, setPage] = useState<number>(!urlParamPage ? 1 : Number(urlParamPage));
  const [limit, setLimit] = useState<string>(urlParamLimit ?? "12");
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (category && selectedCategory) {
      if (category._id !== selectedCategory?._id) {
        setSelectedCategory(category);
        setSelectedCSubcategory(undefined);
        clearFiltersHandler();
      }
    }
    setPage(1);
  }, [category, selectedCategory]);

  useEffect(() => {
    if (subcategory) {
      sortPropertyTypes(subcategory.name, subcategory.propertyTypes);
    }
  }, [subcategory]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    if (limit !== "12") {
      params.set("limit", limit);
    } else {
      params.delete("limit");
    }
    if (sorting !== "From the latest") {
      params.set("sorting", sorting);
    } else {
      params.delete("sorting");
    }
    if (brands.length) {
      params.set("brands", brands.toString());
    } else {
      params.delete("brands");
    }
    if (properties.length) {
      params.set("properties", properties.toString());
    } else {
      params.delete("properties");
    }

    if (selectedCategory) {
      params.set("category", `${selectedCategory._id}-${createSlug(selectedCategory.name)}`);
    } else {
      params.delete("category");
      params.delete("subcategory");
    }

    if (selectedSubcategory) {
      params.set(
        "subcategory",
        `${selectedSubcategory._id}-${createSlug(selectedSubcategory.name)}`
      );
    } else {
      params.delete("subcategory");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [
    brands,
    limit,
    page,
    pathname,
    properties,
    replace,
    searchParams,
    selectedCategory,
    selectedSubcategory,
    sorting
  ]);

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      if (selectedSubcategory) {
        params.set("subcategory", selectedSubcategory._id);
      } else {
        params.set("category", selectedCategory._id);
      }
    }
    params.set("page", page.toString());
    params.set("limit", limit);
    params.set("name", searchQuery);

    if (brands.length > 0) {
      params.set("brands", brands.join(","));
    }
    if (properties.length > 0) {
      params.set("properties", properties.join(","));
    }

    switch (sorting) {
      case "From the latest":
        params.set("sortField", "createdAt");
        params.set("sortOrder", "desc");
        break;
      case "From the oldest":
        params.set("sortField", "createdAt");
        params.set("sortOrder", "asc");
        break;
      case "Alphabetically: from A to Z":
        params.set("sortField", "name");
        params.set("sortOrder", "asc");
        break;
      case "Alphabetically: from Z to A":
        params.set("sortField", "name");
        params.set("sortOrder", "desc");
        break;
      case "Price: from the cheapest":
        params.set("sortField", "price");
        params.set("sortOrder", "asc");
        break;
      case "Price: from the most expensive":
        params.set("sortField", "price");
        params.set("sortOrder", "desc");
        break;
      default:
        break;
    }

    return params.toString();
  };

  const { data: productRes, isFetching, error } = useGetProductsQuery(buildQuery());

  useEffect(() => {
    setPage(1);
  }, [brands, properties, sorting, limit]);

  const clearFiltersHandler = () => {
    setSelectedBrands([]);
    setBrands([]);
    setSelectedProperties([]);
    setProperties([]);
  };

  const removeBrandHandler = (brand: Brand) => {
    setSelectedBrands((prevBrands: Brand[]) => prevBrands.filter((b) => b._id !== brand._id));
    setBrands((prevBrands: string[]) => prevBrands.filter((id) => id !== brand._id));
  };

  const removePropertyHandler = (property: Property) => {
    setSelectedProperties((prevProperties: Property[]) =>
      prevProperties.filter((p) => p._id !== property._id)
    );
    setProperties((prevBrands: string[]) => prevBrands.filter((id) => id !== property._id));
  };

  return (
    <div className="product-overview">
      <div className="product-overview-subcategory">
        {`"${searchQuery}" `}
        <span className="product-overview-subcategory-quantity">
          ({productRes?.productCount || 0} {productRes?.productCount === 1 ? "result" : "results"})
        </span>
      </div>
      <div className="product-overview-main">
        <div className="product-overview-categories-filters">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedCSubcategory}
            clearFiltersHandler={clearFiltersHandler}
          />
          {selectedSubcategory && (
            <>
              {subcategoryBrands && subcategory ? (
                <ProductFilters
                  brands={subcategoryBrands}
                  brandCount={productRes?.brands || []}
                  propertyCount={productRes?.properties || []}
                  productCount={productRes?.productCount || 0}
                  propertyTypes={subcategory.propertyTypes}
                  selectedBrands={brands}
                  setSelectedBrands={setSelectedBrands}
                  setSelectedBrandsIds={setBrands}
                  selectedProperties={properties}
                  setSelectedPropertiesIds={setProperties}
                  setSelectedProperties={setSelectedProperties}
                />
              ) : (
                <div className="product-overview-categories-filters-loader">
                  <Loader />
                </div>
              )}
            </>
          )}
        </div>
        <div className="product-overview-products-wrapper">
          {selectedBrands.length + selectedProperties.length > 0 && (
            <div className="product-overview-filters">
              <div className="product-overview-filters-clear" onClick={clearFiltersHandler}>
                Clear All ({selectedBrands.length + selectedProperties.length})
                <Image
                  src="/assets/icons/close.svg"
                  alt="Close logo"
                  width={16}
                  height={16}
                  className="w-4 h-auto ml-1"
                />
              </div>

              {selectedBrands.map((brand: Brand) => (
                <div
                  key={brand._id}
                  className="product-overview-filters-item"
                  onClick={() => removeBrandHandler(brand)}
                >
                  {brand.name}
                  <Image
                    src="/assets/icons/close.svg"
                    alt="Close logo"
                    width={16}
                    height={16}
                    className="w-4 h-auto ml-1"
                  />
                </div>
              ))}
              {selectedProperties.map((property: Property) => (
                <div
                  key={property._id}
                  className="product-overview-filters-item"
                  onClick={() => removePropertyHandler(property)}
                >
                  {property.value}
                  <Image
                    src="/assets/icons/close.svg"
                    alt="Close logo"
                    width={16}
                    height={16}
                    className="w-4 h-auto ml-1"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="product-overview-sorting">
            <div className="product-overview-sorting-select-wrapper">
              <div className="flex">
                <button
                  className="product-overview-filter-button"
                  onClick={() => setOpenCategoryModal(true)}
                >
                  <Image
                    src="/assets/icons/category.svg"
                    alt="Category icon"
                    width={32}
                    height={32}
                  />
                </button>
                <CategoryFilterModal
                  openModal={openCategoryModal}
                  setOpenModal={setOpenCategoryModal}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  setSelectedSubcategory={setSelectedCSubcategory}
                  clearFiltersHandler={clearFiltersHandler}
                />
                {subcategory && subcategoryBrands && (
                  <>
                    <button
                      className="product-overview-filter-button"
                      onClick={() => setOpenFilterModal(true)}
                    >
                      <Image
                        src="/assets/icons/filter.svg"
                        alt="Filter icon"
                        width={32}
                        height={32}
                      />
                    </button>
                    <ProductFiltersModal
                      openModal={openFilterModal}
                      setOpenModal={setOpenFilterModal}
                      brands={subcategoryBrands}
                      brandCount={productRes?.brands || []}
                      propertyCount={productRes?.properties || []}
                      productCount={productRes?.productCount || 0}
                      propertyTypes={subcategory.propertyTypes}
                      selectedBrands={brands}
                      setSelectedBrands={setSelectedBrands}
                      setSelectedBrandsIds={setBrands}
                      selectedProperties={properties}
                      setSelectedPropertiesIds={setProperties}
                      setSelectedProperties={setSelectedProperties}
                    />
                  </>
                )}
              </div>
              <Select
                options={[
                  "From the latest",
                  "From the oldest",
                  "Alphabetically: from A to Z",
                  "Alphabetically: from Z to A",
                  "Price: from the cheapest",
                  "Price: from the most expensive"
                ]}
                defaultValue={sorting}
                setValue={setSorting}
                className="product-overview-sorting-select"
                textAlignment="left"
              />
            </div>
            <div className="product-overview-pagination-wrapper">
              <Pagination
                currentPage={page}
                allPages={Math.ceil((productRes?.productCount || 1) / Number(limit))}
                setPage={setPage}
              />
            </div>
          </div>
          {isFetching || !productRes ? (
            <div className="product-overview-loading">
              {error ? <div>Failed to load products.</div> : <Loader />}
            </div>
          ) : productRes.productCount > 0 ? (
            <>
              <ProductList products={productRes.products} />
              <div className="product-overview-pagination">
                <Pagination
                  currentPage={page}
                  allPages={Math.ceil((productRes?.productCount || 1) / Number(limit))}
                  limit={limit}
                  setPage={setPage}
                  setLimit={setLimit}
                />
              </div>
            </>
          ) : (
            <div className="product-overview-no-products">No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}
