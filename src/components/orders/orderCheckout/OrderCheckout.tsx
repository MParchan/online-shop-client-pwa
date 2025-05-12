"use client";

import Loader from "@/components/ui/loader/Loader";
import { useGetAddressesQuery } from "@/libs/redux/features/api/services/addressesService";
import InputWithLabel from "@/components/ui/input/InputWithLabel";
import Select from "@/components/ui/select/Select";
import { availableCountries } from "@/utils/availableCountries";
import { useEffect, useState } from "react";
import { useGetUserInfoQuery } from "@/libs/redux/features/api/services/authService";
import { paymentMethods } from "@/utils/paymentMethods";
import { z } from "zod";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { useRouter } from "next/navigation";
import { Address } from "@/types/models/address.types";
import SelectAddressList from "@/components/addresses/selectAddressList/SelectAddressList";
import OrderProductList from "../orderProductList/OrderProductList";
import { zipcodePatterns } from "@/utils/zipcodePatterns";
import { OrderData, setOrderData } from "@/libs/redux/features/order/orderSlice";

const createOrderSchema = z
  .object({
    customerName: z.string().min(1, "Customer name is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3,4})/, "Invalid phone number format"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required"),
    street: z
      .string()
      .min(1, "Street is required")
      .regex(
        /^[\p{L}\s\d.,-]+ \d+[A-Za-z]?([/\-\s]?\d+[A-Za-z]?)?$/u,
        "Street must include both street name and house number"
      ),
    paymentMethod: z.string().min(1, "Payment method is required")
  })
  .superRefine((data, ctx) => {
    const pattern = zipcodePatterns[data.country];
    if (pattern && !pattern.test(data.zipcode)) {
      ctx.addIssue({
        code: "custom",
        path: ["zipcode"],
        message: "Invalid zipcode format for the selected country"
      });
    }
  });

export default function OrderCheckout() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [street, setStreet] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState<Address>();
  const router = useRouter();
  const products = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const orderData: OrderData = useAppSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const dispatch = useAppDispatch();
  const { data: user } = useGetUserInfoQuery();
  const { data: addresses = [], isLoading: isAddressesLoading } = useGetAddressesQuery();

  useEffect(() => {
    if (products.length === 0) {
      router.push("/cart");
    }
  }, [products, router]);

  useEffect(() => {
    if (user) {
      setCustomerName(user.firstName + " " + user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user, orderData]);

  useEffect(() => {
    if (address) {
      setCountry(address.country);
      setCity(address.city);
      setZipcode(address.zipcode);
      setStreet(address.street);
    }
  }, [address]);

  useEffect(() => {
    if (orderData.customerName) {
      setCustomerName(orderData.customerName);
    }
    if (orderData.email) {
      setEmail(orderData.email);
    }
    if (orderData.phoneNumber) {
      setPhoneNumber(orderData.phoneNumber);
    }
    if (orderData.country) {
      setCountry(orderData.country);
    }
    if (orderData.city) {
      setCity(orderData.city);
    }
    if (orderData.zipcode) {
      setZipcode(orderData.zipcode);
    }
    if (orderData.street) {
      setStreet(orderData.street);
    }
    if (orderData.paymentMethod) {
      setPaymentMethod(orderData.paymentMethod);
    }
  }, [orderData]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    const result = createOrderSchema.safeParse({
      customerName,
      email,
      phoneNumber,
      country,
      city,
      zipcode,
      street,
      paymentMethod
    });
    if (!result.success) {
      const validationErrors: Record<string, string | undefined> = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]])
      );
      setErrors(validationErrors);
      setLoading(false);
    } else {
      dispatch(
        setOrderData({
          customerName: customerName,
          email: email,
          phoneNumber: phoneNumber,
          country: country,
          city: city,
          zipcode: zipcode,
          street: street,
          paymentMethod: paymentMethod
        })
      );
      setLoading(false);
      router.push("/order-summary");
    }
  };

  return (
    <div className="order-checkout">
      <div className="order-checkout-header">Delivery and payment</div>
      <div className="order-checkout-content">
        <div className="order-checkout-details-wrapper">
          <div className="order-checkout-address">
            <div>
              <div className="order-checkout-address-header">Delivery address</div>
              {isAddressesLoading ? (
                <Loader />
              ) : (
                <SelectAddressList
                  addresses={addresses}
                  selectedAddress={address}
                  setSelectedAddress={setAddress}
                />
              )}
            </div>
            <div className="order-checkout-details-form">
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Name and surname or company name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                {errors.customerName && (
                  <p className="order-checkout-details-form-input-error">{errors.customerName}</p>
                )}
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="order-checkout-details-form-input-error">{errors.email}</p>
                )}
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Phone number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && (
                  <p className="order-checkout-details-form-input-error">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="order-checkout-details-form-input">
                <Select
                  label="Country"
                  options={availableCountries}
                  defaultValue={country}
                  setValue={setCountry}
                  textAlignment="left"
                  classNameInner="order-checkout-details-form-input-select"
                />
                {errors.country && (
                  <p className="order-checkout-details-form-input-error">{errors.country}</p>
                )}
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && (
                  <p className="order-checkout-details-form-input-error">{errors.city}</p>
                )}
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Zipcode"
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
                {errors.zipcode && (
                  <p className="order-checkout-details-form-input-error">{errors.zipcode}</p>
                )}
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Street and number"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                {errors.street && (
                  <p className="order-checkout-details-form-input-error">{errors.street}</p>
                )}
              </div>
            </div>
          </div>
          <div className="order-checkout-payment">
            <div className="order-checkout-payment-header">Payment method</div>
            {errors.paymentMethod && (
              <p className="order-checkout-payment-error">{errors.paymentMethod}</p>
            )}
            <div className="order-checkout-payment-method-wrapper">
              {paymentMethods.map((method) => (
                <label
                  key={method}
                  className={`order-checkout-payment-method-label ${
                    paymentMethod === method ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="hidden"
                  />
                  <span
                    className={`order-checkout-payment-method-radio-button ${
                      paymentMethod === method ? "selected" : ""
                    }`}
                  >
                    {paymentMethod === method && (
                      <span className="order-checkout-payment-method-radio-button-inner"></span>
                    )}
                  </span>
                  {method}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="order-checkout-summary-wrapper">
          <div className="order-checkout-summary">
            <OrderProductList products={products} />
            <div className="order-checkout-summary-info">
              <div className="order-checkout-summary-price">
                <span>Total:</span>
                <span>
                  <b>${totalPrice.toFixed(2)}</b>
                </span>
              </div>
              <div className="order-checkout-summary-button">
                <Button onClick={handleSubmit} variant="green" loading={loading} disabled={loading}>
                  Go to summary
                  <Image
                    src="/assets/icons/arrow_right.svg"
                    alt="Arrow right icon"
                    width={24}
                    height={24}
                    className="order-checkout-summary-button-icon"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
