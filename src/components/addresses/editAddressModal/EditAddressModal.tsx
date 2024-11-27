"use clien";

import Button from "@/components/ui/button/Button";
import InputWithLabel from "@/components/ui/input/InputWithLabel";
import Modal from "@/components/ui/modal/Modal";
import Select from "@/components/ui/select/Select";
import { useUpdateAddressMutation } from "@/libs/redux/features/api/services/addressesService";
import { Address } from "@/types/models/address.types";
import { availableCountries } from "@/utils/availableCountries";
import { zipcodePatterns } from "@/utils/zipcodePatterns";
import { SetStateAction, useState } from "react";
import { z } from "zod";

interface EditAddressModalProps {
  address: Address;
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

const createAddressSchema = z
  .object({
    name: z.string().min(1, "Address name is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zipcode is required"),
    street: z
      .string()
      .min(1, "Street is required")
      .regex(
        /^[\p{L}\s\d.,-]+ \d+[A-Za-z]?([/\-\s]?\d+[A-Za-z]?)?$/u,
        "Street must include both street name and house number"
      )
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

export default function EditAddressModal({
  address,
  openModal,
  setOpenModal
}: EditAddressModalProps) {
  const [name, setName] = useState(address.name);
  const [country, setCountry] = useState(address.country);
  const [city, setCity] = useState(address.city);
  const [zipcode, setZipcode] = useState(address.zipcode);
  const [street, setStreet] = useState(address.street);
  const id = address._id;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [apiError, setApiError] = useState("");
  const [updateAddress] = useUpdateAddressMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setErrors({});
    e.preventDefault();
    const result = createAddressSchema.safeParse({
      name,
      country,
      city,
      zipcode,
      street
    });
    if (!result.success) {
      const validationErrors: Record<string, string | undefined> = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]])
      );
      setErrors(validationErrors);
      setLoading(false);
    } else {
      try {
        await updateAddress({
          id,
          name,
          country,
          city,
          zipcode,
          street
        }).unwrap();
        setLoading(false);
        setOpenModal(false);
      } catch (error) {
        const err = error as { data: { message: string } };
        setApiError(err.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <Modal open={openModal} setOpen={setOpenModal} header="Edit address">
      <form onSubmit={handleSubmit} className="edit-address-form">
        <div className="edit-address-modal-main">
          <div className="edit-address-modal-form-input">
            <InputWithLabel
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="edit-address-modal-form-input-error">{errors.name}</p>}
          </div>
          <div className="edit-address-modal-form-input">
            <Select
              label="Country"
              options={availableCountries}
              defaultValue={country}
              setValue={setCountry}
              textAlignment="left"
              classNameInner="edit-address-modal-form-input-select"
            />
            {errors.country && (
              <p className="edit-address-modal-form-input-error">{errors.country}</p>
            )}
          </div>
          <div className="edit-address-modal-form-input">
            <InputWithLabel
              label="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <p className="edit-address-modal-form-input-error">{errors.city}</p>}
          </div>
          <div className="edit-address-modal-form-input">
            <InputWithLabel
              label="Zipcode"
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            {errors.zipcode && (
              <p className="edit-address-modal-form-input-error">{errors.zipcode}</p>
            )}
          </div>
          <div className="edit-address-modal-form-input">
            <InputWithLabel
              label="Street and number"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            {errors.street && (
              <p className="edit-address-modal-form-input-error">{errors.street}</p>
            )}
          </div>
          {apiError && <p className="edit-address-modal-form-error">{apiError}</p>}
        </div>
        <div className="edit-address-modal-footer">
          <div className="edit-address-modal-footer-button-wrapper">
            <Button type="submit" disabled={loading} loading={loading}>
              Edit address
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
