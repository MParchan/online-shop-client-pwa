"use client";

import { Subcategory } from "@/types/models/subcategory.types";
import ProductFilters from "../productFilters/ProductFilters";
import ProductList from "../productList/ProductList";
import { useEffect, useState } from "react";
import productsService from "@/api/services/productsService";
import { Product } from "@/types/models/product.types";
import { sortPropertyTypes } from "@/utils/sortPropertyTypes";
import brandsService from "@/api/services/brandsService";
import { Brand } from "@/types/models/brand.types";
import Pagination from "@/components/ui/pagination/Pagination";

interface ProductOverwievProps {
  subcategory: Subcategory;
}
export default function ProductOverview({ subcategory }: ProductOverwievProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategoryBrands, setSubcategoryBrands] = useState<Brand[]>([]);
  const [brandCount, setBrandCount] = useState([]);
  const [propertyCount, setPropertyCount] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [brands, setBrands] = useState<string[]>([]);
  const [properties, setProperties] = useState<string[]>([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const allPages = Math.ceil(productCount / limit);

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

      const productRes = await productsService.getProducts(query);
      setProducts(productRes.products);
      setBrandCount(productRes.brands);
      setPropertyCount(productRes.properties);
      setProductCount(productRes.productCount);
      setLoader(false);
    };

    setLoader(true);
    fetchProducts();
  }, [brands, limit, page, properties, subcategory]);

  useEffect(() => {
    const fetchSubcategoryBrands = async () => {
      const subcategoryBrandsRes = await brandsService.getBrands({
        subcategory: subcategory._id
      });
      setSubcategoryBrands(subcategoryBrandsRes);
      setLoader(false);
    };

    setLoader(true);
    fetchSubcategoryBrands();
  }, [subcategory]);

  sortPropertyTypes(subcategory.name, subcategory.propertyTypes);

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
          setSelectedBrands={setBrands}
          selectedProperties={properties}
          setSelectedProperties={setProperties}
        />
        <div className="product-overview-products-wrapper">
          <div className="product-overview-sorting">
            <Pagination
              currentPage={page}
              allPages={allPages}
              setPage={setPage}
              setLimit={setLimit}
            />
          </div>
          {loader ? <div>Loading</div> : <ProductList products={products} />}
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
