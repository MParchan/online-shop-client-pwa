import { Address } from "@/types/models/address.types";
import SelectAddressItem from "./selectAddressItem/SelectAddressItem";
import { Dispatch, SetStateAction } from "react";

interface SelectAddressListProps {
  addresses: Address[];
  selectedAddress: Address | undefined;
  setSelectedAddress: Dispatch<SetStateAction<Address | undefined>>;
}

export default function SelectAddressList({
  addresses,
  selectedAddress,
  setSelectedAddress
}: SelectAddressListProps) {
  return (
    <div className="select-address-list">
      {addresses.length > 0 ? (
        <>
          {addresses.map((address: Address) => (
            <SelectAddressItem
              key={address._id}
              address={address}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          ))}
        </>
      ) : (
        <div className="select-address-list-empty">No saved addresses</div>
      )}
    </div>
  );
}
