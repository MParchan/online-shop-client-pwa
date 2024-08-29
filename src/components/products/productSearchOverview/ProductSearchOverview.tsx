"use client";
import productsService from "@/api/services/productsService";
import { Category } from "@/types/models/category.types";
import { Product } from "@/types/models/product.types";
import { useEffect, useState } from "react";
import ProductList from "../productList/ProductList";
import Loader from "@/components/ui/loader/Loader";
import Pagination from "@/components/ui/pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductSearchOverviewProps {
  searchQuery: string;
  category?: Category;
  urlParamPage?: string;
  urlParamLimit?: string;
}

export default function ProductSearchOverview({
  searchQuery,
  category,
  urlParamPage,
  urlParamLimit
}: ProductSearchOverviewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [loader, setLoader] = useState(true);
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
    replace(`${pathname}?${params.toString()}`);
  }, [limit, page, pathname, replace, searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query: { [key: string]: string | number } = {
        name: searchQuery,
        page: page,
        limit: limit
      };
      if (category) {
        query.category = category._id;
      }
      const productRes = await productsService.getProducts(query);
      setProducts(productRes.products);
      setProductCount(productRes.productCount);
      setLoader(false);
    };

    setLoader(true);
    fetchProducts();
  }, [category, limit, page, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  return (
    <div className="product-overview">
      <div className="product-overview-subcategory">
        {`"${searchQuery}" `}
        <span className="product-overview-subcategory-quantity">
          ({productCount} {productCount === 1 ? "result" : "results"})
        </span>
      </div>
      <div className="product-overview-main">
        <div className="product-overview-products-wrapper">
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
