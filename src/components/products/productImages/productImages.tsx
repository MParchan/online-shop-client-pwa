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

  const handleThumbnailClick = (image: ProductImage) => {
    setSelectedImage(image);
  };

  const maxVisibleThumbnails = 5;

  const visibleThumbnails = images.slice(0, maxVisibleThumbnails);
  const hiddenThumbnails = images.slice(maxVisibleThumbnails);

  const handlePreviousImage = () => {
    const currentIndex = images.findIndex((image) => image._id === selectedImage._id);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[previousIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex((image) => image._id === selectedImage._id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      } else if (event.key === "Escape") {
        setOpenImagesModal(false);
      }
    };

    if (openImagesModal) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openImagesModal, selectedImage]);

  useEffect(() => {
    if (openImagesModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openImagesModal]);

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
              className="w-full h-auto"
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
                className="rounded-lg w-full h-auto"
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
        <div className="modal-product-name">{productName}</div>
        <div className="modal-main-image">
          <button className="modal-change-photo-button" onClick={handlePreviousImage}>
            <Image src="/assets/icons/arrow_left.svg" alt="Close logo" width={40} height={40} />
          </button>
          <div className="modal-main-image-wrapper">
            {selectedImage && (
              <Image
                src={selectedImage.image}
                width={600}
                height={600}
                alt="Picture of the product"
                className="w-full h-auto"
              />
            )}
          </div>
          <button className="modal-change-photo-button" onClick={handleNextImage}>
            <Image
              src="/assets/icons/arrow_right.svg"
              alt="Close logo"
              width={40}
              height={40}
              className="w-10 h-auto"
            />
          </button>
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
                className="rounded-lg cursor-pointer w-16 h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImages;
