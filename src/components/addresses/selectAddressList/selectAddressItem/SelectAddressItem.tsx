"use client";

import { Address } from "@/types/models/address.types";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import EditAddressModal from "../../editAddressModal/EditAddressModal";
import DeleteAddressModal from "../../deleteAddressModal/DeleteAddressModal";

interface SelectAddressItemProps {
  address: Address;
  selectedAddress: Address | undefined;
  setSelectedAddress: Dispatch<SetStateAction<Address | undefined>>;
}

export default function SelectAddressItem({
  address,
  selectedAddress,
  setSelectedAddress
}: SelectAddressItemProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="select-address-item-wrapper">
      <div
        className={`select-address-item ${selectedAddress && selectedAddress._id === address._id ? "selected" : ""}`}
        onClick={() => setSelectedAddress(address)}
      >
        <div className="select-address-item-info">
          <div className="select-address-item-name">{address.name}</div>
          <div>{address.country}</div>
          <div>{address.street}</div>
          <div>
            {address.zipcode} {address.city}
          </div>
        </div>
        <div className="select-address-item-actions">
          <Image
            src="/assets/icons/edit.svg"
            alt="Edit icon"
            width={32}
            height={32}
            className="select-address-item-action-icon"
            title="Edit"
            onClick={() => setOpenEditModal(true)}
          />
          <Image
            src="/assets/icons/delete.svg"
            alt="Delete icon"
            width={32}
            height={32}
            className="select-address-item-action-icon"
            title="Delete"
            onClick={() => setOpenDeleteModal(true)}
          />
        </div>
      </div>
      <EditAddressModal
        address={address}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
      />
      <DeleteAddressModal
        address={address}
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
    </div>
  );
}
