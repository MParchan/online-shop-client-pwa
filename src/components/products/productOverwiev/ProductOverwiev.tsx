"use client";

import { Subcategory } from "@/types/models/subcategory.types";
import ProductFilters from "../productFilters/ProductFilters";
import ProductList from "../productList/ProductList";
import { useEffect, useState } from "react";
import Image from "next/image";
import productsService from "@/api/services/productsService";
import { Product } from "@/types/models/product.types";
import { sortPropertyTypes } from "@/utils/sortPropertyTypes";
import { Brand } from "@/types/models/brand.types";
import Pagination from "@/components/ui/pagination/Pagination";
import Loader from "@/components/ui/loader/Loader";
import Select from "@/components/ui/select/Select";
import { Property } from "@/types/models/property.types";

interface ProductOverwievProps {
  subcategory: Subcategory;
  subcategoryBrands: Brand[];
}
export default function ProductOverview({ subcategory, subcategoryBrands }: ProductOverwievProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [brandCount, setBrandCount] = useState([]);
  const [propertyCount, setPropertyCount] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [brands, setBrands] = useState<string[]>([]);
  const [properties, setProperties] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("9");
  const [sorting, setSorting] = useState("From the latest");
  const allPages = Math.ceil(productCount / Number(limit));

  useEffect(() => {
    const fetchProducts = async () => {
      const query: { [key: string]: string | number } = {
        subcategory: subcategory._id,
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
      const productRes = await productsService.getProducts(query);
      setProducts(productRes.products);
      setBrandCount(productRes.brands);
      setPropertyCount(productRes.properties);
      setProductCount(productRes.productCount);
      setLoader(false);
    };

    setLoader(true);
    fetchProducts();
  }, [brands, limit, page, properties, sorting, subcategory]);

  sortPropertyTypes(subcategory.name, subcategory.propertyTypes);

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
        {subcategory.name + " "}
        <span className="product-overview-subcategory-quantity">
          ({productCount} {productCount === 1 ? "result" : "results"})
        </span>
      </div>
      <div className="product-overview-main">
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
                defaultValue="From the latest"
                setValue={setSorting}
                className="product-overview-sorting-select"
                textAlignment="left"
              />
              <span className="product-overview-sorting-select-title">Sorting</span>
            </div>
            <Pagination currentPage={page} allPages={allPages} setPage={setPage} />
          </div>
          {loader ? (
            <div className="product-overview-loading">
              <Loader />
            </div>
          ) : productCount > 0 ? (
            <ProductList products={products} />
          ) : (
            <div className="product-overview-no-products">No products available</div>
          )}
          <div className="product-overview-sorting">
            <Pagination
              currentPage={page}
              allPages={allPages}
              setPage={setPage}
              setLimit={setLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
