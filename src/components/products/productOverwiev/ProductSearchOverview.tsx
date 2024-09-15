"use client";

import Image from "next/image";
import productsService from "@/api/services/productsService";
import { Category } from "@/types/models/category.types";
import { Product } from "@/types/models/product.types";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(category);
  const [selectedSubcategory, setSelectedCSubcategory] = useState<Subcategory | undefined>(
    subcategory
  );
  const [productCount, setProductCount] = useState(0);
  const [brandCount, setBrandCount] = useState([]);
  const [propertyCount, setPropertyCount] = useState([]);
  const [brands, setBrands] = useState<string[]>(urlParamBrands ?? []);
  const [properties, setProperties] = useState<string[]>(urlParamProperties ?? []);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>(urlSelectedBrands);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(urlSelectedProperties);
  const [loader, setLoader] = useState(true);
  const [sorting, setSorting] = useState(urlParamSorting ?? "From the latest");
  const [page, setPage] = useState<number>(!urlParamPage ? 1 : Number(urlParamPage));
  const [limit, setLimit] = useState(urlParamLimit ?? "12");
  const allPages = Math.ceil(productCount / Number(limit));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  useEffect(() => {
    const fetchProducts = async () => {
      const query: { [key: string]: string | number } = {
        name: searchQuery,
        page: page,
        limit: limit
      };
      if (brands.length > 0) {
        query.brands = brands.join(",");
      }
      if (properties.length > 0) {
        query.properties = properties.join(",");
      }
      if (sorting === "From the latest") {
        query.sortField = "createdAt";
        query.sortOrder = "desc";
      }
      if (sorting === "From the oldest") {
        query.sortField = "createdAt";
        query.sortOrder = "asc";
      }
      if (sorting === "Alphabetically: from A to Z") {
        query.sortField = "name";
        query.sortOrder = "asc";
      }
      if (sorting === "Alphabetically: from Z to A") {
        query.sortField = "name";
        query.sortOrder = "desc";
      }
      if (sorting === "Price: from the cheapest") {
        query.sortField = "price";
        query.sortOrder = "asc";
      }
      if (sorting === "Price: from the most expensive") {
        query.sortField = "price";
        query.sortOrder = "desc";
      }
      if (selectedCategory) {
        if (selectedSubcategory) {
          query.subcategory = selectedSubcategory._id;
        } else {
          query.category = selectedCategory._id;
        }
      }
      const productRes = await productsService.getProducts(query);
      setProducts(productRes.products);
      setProductCount(productRes.productCount);
      setPropertyCount(productRes.properties);
      setBrandCount(productRes.brands);
      setLoader(false);
    };
    console.log(selectedSubcategory);
    setLoader(true);
    fetchProducts();
  }, [
    selectedCategory,
    limit,
    page,
    searchQuery,
    selectedSubcategory,
    brands,
    properties,
    sorting
  ]);

  useEffect(() => {
    setPage(1);
  }, [brands, properties, sorting, limit]);

  if (subcategory) {
    sortPropertyTypes(subcategory.name, subcategory.propertyTypes);
  }

  const clearFiltersHandler = () => {
    setSelectedBrands([]);
    setBrands([]);
    setSelectedProperties([]);
    setProperties([]);
  };

  const removeBrandHandler = (brand: Brand) => {
    setSelectedBrands((prevBrands) => {
      return prevBrands.filter((b) => b._id !== brand._id);
    });
    setBrands((prevBrands) => {
      return prevBrands.filter((id) => id !== brand._id);
    });
  };

  const removePropertyHandler = (property: Property) => {
    setSelectedProperties((prevProperties) => {
      return prevProperties.filter((p) => p._id !== property._id);
    });
    setProperties((prevBrands) => {
      return prevBrands.filter((id) => id !== property._id);
    });
  };

  return (
    <div className="product-overview">
      <div className="product-overview-subcategory">
        {`"${searchQuery}" `}
        <span className="product-overview-subcategory-quantity">
          ({productCount} {productCount === 1 ? "result" : "results"})
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
          />
          {subcategoryBrands && subcategory && (
            <ProductFilters
              brands={subcategoryBrands}
              brandCount={brandCount}
              propertyCount={propertyCount}
              productCount={productCount}
              propertyTypes={subcategory.propertyTypes}
              selectedBrands={brands}
              setSelectedBrands={setSelectedBrands}
              setSelectedBrandsIds={setBrands}
              selectedProperties={properties}
              setSelectedPropertiesIds={setProperties}
              setSelectedProperties={setSelectedProperties}
            />
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
              <Pagination currentPage={page} allPages={allPages} setPage={setPage} />
            </div>
          </div>
          {loader ? (
            <div className="product-overview-loading">
              <Loader />
            </div>
          ) : productCount > 0 ? (
            <>
              <ProductList products={products} />
              <div className="product-overview-pagination">
                <Pagination
                  currentPage={page}
                  allPages={allPages}
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
