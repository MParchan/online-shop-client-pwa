import { Product } from "@/types/models/product.types";

export default function ProductTile({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}
