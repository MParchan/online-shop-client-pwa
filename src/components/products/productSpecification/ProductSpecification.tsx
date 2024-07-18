import { ProductProperty } from "@/types/models/productProperty.types";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";
import { sortProductProperties } from "@/utils/sortProductProperties";

interface ProductSpecificationProps {
  productProperties: ProductProperty[];
  subcategoryName: string;
}

export default function ProductSpecification({
  productProperties,
  subcategoryName
}: ProductSpecificationProps) {
  const sortedProductProperties = sortProductProperties(productProperties, subcategoryName);

  return (
    <div id="productSpecificationId" className="product-specification">
      <div className="product-specification-title">Specification</div>
      <table className="product-specification-table">
        <tbody>
          {sortedProductProperties.map((productProperty) => {
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
