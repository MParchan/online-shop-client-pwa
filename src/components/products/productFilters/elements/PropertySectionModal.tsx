"use client";
import Input from "@/components/ui/input/Input";
import { cn } from "@/libs/twMerge.lib";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";

interface PropertySectionModalProps {
  propertyType: PropertyType;
  propertyCount: PropertyCount[];
  selectedProperties: string[];
  handleSelectProperties: (propertyId: string, checked: boolean) => void;
}
interface PropertyCount {
  _id: string;
  count: number;
  property: Property;
}

export default function PropertySectionModal({
  propertyType,
  selectedProperties,
  propertyCount,
  handleSelectProperties
}: PropertySectionModalProps) {
  const sortedProperties = propertyType.properties
    .map((property) => {
      const count = propertyCount.find((p) => p._id === property._id)?.count ?? 0;
      return { ...property, count };
    })
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.value.localeCompare(b.value);
    });
  const handlePropertyClick = (propertyId: string, checked: boolean) => {
    handleSelectProperties(propertyId, !checked);
  };

  return (
    <>
      <header className="product-filters-modal-properties-header">{propertyType.name}</header>
      <div className="product-filters-modal-properties-wrapper">
        {sortedProperties.map((property) => (
          <div
            key={property._id}
            className={cn("product-filters-modal-properties-item", {
              disabled: !property.count
            })}
            onClick={() => {
              if (property.count) {
                handlePropertyClick(property._id, selectedProperties.includes(property._id));
              }
            }}
          >
            <Input
              type="checkbox"
              disabled={!property.count}
              className="product-filters-modal-properties-checkbox"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleSelectProperties(property._id, e.target.checked)}
              checked={selectedProperties.includes(property._id)}
            />
            <div className="product-filters-modal-properties-value">
              <span>{property.value + " "}</span>
              <span className="product-filters-modal-properties-quantity">({property.count})</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
