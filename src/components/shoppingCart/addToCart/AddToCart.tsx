"use client";

import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/Select";
import Image from "next/image";
import { Product } from "@/types/models/product.types";
import { useState } from "react";
import { useAppDispatch } from "@/libs/redux/hooks";
import { addToCart } from "@/libs/redux/features/cart/cartSlice";
import { ProductImage } from "@/types/models/image.types";

interface AddToCartProps {
  product: Product;
}
export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState("1");
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
  };

  return (
    <>
      <Select
        options={["1", "2", "3", "4", "5", "6", "7", "8"]}
        defaultValue={quantity}
        setValue={setQuantity}
        className="w-16"
      />
      <Button variant="green" className="ml-2" onClick={handleAddToCart}>
        <Image
          src="/assets/icons/add_shopping_cart.svg"
          alt="Add shopping cart icon"
          width={22}
          height={22}
          className="invert mr-1 w-auto h-[22px]"
        />
        Add to cart
      </Button>
    </>
  );
}
