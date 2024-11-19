"use client";

import { cn } from "@/libs/twMerge.lib";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SelectStarRating from "./selectStarRating/SelectStarRating";
import Textarea from "@/components/ui/textarea/Textarea";
import Button from "@/components/ui/button/Button";
import { z } from "zod";
import { useCreateOpinionMutation } from "@/libs/redux/features/api/services/opinionsService";

interface AddOpinionModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
}

const ceeateOpinionSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, { message: "Rating is required" })
    .max(5, { message: "Wrong rating" }),
  description: z.string(),
  product: z.string().min(1, "Product error occurred")
});

export default function AddOpinionModal({
  openModal,
  setOpenModal,
  productId
}: AddOpinionModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [product] = useState(productId);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [apiError, setApiError] = useState("");

  const [createOpinion] = useCreateOpinionMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setErrors({});
    e.preventDefault();
    const result = ceeateOpinionSchema.safeParse({
      rating,
      description,
      product
    });
    if (!result.success) {
      const validationErrors: Record<string, string | undefined> = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0]])
      );
      setErrors(validationErrors);
      setLoading(false);
    } else {
      try {
        await createOpinion({
          rating,
          description,
          product
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModal]);

  return (
    <div className={cn("add-opinion-modal-area", { open: openModal, close: !openModal })}>
      <div className={cn("add-opinion-modal-wrapper", { open: openModal, close: !openModal })}>
        <div className="add-opinion-modal" ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <div className="add-opinion-modal-header">
              <div>Add opinion</div>
              <div
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <Image
                  src="/assets/icons/close.svg"
                  alt="Close logo"
                  width={32}
                  height={32}
                  className="add-opinion-modal-close"
                />
              </div>
            </div>
            <div className="add-opinion-modal-main">
              <div className="add-opinion-modal-main-rating-header">Your product rating</div>
              <div className="add-opinion-modal-main-rating">
                <SelectStarRating setRating={setRating} />
              </div>
              {errors.rating && <p className="add-opinion-modal-form-error">{errors.rating}</p>}
              <div className="add-opinion-modal-main-description">
                <label className="add-opinion-modal-main-description-label">
                  What do you think of this product?
                  <span className="text-gray-500 ml-1">(optional)</span>
                </label>
                <Textarea rows={4} maxLength={250} setValue={setDescription} />
              </div>
              {errors.description && (
                <p className="add-opinion-modal-form-error">{errors.description}</p>
              )}
              {errors.product && <p className="add-opinion-modal-form-error">{errors.product}</p>}
              {apiError && <p className="add-opinion-modal-form-error">{apiError}</p>}
            </div>
            <div className="add-opinion-modal-footer">
              <div className="add-opinion-modal-footer-button-wrapper">
                <Button type="submit" disabled={loading} loading={loading}>
                  Add opinion
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className={cn("add-opinion-modal-overlay", { open: openModal, close: !openModal })}
      ></div>
    </div>
  );
}
