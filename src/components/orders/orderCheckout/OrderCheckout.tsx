"use client";

import Loader from "@/components/ui/loader/Loader";
import { useGetAddressesQuery } from "@/libs/redux/features/api/services/addressesService";
import InputWithLabel from "@/components/ui/input/InputWithLabel";
import Select from "@/components/ui/select/Select";
import { availableCountries } from "@/utils/availableCountries";
import { useEffect, useState } from "react";
import { useGetUserInfoQuery } from "@/libs/redux/features/api/services/authService";
import { paymentMethods } from "@/utils/paymentMethods";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import { useAppSelector } from "@/libs/redux/hooks";
import { useRouter } from "next/navigation";
import { Address } from "@/types/models/address.types";
import SelectAddressList from "@/components/addresses/selectAddressList/SelectAddressList";
import OrderProductList from "../orderProductList/OrderProductList";

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
  }, [user]);

  useEffect(() => {
    if (address) {
      setCountry(address.country);
      setCity(address.city);
      setZipcode(address.zipcode);
      setStreet(address.street);
    }
  }, [address]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f5f5";
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

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
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Phone number"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
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
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Zipcode"
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Street and number"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="order-checkout-payment">
            <div className="order-checkout-payment-header">Payment method</div>
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
                <Link href="/order-checkout">
                  <Button variant="green">
                    Go to summary
                    <Image
                      src="/assets/icons/arrow_right.svg"
                      alt="Arrow right icon"
                      width={24}
                      height={24}
                      className="order-checkout-summary-button-icon"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
