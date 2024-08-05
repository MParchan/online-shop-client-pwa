import productsService from "@/api/services/productsService";
import ProductList from "@/components/products/productList/ProductList";

export default async function Home() {
  const productRes = await productsService.getProducts({
    sortField: "createdAt",
    sortOrder: "desc",
    limit: 8
  });

  return (
    <div>
      <div className="text-center text-3xl py-12 font-light border-b">
        Welcome to the Online shop
      </div>
      <div>
        <div className="text-xl font-semibold p-4">Latest products</div>
        <ProductList products={productRes.products} />
      </div>
    </div>
  );
}
