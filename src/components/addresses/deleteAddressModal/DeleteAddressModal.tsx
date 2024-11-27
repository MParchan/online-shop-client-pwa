"use client";

import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/modal/Modal";
import { useDeleteAddressMutation } from "@/libs/redux/features/api/services/addressesService";
import { Address } from "@/types/models/address.types";
import { SetStateAction, useState } from "react";

interface DeleteAddressModalProps {
  address: Address;
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

export default function DeleteAddressModal({
  address,
  openModal,
  setOpenModal
}: DeleteAddressModalProps) {
  const id = address._id;
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [deleteAddress] = useDeleteAddressMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setApiError("");
    e.preventDefault();
    try {
      await deleteAddress({
        id
      }).unwrap();
      setLoading(false);
      setOpenModal(false);
    } catch (error) {
      const err = error as { data: { message: string } };
      setApiError(err.data.message);
      setLoading(false);
    }
  };

  return (
    <Modal open={openModal} setOpen={setOpenModal} header="Delete address">
      <form onSubmit={handleSubmit} className="delete-address-form">
        <div className="delete-address-form-body">
          <div>Delete address named: {address.name}?</div>
          {apiError && <p className="delete-address-form-error">{apiError}</p>}
        </div>
        <div className="delete-address-form-submit-wrapper">
          <div className="delete-address-form-submit">
            <Button type="submit" disabled={loading} loading={loading}>
              Delete Address
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
