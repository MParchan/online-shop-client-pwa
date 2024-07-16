"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types/models/image.types";
import { cn } from "@/libs/twMerge.lib";

interface ProductImagesProps {
  productName: string;
  images: ProductImage[];
}

const ProductImages = ({ productName, images }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
  const [openImagesModal, setOpenImagesModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenImagesModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openImagesModal]);

  const handleThumbnailClick = (image: ProductImage) => {
    setSelectedImage(image);
  };

  const maxVisibleThumbnails = 6;

  const visibleThumbnails = images.slice(0, maxVisibleThumbnails);
  const hiddenThumbnails = images.slice(maxVisibleThumbnails);

  return (
    <>
      <div className="product-images">
        <div
          className="main-image"
          onClick={() => {
            setOpenImagesModal(true);
          }}
        >
          {selectedImage ? (
            <Image
              src={selectedImage.image}
              width={600}
              height={600}
              alt="Picture of the product"
              priority
            />
          ) : null}
        </div>
        <div className="thumbnail-images">
          {visibleThumbnails.map((image, index) => (
            <div
              key={index}
              className={cn("thumbnail-image", {
                selected: selectedImage._id === image._id
              })}
            >
              <Image
                src={image.image}
                width={60}
                height={60}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(image)}
                className="rounded-lg cursor-pointer"
              />
            </div>
          ))}
          {hiddenThumbnails.length > 0 && (
            <div className="thumbnail-image">
              <div
                className="hidden-thumbnails"
                onClick={() => {
                  setOpenImagesModal(true);
                }}
              >
                +{hiddenThumbnails.length}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn("product-images-modal", { open: openImagesModal, close: !openImagesModal })}
        ref={modalRef}
      >
        <div className="product-images-modal-close" onClick={() => setOpenImagesModal(false)}>
          <Image
            src="/assets/icons/close.svg"
            alt="Close logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <div className="modalproduct-name">{productName}</div>
        <div className="modal-main-image">
          {selectedImage && (
            <Image
              src={selectedImage.image}
              width={600}
              height={600}
              alt="Picture of the product"
              className="max-w-full max-h-full"
            />
          )}
        </div>
        <div className="modal-thumbnail-images">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn("modal-thumbnail-image", {
                selected: selectedImage._id === image._id
              })}
            >
              <Image
                src={image.image}
                width={60}
                height={60}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(image)}
                className="rounded-lg cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImages;
