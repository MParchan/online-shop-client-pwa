"use client";

import { Subcategory } from "@/types/models/subcategory.types";
import ProductFilters from "../productFilters/ProductFilters";
import ProductList from "../productList/ProductList";
import Image from "next/image";
import { sortPropertyTypes } from "@/utils/sortPropertyTypes";
import { Brand } from "@/types/models/brand.types";
import Pagination from "@/components/ui/pagination/Pagination";
import Loader from "@/components/ui/loader/Loader";
import Select from "@/components/ui/select/Select";
import { Property } from "@/types/models/property.types";
import ProductFiltersModal from "../productFilters/ProductFiltersModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/libs/redux/features/api/services/productsService";

interface ProductOverwievProps {
  subcategory: Subcategory;
  subcategoryBrands: Brand[];
  urlSelectedBrands: Brand[];
  urlSelectedProperties: Property[];
  urlParamPage?: string;
  urlParamLimit?: string;
  urlParamSorting?: string;
  urlParamBrands?: string[];
  urlParamProperties?: string[];
  startTime: string | string[] | undefined;
}

export default function ProductOverview({
  subcategory,
  subcategoryBrands,
  urlSelectedBrands,
  urlSelectedProperties,
  urlParamPage,
  urlParamLimit,
  urlParamSorting,
  urlParamBrands,
  urlParamProperties,
  startTime
}: ProductOverwievProps) {
  const [brands, setBrands] = useState<string[]>(urlParamBrands ?? []);
  const [properties, setProperties] = useState<string[]>(urlParamProperties ?? []);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>(urlSelectedBrands);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(urlSelectedProperties);
  const [page, setPage] = useState<number>(urlParamPage ? Number(urlParamPage) : 1);
  const [limit, setLimit] = useState(urlParamLimit ?? "12");
  const [sorting, setSorting] = useState(urlParamSorting ?? "From the latest");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const buildQuery = () => {
    const params = new URLSearchParams(searchParams);
    const queryParams = new URLSearchParams();
    queryParams.set("subcategory", subcategory._id);
    queryParams.set("page", page.toString());
    queryParams.set("limit", limit);
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
    if (brands.length) {
      queryParams.set("brands", brands.join(","));
      params.set("brands", brands.join(","));
    } else {
      params.delete("brands");
    }
    if (properties.length) {
      queryParams.set("properties", properties.join(","));
      params.set("properties", properties.join(","));
    } else {
      params.delete("properties");
    }
    if (sorting !== "From the latest") {
      params.set("sorting", sorting);
    } else {
      params.delete("sorting");
    }

    switch (sorting) {
      case "From the latest":
        queryParams.set("sortField", "createdAt");
        queryParams.set("sortOrder", "desc");
        break;
      case "From the oldest":
        queryParams.set("sortField", "createdAt");
        queryParams.set("sortOrder", "asc");
        break;
      case "Alphabetically: from A to Z":
        queryParams.set("sortField", "name");
        queryParams.set("sortOrder", "asc");
        break;
      case "Alphabetically: from Z to A":
        queryParams.set("sortField", "name");
        queryParams.set("sortOrder", "desc");
        break;
      case "Price: from the cheapest":
        queryParams.set("sortField", "price");
        queryParams.set("sortOrder", "asc");
        break;
      case "Price: from the most expensive":
        queryParams.set("sortField", "price");
        queryParams.set("sortOrder", "desc");
        break;
      default:
        break;
    }
    return { queryParams: queryParams.toString(), params: params.toString() };
  };

  const {
    data: productRes,
    isFetching,
    error,
    isSuccess
  } = useGetProductsQuery(buildQuery().queryParams);

  useEffect(() => {
    if (isSuccess && productRes && startTime) {
      const endTime = Date.now();
      const start = Number(startTime);
      const duration = endTime - start;

      console.log(`Czas od kliknięcia do załadowania danych: ${duration}ms`);
    }
  }, [isSuccess, productRes, startTime]);

  useEffect(() => {
    const params = buildQuery().params;
    replace(`${pathname}?${params}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sorting, brands, properties]);

  sortPropertyTypes(subcategory.name, subcategory.propertyTypes);

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
        {subcategory.name + " "}
        <span className="product-overview-subcategory-quantity">
          ({productRes?.productCount || 0} {productRes?.productCount === 1 ? "result" : "results"})
        </span>
      </div>
      <div className="product-overview-main">
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
              <button
                className="product-overview-filter-button"
                onClick={() => setOpenFilterModal(true)}
              >
                <Image src="/assets/icons/filter.svg" alt="Close logo" width={32} height={32} />
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
