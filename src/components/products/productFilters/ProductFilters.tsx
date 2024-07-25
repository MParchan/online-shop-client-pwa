import Input from "@/components/ui/input/Input";
import { Brand } from "@/types/models/brand.types";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";
import PropertySection from "./elements/PropertySection";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/button/Button";
import ProductFiltersModal from "./ProductFiltersModal";
import { cn } from "@/libs/twMerge.lib";

export interface BrandCount {
  _id: string;
  count: number;
  brand: Brand;
}

export interface PropertyCount {
  _id: string;
  count: number;
  property: Property;
}

interface ProductFilterProps {
  brands: Brand[];
  brandCount: BrandCount[];
  propertyCount: PropertyCount[];
  propertyTypes: PropertyType[];
  productCount: number;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedProperties: string[];
  setSelectedProperties: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductFilters({
  brands,
  brandCount,
  propertyCount,
  productCount,
  propertyTypes,
  selectedBrands,
  setSelectedBrands,
  selectedProperties,
  setSelectedProperties
}: ProductFilterProps) {
  const [openModal, setOpenModal] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const sortedBrands = brands
    .map((brand) => {
      const count = brandCount.find((b) => b._id === brand._id)?.count ?? 0;
      return { ...brand, count };
    })
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

  const brandsToShow = showAllBrands ? sortedBrands : sortedBrands.slice(0, 5);

  const handleSelectBrands = (brandId: string, checked: boolean) => {
    setSelectedBrands((prevBrands) => {
      if (checked) {
        return [...prevBrands, brandId];
      } else {
        return prevBrands.filter((id) => id !== brandId);
      }
    });
  };

  const handleSelectProperties = (propertyId: string, checked: boolean) => {
    setSelectedProperties((prevProperties) => {
      if (checked) {
        return [...prevProperties, propertyId];
      } else {
        return prevProperties.filter((id) => id !== propertyId);
      }
    });
  };

  const handleBrandClick = (brandId: string, checked: boolean) => {
    handleSelectBrands(brandId, !checked);
  };

  return (
    <>
      <div className="products-filter-wrapper">
        <div className="products-filter">
          <div className="products-filter-header">Filters</div>
          <section className="products-filter-section">
            <header className="products-filter-section-header">Brand</header>
            {brandsToShow.map((brand) => (
              <div
                key={brand._id}
                className={cn("products-filter-section-wrapper", { disabled: !brand.count })}
                onClick={() => {
                  if (brand.count) {
                    handleBrandClick(brand._id, selectedBrands.includes(brand._id));
                  }
                }}
              >
                <Input
                  type="checkbox"
                  disabled={!brand.count}
                  className="products-filter-section-checkbox"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleSelectBrands(brand._id, e.target.checked)}
                  checked={selectedBrands.includes(brand._id)}
                />
                <div className="products-filter-section-value">
                  <span>{brand.name + " "}</span>
                  <span className="products-filter-section-quantity">({brand.count})</span>
                </div>
              </div>
            ))}
            {brands.length > 5 && (
              <button
                className="products-filter-section-more"
                onClick={() => setShowAllBrands(!showAllBrands)}
              >
                {showAllBrands ? (
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
                {showAllBrands ? (
                  "Less"
                ) : (
                  <>
                    <span>More</span>
                    <span className="products-filter-section-quantity">({brands.length - 5})</span>
                  </>
                )}
              </button>
            )}
          </section>
          {propertyTypes.slice(0, 4).map((propertyType: PropertyType) => (
            <PropertySection
              key={propertyType._id}
              propertyType={propertyType}
              propertyCount={propertyCount}
              selectedProperties={selectedProperties}
              handleSelectProperties={handleSelectProperties}
            />
          ))}
          <div className="products-filter-more-wrapper">
            <Button
              variant="secondary"
              className="products-filter-more-button"
              onClick={() => setOpenModal(true)}
            >
              More filters
            </Button>
          </div>
        </div>
      </div>
      <ProductFiltersModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        brands={brands}
        brandCount={brandCount}
        propertyTypes={propertyTypes}
        productCount={productCount}
        propertyCount={propertyCount}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedProperties={selectedProperties}
        setSelectedProperties={setSelectedProperties}
      />
    </>
  );
}
