import { Product } from "@/types/models/product.types";

interface ProductProps {
  params: { id: string };
}

export default async function ProductId({ params }: ProductProps) {
  const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
  const product: Product = await productRes.json();

  return <div>{product.name}</div>;
}
