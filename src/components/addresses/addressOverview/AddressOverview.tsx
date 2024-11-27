"use client";

import ProfileNavigation from "@/components/profile/profileNavigation/ProfileNavigation";
import Button from "@/components/ui/button/Button";
import { useGetAddressesQuery } from "@/libs/redux/features/api/services/addressesService";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/ui/loader/Loader";
import { useState } from "react";
import AddAddressModal from "../addAddressModal/AddAddressModal";
import AddressList from "../addressList/AddressList";

export default function AddressOverview() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: addresses = [], isLoading } = useGetAddressesQuery();
  return (
    <div className="address-overview">
      <div className="address-overview-profile-button">
        <Link href="/profile">
          <Button variant="secondary">
            <Image
              src="/assets/icons/arrow_left.svg"
              alt="Arrow left icon"
              width={24}
              height={24}
              className="opinion-overview-profile-button-icon"
            />
            Profile
          </Button>
        </Link>
      </div>
      <div className="address-overview-profile-navigation">
        <ProfileNavigation />
      </div>
      <div className="user-addresses">
        <div className="address-overview-header">Addresses for orders</div>
        <div className="user-address-add-button">
          <Button onClick={() => setOpenAddModal(true)}>Add address</Button>
        </div>
        <div className="user-addresses-header">
          Your addresses
          <span className="user-addresses-header-quantity">({addresses.length})</span>
        </div>
        <div>
          {isLoading ? (
            <div className="user-addresses-loader">
              <Loader />
            </div>
          ) : (
            <AddressList addresses={addresses} />
          )}
        </div>
      </div>
      <AddAddressModal openModal={openAddModal} setOpenModal={setOpenAddModal} />
    </div>
  );
}
