import Input from "@/components/ui/input/Input";
import { Brand } from "@/types/models/brand.types";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";

interface BrandExtended extends Brand {
  productCount: number;
}
interface ProductFilterProps {
  brands: BrandExtended[];
  propertyTypes: PropertyType[];
}

export default function ProductFilter({ brands, propertyTypes }: ProductFilterProps) {
  const sortedBrands = brands.sort((a, b) => b.productCount - a.productCount);

  return (
    <div className="products-filter-wrapper">
      <div className="products-filter">
        {sortedBrands.map((brand: BrandExtended) => (
          <div key={brand._id}>
            <Input type="checkbox" />
            <span>
              {brand.name} ({brand.productCount})
            </span>
          </div>
        ))}
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
