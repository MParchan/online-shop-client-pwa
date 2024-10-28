"use client";

import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/Select";
import Image from "next/image";
import { Product } from "@/types/models/product.types";
import { useState } from "react";
import { useAppDispatch } from "@/libs/redux/hooks";
import { addToCart } from "@/libs/redux/features/cart/cartSlice";
import { ProductImage } from "@/types/models/image.types";
import Input from "@/components/ui/input/Input";
import AddToCartModal from "./AddToCartModal";

interface AddToCartProps {
  product: Product;
}
export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState("1");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const mainImage: ProductImage | undefined = product.images.find(
    (image: ProductImage) => image.main
  );
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        image: mainImage?.image,
        price: product.price,
        quantity: Number(quantity)
      })
    );
    setOpenModal(true);
  };

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

  return (
    <div className="add-to-cart">
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
          onInput={(e) => {
            let value = (e.target as HTMLInputElement).value;
            if (value.length > 3) {
              value = value.slice(0, 3);
            }
            (e.target as HTMLInputElement).value = value;
          }}
          autoFocus
          onKeyDown={handleChangeQuantity}
          onBlur={handleChangeQuantity}
          className="w-[48px] h-[42px] !px-2"
        />
      )}
      <Button
        variant="green"
        className="ml-2"
        onClick={handleAddToCart}
        disabled={Number(quantity) > product.quantity}
      >
        <Image
          src="/assets/icons/add_shopping_cart.svg"
          alt="Add shopping cart icon"
          width={22}
          height={22}
          className="invert mr-1 w-auto h-[22px]"
        />
        Add to cart
      </Button>
      <AddToCartModal openModal={openModal} setOpenModal={setOpenModal} product={product} />
    </div>
  );
}
