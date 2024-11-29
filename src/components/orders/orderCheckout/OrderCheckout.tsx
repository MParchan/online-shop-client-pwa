"use client";

import Loader from "@/components/ui/loader/Loader";
import { useGetAddressesQuery } from "@/libs/redux/features/api/services/addressesService";
import AddressList from "@/components/addresses/addressList/AddressList";
import InputWithLabel from "@/components/ui/input/InputWithLabel";
import Select from "@/components/ui/select/Select";
import { availableCountries } from "@/utils/availableCountries";
import { useEffect, useState } from "react";

export default function OrderCheckout() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [street, setStreet] = useState("");

  const { data: addresses = [], isLoading: isAddressesLoading } = useGetAddressesQuery();

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
            {isAddressesLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <AddressList addresses={addresses} />
            )}
            <div className="order-checkout-details-form">
              <div>Order data</div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="First name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="order-checkout-details-form-input">
                <InputWithLabel
                  label="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
            <div>Payment</div>
          </div>
        </div>
        <div className="order-checkout-summary-wrapper">
          <div className="order-checkout-summary"></div>
        </div>
      </div>
    </div>
  );
}
