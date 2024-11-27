import { Address } from "@/types/models/address.types";
import AddressItem from "./addressItem/AddressItem";

interface AddressListProps {
  addresses: Address[];
}

export default function AddressList({ addresses }: AddressListProps) {
  return (
    <div className="address-list">
      {addresses.length > 0 ? (
        <>
          {addresses.map((address: Address) => (
            <AddressItem key={address._id} address={address} />
          ))}
        </>
      ) : (
        <div className="address-list-empty">No saved addresses</div>
      )}
    </div>
  );
}
