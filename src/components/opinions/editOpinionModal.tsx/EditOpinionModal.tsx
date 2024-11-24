"use client";

import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/modal/Modal";
import SelectStarRating from "@/components/ui/selectStarRating/SelectStarRating";
import Textarea from "@/components/ui/textarea/Textarea";
import { useUpdateOpinionMutation } from "@/libs/redux/features/api/services/opinionsService";
import { Opinion } from "@/types/models/opinion.types";
import { Product } from "@/types/models/product.types";
import { SetStateAction, useState } from "react";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import createSlug from "@/utils/createSlug";
import { getProductMainImage } from "@/utils/getProductMainImage";

interface EditOpinionModalProps {
  opinion: Opinion;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const editOpinionSchema = z.object({
  id: z.string().min(1, "opinion error occurred"),
  rating: z
    .number()
    .int()
    .min(1, { message: "Rating is required" })
    .max(5, { message: "Wrong rating" }),
  description: z.string(),
  product: z.string().min(1, "Product error occurred")
});

export default function EditOpinionModal({ opinion, open, setOpen }: EditOpinionModalProps) {
  const [rating, setRating] = useState(opinion.rating);
  const [description, setDescription] = useState(opinion.description);
  const id = opinion._id;
  const productInstance = opinion.product as Product;
  const product = productInstance._id;
  const mainImage = getProductMainImage(productInstance.images);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [apiError, setApiError] = useState("");

  const [editOpinion] = useUpdateOpinionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setErrors({});
    setApiError("");
    e.preventDefault();
    const result = editOpinionSchema.safeParse({
      id,
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
        await editOpinion({
          id,
          rating,
          description,
          product
        }).unwrap();
        setLoading(false);
        setOpen(false);
      } catch (error) {
        const err = error as { data: { message: string } };
        setApiError(err.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} header="Edit opinion">
      <form onSubmit={handleSubmit} className="edit-opinion-form">
        <div className="edit-opinion-form-body">
          <div className="edit-opinion-product">
            <Link href={`/p/${createSlug(productInstance.name)}/${productInstance._id}`}>
              <Image
                src={mainImage?.image || "/assets/icons/no-photography.svg"}
                alt={`${productInstance.name} image`}
                width={80}
                height={60}
                priority
                className="edit-opinion-product-image"
              />
            </Link>
            <div className="edit-opinion-product-name">
              <Link href={`/p/${createSlug(productInstance.name)}/${productInstance._id}`}>
                {productInstance.name}
              </Link>
            </div>
          </div>
          <div className="edit-opinion-rating">
            <label className="edit-opinion-rating-header">Product rating</label>
            <div className="edit-opinion-rating-stars">
              <SelectStarRating rating={rating} setRating={setRating} />
            </div>
          </div>
          {errors.rating && <p className="edit-opinion-form-error">{errors.rating}</p>}
          <div className="edit-opinion-description">
            <label className="edit-opinion-description-label">
              What do you think of this product?
              <span className="text-gray-500 ml-1">(optional)</span>
            </label>
            <Textarea rows={4} maxLength={250} value={description} setValue={setDescription} />
          </div>
          {errors.description && <p className="edit-opinion-form-error">{errors.description}</p>}
          {errors.id && <p className="edit-opinion-form-error">{errors.id}</p>}
          {errors.product && <p className="edit-opinion-form-error">{errors.product}</p>}
          {apiError && <p className="edit-opinion-form-error">{apiError}</p>}
        </div>
        <div className="edit-opinion-form-submit-wrapper">
          <div className="edit-opinion-form-submit">
            <Button type="submit" disabled={loading} loading={loading}>
              Edit opinion
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
