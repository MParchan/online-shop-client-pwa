import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/Select";
import { Product } from "@/types/models/product.types";
import Image from "next/image";
import React from "react";
import ProductImages from "../productImages/productImages";
import SortImages from "@/utils/sortImages";

export default function ProductDetails({ product }: { product: Product }) {
  product.images = SortImages(product.images);
  let extendedList = product.images;
  extendedList = extendedList.concat(product.images);
  extendedList = extendedList.concat(product.images);
  return (
    <div className="product">
      <div className="product-main">
        <div className="product-images-wrapper">
          <ProductImages productName={product.name} images={extendedList} />
        </div>
        <div className="product-info">
          <div className="product-info-name">{product.name}</div>
          <div className="product-info-details">
            <div className="product-info-specification">AAA</div>
            <div className="product-info-order">
              <div className="product-info-order-price">${product.price.toFixed(2)}</div>
              <div className="product-info-order-cart">
                <Select
                  options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                  defaultValue="1"
                  className="w-16"
                />
                <Button variant="green" className="ml-2">
                  <Image
                    src="/assets/icons/add_shopping_cart.svg"
                    alt="Add shopping cart icon"
                    width={22}
                    height={22}
                    className="invert mr-1"
                  />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
