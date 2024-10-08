"use client";

import Image from "next/image";
import { useAppSelector } from "@/libs/redux/hooks";
import Button from "@/components/ui/button/Button";
import Link from "next/link";

export default function CartOverview() {
  const products = useAppSelector((state) => state.cart.items);
  return (
    <div className="cart-overview">
      {products.length > 0 ? (
        <></>
      ) : (
        <div className="cart-overview-empty">
          <div className="cart-overview-empty-icon-wrapper">
            <div className="cart-overview-empty-icon-inner-wrapper">
              <Image
                src="/assets/icons/cart.svg"
                alt="Cart icon"
                width={40}
                height={40}
                className="cart-overview-empty-icon"
              />
            </div>
          </div>
          <div className="cart-overview-empty-text">The shopping cart is empty</div>
          <div className="cart-overview-empty-button-wrapper">
            <div className="cart-overview-empty-button">
              <Link href="/">
                <Button>Go to home page</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
