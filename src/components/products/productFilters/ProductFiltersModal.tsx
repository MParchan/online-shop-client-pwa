"use client";

import { cn } from "@/libs/twMerge.lib";
import { PropertyType } from "@/types/models/propertyType.types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { BrandCount, PropertyCount } from "./ProductFilters";
import PropertySectionModal from "./elements/PropertySectionModal";
import Input from "@/components/ui/input/Input";
import { Brand } from "@/types/models/brand.types";
import { Property } from "@/types/models/property.types";

interface ProductFiltersModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  brands: Brand[];
  brandCount: BrandCount[];
  propertyTypes: PropertyType[];
  productCount: number;
  propertyCount: PropertyCount[];
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  setSelectedBrandsIds: React.Dispatch<React.SetStateAction<string[]>>;
  selectedProperties: string[];
  setSelectedProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  setSelectedPropertiesIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductFiltersModal({
  openModal,
  setOpenModal,
  brands,
  brandCount,
  propertyTypes,
  productCount,
  propertyCount,
  selectedBrands,
  setSelectedBrands,
  setSelectedBrandsIds,
  selectedProperties,
  setSelectedProperties,
  setSelectedPropertiesIds
}: ProductFiltersModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectBrands, setSelectBrands] = useState<boolean>(true);
  const [selectedProps, setSelectedProps] = useState<PropertyType | null>(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

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
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenModal(false);
        setIsSubmenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, setOpenModal]);

  const clearFiltersHandler = () => {
    setSelectedBrands([]);
    setSelectedBrandsIds([]);
    setSelectedProperties([]);
    setSelectedPropertiesIds([]);
  };
  useEffect(() => {
    if (openModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openModal]);

  const handleSelectBrands = (brand: Brand, brandId: string, checked: boolean) => {
    setSelectedBrandsIds((prevBrands) => {
      if (checked) {
        return [...prevBrands, brandId];
      } else {
        return prevBrands.filter((id) => id !== brandId);
      }
    });
    setSelectedBrands((prevBrands) => {
      if (checked) {
        return [...prevBrands, brand];
      } else {
        return prevBrands.filter((b) => b._id !== brand._id);
      }
    });
  };
  const handleSelectProperties = (property: Property, propertyId: string, checked: boolean) => {
    setSelectedPropertiesIds((prevProperties) => {
      if (checked) {
        return [...prevProperties, propertyId];
      } else {
        return prevProperties.filter((id) => id !== propertyId);
      }
    });
    setSelectedProperties((prevProperties) => {
      if (checked) {
        return [...prevProperties, property];
      } else {
        return prevProperties.filter((p) => p._id !== property._id);
      }
    });
  };

  const handleBrandClick = (brand: Brand, brandId: string, checked: boolean) => {
    handleSelectBrands(brand, brandId, !checked);
  };

  return (
    <div className={cn("product-filters-modal-area", { open: openModal, close: !openModal })}>
      <div className={cn("product-filters-modal-wrapper", { open: openModal, close: !openModal })}>
        <div className="product-filters-modal" ref={modalRef}>
          <div className="product-filters-modal-header">
            Filters ({selectedBrands.length + selectedProperties.length})
            <div
              onClick={() => {
                setOpenModal(false);
                setIsSubmenuOpen(false);
              }}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="Close logo"
                width={32}
                height={32}
                className="product-filters-modal-close"
              />
            </div>
          </div>
          <div className="product-filters-modal-body">
            <div className="product-filters-modal-property-types">
              <div
                className={cn("product-filters-modal-property-type-item", {
                  selected: selectBrands
                })}
                onClick={() => {
                  setSelectBrands(true);
                  setIsSubmenuOpen(true);
                  setSelectedProps(null);
                }}
              >
                <div className="product-filters-modal-property-type-item-wrapper">
                  <span>Brands</span>
                  <Image
                    src="/assets/icons/arrow_right.svg"
                    alt="Arrow right logo"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              {propertyTypes.map((propertyType: PropertyType) => (
                <div
                  key={propertyType._id}
                  className={cn("product-filters-modal-property-type-item", {
                    selected: selectedProps?._id === propertyType._id
                  })}
                  onClick={() => {
                    setSelectBrands(false);
                    setIsSubmenuOpen(true);
                    setSelectedProps(propertyType);
                  }}
                >
                  <div className="product-filters-modal-property-type-item-wrapper">
                    <span>{propertyType.name}</span>
                    <Image
                      src="/assets/icons/arrow_right.svg"
                      alt="Arrow right logo"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="product-filters-modal-properties">
              {selectBrands && (
                <>
                  <header className="product-filters-modal-properties-header">Brands</header>
                  <div className="product-filters-modal-properties-wrapper">
                    {sortedBrands.map((brand) => (
                      <div
                        key={brand._id}
                        className={cn("product-filters-modal-properties-item", {
                          disabled: !brand.count
                        })}
                        onClick={() => {
                          if (brand.count) {
                            handleBrandClick(brand, brand._id, selectedBrands.includes(brand._id));
                          }
                        }}
                      >
                        <Input
                          type="checkbox"
                          name={brand.name}
                          disabled={!brand.count}
                          className="product-filters-modal-properties-checkbox"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleSelectBrands(brand, brand._id, e.target.checked)}
                          checked={selectedBrands.includes(brand._id)}
                        />
                        <div className="product-filters-modal-properties-value">
                          <span>{brand.name + " "}</span>
                          <span className="product-filters-modal-properties-quantity">
                            ({brand.count})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {selectedProps !== null && (
                <PropertySectionModal
                  key={selectedProps._id}
                  propertyType={selectedProps}
                  propertyCount={propertyCount}
                  selectedProperties={selectedProperties}
                  handleSelectProperties={handleSelectProperties}
                />
              )}
            </div>
          </div>
          <div className="product-filters-modal-footer">
            <div className="product-filters-modal-footer-button">
              <Button variant="secondary" onClick={clearFiltersHandler}>
                Clear filters
              </Button>
            </div>
            <div className="product-filters-modal-footer-button">
              <Button
                onClick={() => {
                  setOpenModal(false);
                  setIsSubmenuOpen(false);
                }}
              >
                Show results ({productCount})
              </Button>
            </div>
          </div>

          <div
            className={`product-filters-modal-submenu ${isSubmenuOpen ? "open-submenu" : "close-submenu"}`}
          >
            <div className="product-filters-modal-submenu-header">
              <div onClick={() => setIsSubmenuOpen(false)}>
                <Image
                  src="/assets/icons/arrow_back.svg"
                  alt="Arrow back logo"
                  width={32}
                  height={32}
                  className="product-filters-modal-submenu-close"
                />
              </div>
              {selectBrands ? "Brands" : <span>{selectedProps?.name}</span>}
            </div>
            <div className="product-filters-modal-submenu-values">
              {selectBrands && (
                <>
                  {sortedBrands.map((brand) => (
                    <div
                      key={brand._id}
                      className={cn("product-filters-modal-submenu-values-item", {
                        disabled: !brand.count
                      })}
                      onClick={() => {
                        if (brand.count) {
                          handleBrandClick(brand, brand._id, selectedBrands.includes(brand._id));
                        }
                      }}
                    >
                      <Input
                        type="checkbox"
                        name={brand.name}
                        disabled={!brand.count}
                        className="product-filters-modal-submenu-values-checkbox"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleSelectBrands(brand, brand._id, e.target.checked)}
                        checked={selectedBrands.includes(brand._id)}
                      />
                      <div className="product-filters-modal-submenu-value">
                        <span>{brand.name + " "}</span>
                        <span className="product-filters-modal-submenu-value-quantity">
                          ({brand.count})
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {selectedProps !== null && (
                <PropertySectionModal
                  key={selectedProps._id}
                  propertyType={selectedProps}
                  propertyCount={propertyCount}
                  selectedProperties={selectedProperties}
                  handleSelectProperties={handleSelectProperties}
                />
              )}
            </div>
            <div className="product-filters-modal-footer">
              <div className="product-filters-modal-footer-button">
                <Button
                  onClick={() => {
                    setIsSubmenuOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn("product-filters-modal-overlay", { open: openModal, close: !openModal })}
      ></div>
    </div>
  );
}
