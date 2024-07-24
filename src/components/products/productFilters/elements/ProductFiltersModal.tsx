import { cn } from "@/libs/twMerge.lib";
import { PropertyType } from "@/types/models/propertyType.types";
import { useEffect, useRef } from "react";

interface ProductFiltersModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  propertyTypes: PropertyType[];
}

export default function ProductFiltersModal({
  openModal,
  setOpenModal,
  propertyTypes
}: ProductFiltersModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, setOpenModal]);

  return (
    <div className={cn("product-filters-modal-wrapper", { open: openModal, close: !openModal })}>
      <div
        className={cn("product-filters-modal", { open: openModal, close: !openModal })}
        ref={modalRef}
      >
        <div className="product-filters-modal-header">Filters</div>
        {propertyTypes.map((propertyType: PropertyType) => (
          <p key={propertyType._id}>{propertyType.name}</p>
        ))}
      </div>
      <div
        className={cn("product-filters-modal-overlay", { open: openModal, close: !openModal })}
      ></div>
    </div>
  );
}
