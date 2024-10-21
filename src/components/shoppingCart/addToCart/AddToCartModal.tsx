import { cn } from "@/libs/twMerge.lib";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Product } from "@/types/models/product.types";
import { ProductImage } from "@/types/models/image.types";
import Link from "next/link";
import Button from "@/components/ui/button/Button";

interface AddToCartModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}
export default function AddToCartModal({ openModal, setOpenModal, product }: AddToCartModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openModal]);
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
    <div className={cn("add-to-cart-modal-area", { open: openModal, close: !openModal })}>
      <div className={cn("add-to-cart-modal-wrapper", { open: openModal, close: !openModal })}>
        <div className="add-to-cart-modal" ref={modalRef}>
          <div className="add-to-cart-modal-header">
            <span>Product has been added to your cart</span>
            <div
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <Image
                src="/assets/icons/close.svg"
                alt="Close logo"
                width={32}
                height={32}
                className="add-to-cart-modal-close"
              />
            </div>
          </div>
          <div className="add-to-cart-modal-product">
            <Image
              src={
                product.images.find((image: ProductImage) => image.main)?.image ||
                "/assets/icons/no-photography.svg"
              }
              alt={`${product.name} image`}
              width={80}
              height={60}
              className="add-to-cart-modal-product-image"
            />
            <div className="add-to-cart-modal-product">
              <span>{product.name}</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
          </div>
          <div className="add-to-cart-modal-footer">
            <div className="add-to-cart-footer-button-wrapper">
              <Button variant="secondary" onClick={() => setOpenModal(false)}>
                <Image
                  src="/assets/icons/arrow_left.svg"
                  alt="Arrow left icon"
                  width={24}
                  height={24}
                  className="add-to-cart-footer-button-icon-return"
                />
                Return
              </Button>
            </div>
            <div className="add-to-cart-footer-button-wrapper">
              <Link href="/cart">
                <Button variant="green" onClick={() => setOpenModal(false)}>
                  Go to cart
                  <Image
                    src="/assets/icons/arrow_right.svg"
                    alt="Arrow right icon"
                    width={24}
                    height={24}
                    className="add-to-cart-footer-button-icon-cart"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn("add-to-cart-modal-overlay", { open: openModal, close: !openModal })}
      ></div>
    </div>
  );
}
