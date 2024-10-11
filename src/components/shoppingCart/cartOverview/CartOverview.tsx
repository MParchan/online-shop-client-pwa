"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import CartProductList from "../cartProductList/CartProductList";
import { useEffect } from "react";
import { clearCart } from "@/libs/redux/features/cart/cartSlice";

export default function CartOverview() {
  const products = useAppSelector((state) => state.cart.items);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-overview">
      {products.length > 0 ? (
        <div>
          <div className="cart-overview-header">
            <span>
              Shopping cart{" "}
              <span className="cart-overview-header-quantity">
                ({totalQuantity} {totalQuantity > 1 ? "products" : "product"})
              </span>
            </span>
            <span className="cart-overview-clear-cart" onClick={handleClearCart}>
              <Image
                src="/assets/icons/delete.svg"
                alt="delete icon"
                width={32}
                height={32}
                className="cart-overview-clear-cart-icon"
              />
              <span>Clear cart</span>
            </span>
          </div>
          <CartProductList products={products} totalQuantity={totalQuantity} />
        </div>
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
