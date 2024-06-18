import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";

interface ProductsFilterProps {
  propertyTypes: PropertyType[];
}

export default function ProductsFilter({ propertyTypes }: ProductsFilterProps) {
  return (
    <div className="products-filter-wrapper">
      <div className="products-filter">
        {propertyTypes.map((propertyType: PropertyType) => (
          <section className="products-filter-section" key={propertyType._id}>
            <header className="products-filter-section-header">{propertyType.name}</header>
            {propertyType.properties.map((property: Property) => (
              <div key={property._id}>
                <input type="checkbox" />
                <span>{property.value}</span>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
