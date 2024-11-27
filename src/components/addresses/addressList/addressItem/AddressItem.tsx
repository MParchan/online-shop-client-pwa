"use client";

import { Address } from "@/types/models/address.types";
import Image from "next/image";
import { useState } from "react";
import EditAddressModal from "../../editAddressModal/EditAddressModal";
import DeleteAddressModal from "../../deleteAddressModal/DeleteAddressModal";

interface AddressItemProps {
  address: Address;
}

export default function AddressItem({ address }: AddressItemProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="address-item-wrapper">
      <div className="address-item">
        <div className="address-item-info">
          <div className="address-item-name">{address.name}</div>
          <div>{address.country}</div>
          <div>{address.street}</div>
          <div>
            {address.zipcode} {address.city}
          </div>
        </div>
        <div className="address-item-actions">
          <Image
            src="/assets/icons/edit.svg"
            alt="Edit icon"
            width={32}
            height={32}
            className="address-item-action-icon"
            title="Edit"
            onClick={() => setOpenEditModal(true)}
          />
          <Image
            src="/assets/icons/delete.svg"
            alt="Delete icon"
            width={32}
            height={32}
            className="address-item-action-icon"
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
