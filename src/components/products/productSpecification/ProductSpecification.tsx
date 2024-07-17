import { ProductProperty } from "@/types/models/productProperty.types";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";

interface ProductSpecificationProps {
  productProperties: ProductProperty[];
}

export default function ProductSpecification({ productProperties }: ProductSpecificationProps) {
  return (
    <div className="product-specification">
      <div className="product-specification-title">Specification</div>
      <table className="product-specification-table">
        <tbody>
          {productProperties.map((productProperty) => {
            const property = productProperty.property as Property;
            const propertyType = property.propertyType as PropertyType;
            return (
              <tr key={productProperty._id} className="product-specification-table-row">
                <td className="product-specification-table-header">{propertyType.name}</td>
                <td className="product-specification-table-value">{property.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
