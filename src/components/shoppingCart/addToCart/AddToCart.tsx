"use client";

import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/Select";
import Image from "next/image";
import { Product } from "@/types/models/product.types";
import { useState } from "react";

interface AddToCartProps {
  product: Product;
}
export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState("1");
  product;

  return (
    <>
      <Select
        options={["1", "2", "3", "4", "5", "6", "7", "8"]}
        defaultValue={quantity}
        setValue={setQuantity}
        className="w-16"
      />
      <Button variant="green" className="ml-2">
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
