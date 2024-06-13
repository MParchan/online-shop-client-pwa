import { Subcategory } from "@/types/models/subcategory.types";
import ProductsFilter from "@/components/productsFilter/ProductsFilter";
import { Product } from "@/types/models/product.types";
import ProductList from "@/components/productList/ProductList";

interface SubcategoryProps {
  params: { id: string };
}

export default async function SubcategoryId({ params }: SubcategoryProps) {
  const subcategoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/subcategories/${params.id}`
  );
  const subcategory: Subcategory = await subcategoryRes.json();

  const productsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?subcategory=${subcategory._id}`,
    { cache: "no-store" }
  );
  const products: Product[] = await productsRes.json();
  const extendedList = Array.from({ length: 10 }, () => products[0]);

  return (
    <div>
      <p>
        Subcategory properties: {subcategory.name} {products.length}
      </p>
      <div className="flex">
        <div>
          <ProductsFilter propertyTypes={subcategory.propertyTypes} />
        </div>
        <div>
          <ProductList products={extendedList} />
        </div>
      </div>
    </div>
  );
}
