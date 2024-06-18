import { Product } from "@/types/models/product.types";
import ProductTile from "./productTile/ProductTile";

interface ProductListProps {
  products: Product[];
}
export default function ProductList({ products = [] }: ProductListProps) {
  return (
    <div className="flex-1">
      <div className="product-list">
        {products.map((product: Product) => (
          <ProductTile key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
