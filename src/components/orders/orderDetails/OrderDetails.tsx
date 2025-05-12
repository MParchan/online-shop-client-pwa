"use client";

import Loader from "@/components/ui/loader/Loader";
import { useGetOrderByIdQuery } from "@/libs/redux/features/api/services/ordersService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import OrderProductList from "../orderProductList/OrderProductList";
import { Product } from "@/types/models/product.types";
import { getProductMainImage } from "@/utils/getProductMainImage";
import { CartItem } from "@/libs/redux/features/cart/cartSlice";
import { format } from "date-fns";
import Button from "@/components/ui/button/Button";
import Link from "next/link";

interface OrderDetailsProps {
  orderId: string;
}

export default function OrderDetails({ orderId }: OrderDetailsProps) {
  const { data: order, isLoading, error } = useGetOrderByIdQuery({ id: orderId });
  const router = useRouter();
  useEffect(() => {
    if (error && "status" in error && error.status === 403) {
      router.push("/profile");
    }
  }, [error, router]);

  const orderProducts: CartItem[] | undefined = order?.orderProducts.map((orderProduct) => ({
    _id: (orderProduct.product as Product)._id,
    name: (orderProduct.product as Product).name,
    image: getProductMainImage((orderProduct.product as Product).images)?.image,
    price: (orderProduct.product as Product).price,
    quantity: orderProduct.quantity
  }));
  return (
    <div className="order-details">
      {isLoading || !order ? (
        <div className="order-details-loader">
          <Loader />
        </div>
      ) : (
        <div className="order-details-wrapper">
          <div className="order-details-button-wrapper">
            <Link href="/profile/orders">
              <Button variant="secondary">
                <Image
                  src="/assets/icons/arrow_left.svg"
                  alt="Arrow left icon"
                  width={24}
                  height={24}
                />
                Order list
              </Button>
            </Link>
          </div>
          <div className="order-details-section">
            <div className="order-details-header">Order details:</div>
            <div className="order-details-details">
              <div>{order.customerName}</div>
              <div>{order.email}</div>
              <div>{order.phoneNumber}</div>
              <div>{order.country}</div>
              <div>
                {order.zipcode} {order.city}
              </div>
              <div>{order.street}</div>
            </div>
          </div>
          <div className="order-details-section">
            <div className="order-details-header">Date:</div>
            <div className="order-details-details">
              {format(new Date(order.date), "d MMMM yyyy")}
            </div>
          </div>
          <div className="order-details-section">
            <div className="order-details-header">Status:</div>
            <div className="order-details-details">{order.status}</div>
          </div>
          <div className="order-details-section">
            <div className="order-details-header">Value:</div>
            <div className="order-details-details">${order.value.toFixed(2)}</div>
          </div>
          <div className="order-details-section">
            <div className="order-details-header">Payment method:</div>
            <div className="order-details-details">{order.paymentMethod}</div>
          </div>
          <div className="order-details-section">
            <div className="order-details-header">Products:</div>
            {orderProducts ? <OrderProductList products={orderProducts} /> : <Loader />}
          </div>
        </div>
      )}
    </div>
  );
}
