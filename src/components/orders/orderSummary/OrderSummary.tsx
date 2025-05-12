"use client";

import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { clearOrderData, OrderData } from "@/libs/redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderProductList from "../orderProductList/OrderProductList";
import { useCreateOrderMutation } from "@/libs/redux/features/api/services/ordersService";
import { clearCart } from "@/libs/redux/features/cart/cartSlice";

export default function OrderSummary() {
  const router = useRouter();
  const orderData: OrderData = useAppSelector((state) => state.order);
  const products = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (Object.values(orderData).some((value) => value === "") || products.length === 0) {
      router.push("/order-checkout");
    }
  }, [orderData, products.length, router]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createOrder({
        customerName: orderData.customerName,
        email: orderData.email,
        phoneNumber: orderData.phoneNumber,
        country: orderData.country,
        city: orderData.city,
        zipcode: orderData.zipcode,
        street: orderData.street,
        paymentMethod: orderData.paymentMethod,
        orderProducts: products.map((product) => ({
          product: product._id,
          quantity: product.quantity
        }))
      }).unwrap();
      dispatch(clearCart());
      dispatch(clearOrderData());
      router.push("/");
      setLoading(false);
    } catch (error) {
      const err = error as { data: { message: string } };
      setApiError(err.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="order-summary">
      <div className="order-summary-back-button">
        <Button variant="secondary" onClick={() => router.back()}>
          <Image src="/assets/icons/arrow_left.svg" alt="Arrow left icon" width={24} height={24} />
          Back to order details
        </Button>
      </div>
      <div className="order-summary-wrapper">
        <div className="order-summary-section">
          <div className="order-summary-header">Order details:</div>
          <div className="order-summary-details">
            <div>{orderData.customerName}</div>
            <div>{orderData.email}</div>
            <div>{orderData.phoneNumber}</div>
            <div>{orderData.country}</div>
            <div>
              {orderData.zipcode} {orderData.city}
            </div>
            <div>{orderData.street}</div>
          </div>
        </div>
        <div className="order-summary-section">
          <div className="order-summary-header">Payment method:</div>
          <div className="order-summary-details">{orderData.paymentMethod}</div>
        </div>
        <div className="order-summary-section">
          <div className="order-summary-header">Products:</div>
          <OrderProductList products={products} />
          <div className="order-summary-price">
            <span>Total:</span>
            <span>
              <b className="order-summary-price-value">${totalPrice.toFixed(2)}</b>
            </span>
          </div>
        </div>
        {apiError && <p className="order-summary-error">{apiError}</p>}
        <Button onClick={handleSubmit} variant="green" loading={loading} disabled={loading}>
          Place an order
        </Button>
      </div>
    </div>
  );
}
