import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import { CartItem, removeFromCart, updateQuantity } from "@/libs/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import createSlug from "@/utils/createSlug";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartProductItemProps {
  product: CartItem;
}

export default function CartProductItem({ product }: CartProductItemProps) {
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateQuantity({ _id: product._id, quantity: Number(quantity) }));
  }, [dispatch, product._id, quantity]);

  const handleChangeQuantity = (
    e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.type === "keydown" && (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
      if (/^\d*$/.test(value) && value !== "") {
        setQuantity(value);
      } else {
        setQuantity("1");
      }
    }
    if (e.type === "blur") {
      if (/^\d*$/.test(value) && value !== "") {
        setQuantity(value);
      } else {
        setQuantity("1");
      }
    }
  };

  const handleDeleteProduct = () => {
    dispatch(removeFromCart(product._id));
  };

  return (
    <div className="cart-product-item-wrapper">
      <div className="cart-product-item-image-wrapper">
        <Link
          href={`/p/${createSlug(product.name)}/${product._id}`}
          className="cart-menu-product-image-wrapper"
        >
          <Image
            src={product.image || "/assets/icons/no-photography.svg"}
            alt={`${product.name} image`}
            width={160}
            height={120}
            priority
            className="cart-product-item-image"
          />
        </Link>
      </div>
      <span className="cart-product-item-responsive-wrapper">
        <div className="cart-product-item-name-wrapper">
          <Link
            href={`/p/${createSlug(product.name)}/${product._id}`}
            className="cart-product-item-name"
          >
            {product.name}
          </Link>
        </div>
        <div className="cart-product-item-responsive2-wrapper">
          <div className="cart-product-item-price-wrapper">${product.price.toFixed(2)}</div>
          <div className="cart-product-item-quantity-wrapper">
            {["1", "2", "3", "4", "5", "6", "7", "8"].includes(quantity) ? (
              <Select
                options={["1", "2", "3", "4", "5", "6", "7", "8", "9+"]}
                defaultValue={quantity}
                setValue={setQuantity}
                className="w-16"
              />
            ) : (
              <Input
                type="number"
                min={0}
                max={999}
                defaultValue={quantity}
                onInput={(e) => {
                  let value = (e.target as HTMLInputElement).value;
                  if (value.length > 3) {
                    value = value.slice(0, 3);
                  }
                  (e.target as HTMLInputElement).value = value;
                }}
                autoFocus={quantity === "9+"}
                onKeyDown={handleChangeQuantity}
                onBlur={handleChangeQuantity}
                className="cart-product-item-quantity-input"
              />
            )}
          </div>
          <div className="cart-product-item-delete">
            <Image
              src="/assets/icons/delete.svg"
              alt="delete icon"
              width={32}
              height={32}
              className="cart-product-item-delete-icon"
              onClick={handleDeleteProduct}
            />
          </div>
        </div>
      </span>
    </div>
  );
}
