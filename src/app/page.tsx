import ProductList from "@/components/products/productList/ProductList";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";

export const revalidate = 3600;

export default async function Home() {
  const url = `${getApiBaseUrl()}/products?${new URLSearchParams({
    sortField: "createdAt",
    sortOrder: "desc",
    limit: "8"
  }).toString()}`;
  const productsRes = await fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });

  return (
    <div>
      <div className="text-center text-3xl py-12 font-light border-b">
        Welcome to the Online shop
      </div>
      <div>
        <div className="text-xl font-semibold p-4">Latest products</div>
        <ProductList products={productsRes.products} />
      </div>
    </div>
  );
}
