"use client";

import { useAppSelector } from "@/libs/redux/hooks";
import { cn } from "@/libs/twMerge.lib";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import createSlug from "@/utils/createSlug";

export default function NavbarCart() {
  const [cartMenu, setCartMenu] = useState(false);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const products = useAppSelector((state) => state.cart.items);

  return (
    <li
      className="navbar-tile-list-item"
      onMouseEnter={() => setCartMenu(true)}
      onMouseLeave={() => setCartMenu(false)}
    >
      <Link href="/cart" className="navbar-tile">
        <Image
          src="/assets/icons/cart.svg"
          alt="Cart logo"
          width={32}
          height={32}
          className="navbar-tile-logo"
        />
        <p className="navbar-tile-text">Cart</p>
      </Link>
      {totalQuantity > 0 && (
        <div className="cart-quantity">{totalQuantity < 99 ? totalQuantity : "99+"}</div>
      )}
      <div
        className={cn("cart-menu-wrapper", {
          active: cartMenu
        })}
      >
        <div className="cart-menu">
          {totalQuantity > 0 ? (
            <div>
              <div className="cart-menu-header">
                Shopping cart <span className="text-gray-500">({totalQuantity})</span>
              </div>
              <ul className="cart-menu-list">
                {products.map((product) => (
                  <li key={product._id} className="cart-menu-product">
                    <Link
                      href={`/p/${createSlug(product.name)}/${product._id}`}
                      className="cart-menu-product-image-wrapper"
                    >
                      <Image
                        src={product.image || "/assets/icons/no-photography.svg"}
                        alt={`${product.name} image`}
                        width={80}
                        height={60}
                        className="cart-menu-product-image"
                      />
                    </Link>

                    <div className="cart-menu-product-name-wrapper">
                      <Link
                        href={`/p/${createSlug(product.name)}/${product._id}`}
                        className="cart-menu-product-name"
                      >
                        {product.name}
                      </Link>
                      <div className="cart-menu-product-quantity">
                        {product.quantity} {product.quantity > 1 ? "pcs." : "pc."}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-menu-footer">
                <Link href="/cart" className="cart-menu-footer-button">
                  Go to cart
                </Link>
              </div>
            </div>
          ) : (
            <div className="cart-menu-header-empty">The shopping cart is empty</div>
          )}
        </div>
      </div>
    </li>
  );
}
