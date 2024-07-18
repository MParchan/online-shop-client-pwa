import Button from "@/components/ui/button/Button";
import Select from "@/components/ui/select/Select";
import Image from "next/image";
import React from "react";
import ProductImages from "../productImages/productImages";
import SortImages from "@/utils/sortImages";
import ProductSpecification from "../productSpecification/ProductSpecification";
import { Product } from "@/types/models/product.types";
import { Brand } from "@/types/models/brand.types";
import { Property } from "@/types/models/property.types";
import { PropertyType } from "@/types/models/propertyType.types";
import ScrollToSection from "@/components/ui/scrollToSection/ScrollToSection";
import { Subcategory } from "@/types/models/subcategory.types";
import { Category } from "@/types/models/category.types";
import Link from "next/link";
import createSlug from "@/utils/createSlug";

export default function ProductDetails({ product }: { product: Product }) {
  const sortedImages = SortImages(product.images);
  const brand = product.brand as Brand;
  const subcategory = product.subcategory as Subcategory;
  const category = subcategory.category as Category;

  return (
    <div className="product">
      <div className="product-category">
        <Link href="/">OnlineShop</Link>
        <Image
          src="/assets/icons/arrow_right.svg"
          alt="Arrow right icon"
          width={20}
          height={20}
          className="w-auto h-[20px]"
        />
        <Link href={`/c/${createSlug(category.name)}/${category._id}`}>{category.name}</Link>
        <Image
          src="/assets/icons/arrow_right.svg"
          alt="Arrow right icon"
          width={20}
          height={20}
          className="w-auto h-[20px]"
        />
        <Link href={`/s/${createSlug(subcategory.name)}/${subcategory._id}`}>
          {subcategory.name}
        </Link>
      </div>
      <div className="product-info-name-small">{product.name}</div>
      <div className="product-main">
        <div className="product-images-wrapper">
          <ProductImages productName={product.name} images={sortedImages} />
        </div>
        <div className="product-info">
          <div className="product-info-name">{product.name}</div>
          <div className="product-info-details">
            <div className="product-info-specification-wrapper">
              <div className="product-info-specification">
                <ul>
                  <li className="product-info-specification-item">
                    <span className="product-info-specification-header">Brand: </span>
                    <span className="product-info-specification-value">{brand.name}</span>
                  </li>
                  {product.productProperties.slice(0, 4).map((productProperty) => {
                    const property = productProperty.property as Property;
                    const propertyType = property.propertyType as PropertyType;
                    return (
                      <li key={productProperty._id} className="product-info-specification-item">
                        <span className="product-info-specification-header">
                          {propertyType.name}:{" "}
                        </span>
                        <span className="product-info-specification-value">{property.value}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="product-info-specification-scroll">
                  <ScrollToSection className="flex text-sm" elementId="productSpecificationId">
                    Scroll to full specification
                    <Image
                      src="/assets/icons/double_arrow_down.svg"
                      alt="Double arrow down icon"
                      width={20}
                      height={20}
                      className="w-auto h-[20px]"
                    />
                  </ScrollToSection>
                </div>
              </div>
            </div>
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
                    className="invert mr-1 w-auto h-[22px]"
                  />
                  Add to cart
                </Button>
              </div>
              {product.quantity > 0 ? (
                <div className="product-info-order-available">
                  <Image
                    src="/assets/icons/check_circle.svg"
                    alt="Check circle icon"
                    width={32}
                    height={32}
                    className="mr-4 w-auto h-8"
                  />
                  <span className="product-info-order-available-span">Available</span>
                </div>
              ) : (
                <div className="product-info-order-available">
                  <Image
                    src="/assets/icons/cancel_circle.svg"
                    alt="Cancel circle icon"
                    width={32}
                    height={32}
                    className="mr-4 w-auto h-8"
                  />
                  <span className="product-info-order-not-available-span">Not available</span>
                </div>
              )}
              <div className="product-info-order-available">
                <Image
                  src="/assets/icons/warehouse.svg"
                  alt="Warehouse icon"
                  width={32}
                  height={32}
                  className="mr-4 w-auto h-8"
                />
                <span>
                  Number in stock:{" "}
                  {product.quantity < 100 ? (
                    <span
                      className={
                        product.quantity > 0
                          ? "product-info-order-available-span"
                          : "product-info-order-not-available-span"
                      }
                    >
                      {product.quantity}
                    </span>
                  ) : (
                    <span className="product-info-order-available-span">99+</span>
                  )}
                </span>
              </div>
              {product.quantity > 0 ? (
                <div className="product-info-order-available">
                  <Image
                    src="/assets/icons/local_shipping.svg"
                    alt="Local shopping icon"
                    width={32}
                    height={32}
                    className="mr-4 w-auto h-8"
                  />
                  <span className="product-info-order-available-span">Free shipping</span>
                </div>
              ) : (
                <div className="product-info-order-available">
                  <Image
                    src="/assets/icons/mail.svg"
                    alt="Mail icon"
                    width={32}
                    height={32}
                    className="mr-4 w-auto h-8"
                  />
                  <span>Inform on availability</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="product-desciption">{product.description}</div>
      <ProductSpecification
        productProperties={product.productProperties}
        subcategoryName={subcategory.name}
      />
    </div>
  );
}
