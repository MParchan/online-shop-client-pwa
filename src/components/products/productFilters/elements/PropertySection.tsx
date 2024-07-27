"use client";
import Input from "@/components/ui/input/Input";
import { cn } from "@/libs/twMerge.lib";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";
import Image from "next/image";
import { useState } from "react";

interface PropertySectionProps {
  propertyType: PropertyType;
  propertyCount: PropertyCount[];
  selectedProperties: string[];
  handleSelectProperties: (property: Property, propertyId: string, checked: boolean) => void;
}
interface PropertyCount {
  _id: string;
  count: number;
  property: Property;
}

export default function PropertySection({
  propertyType,
  selectedProperties,
  propertyCount,
  handleSelectProperties
}: PropertySectionProps) {
  const [showAll, setShowAll] = useState(false);
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
  const propertiesToShow = showAll ? sortedProperties : sortedProperties.slice(0, 4);
  const handlePropertyClick = (property: Property, propertyId: string, checked: boolean) => {
    handleSelectProperties(property, propertyId, !checked);
  };

  return (
    <section className="products-filter-section" key={propertyType._id}>
      <header className="products-filter-section-header">{propertyType.name}</header>
      {propertiesToShow.map((property) => (
        <div
          key={property._id}
          className={cn("products-filter-section-wrapper", { disabled: !property.count })}
          onClick={() => {
            if (property.count) {
              handlePropertyClick(
                property,
                property._id,
                selectedProperties.includes(property._id)
              );
            }
          }}
        >
          <Input
            type="checkbox"
            disabled={!property.count}
            className="products-filter-section-checkbox"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleSelectProperties(property, property._id, e.target.checked)}
            checked={selectedProperties.includes(property._id)}
          />
          <div className="products-filter-section-value">
            <span>{property.value + " "}</span>
            <span className="products-filter-section-quantity">({property.count})</span>
          </div>
        </div>
      ))}
      {propertyType.properties.length > 4 && (
        <button className="products-filter-section-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? (
            <Image
              src="/assets/icons/remove.svg"
              alt={`Remove logo`}
              width={20}
              height={20}
              className="products-filter-section-more-icon"
            />
          ) : (
            <Image
              src="/assets/icons/add.svg"
              alt={`Add logo`}
              width={20}
              height={20}
              className="products-filter-section-more-icon"
            />
          )}
          {showAll ? (
            "Less"
          ) : (
            <>
              <span>More</span>
              <span className="products-filter-section-quantity">
                ({propertyType.properties.length - 5})
              </span>
            </>
          )}
        </button>
      )}
    </section>
  );
}
