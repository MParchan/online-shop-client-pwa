"use client";

import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/modal/Modal";
import { useDeleteOpinionMutation } from "@/libs/redux/features/api/services/opinionsService";
import { Opinion } from "@/types/models/opinion.types";
import { Product } from "@/types/models/product.types";
import createSlug from "@/utils/createSlug";
import Link from "next/link";
import { SetStateAction, useState } from "react";

interface DeleteOpinionModalProps {
  opinion: Opinion;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function DeleteOpinionModal({ opinion, open, setOpen }: DeleteOpinionModalProps) {
  const id = opinion._id;
  const productInstance = opinion.product as Product;
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [deleteOpinion] = useDeleteOpinionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setApiError("");
    e.preventDefault();

    try {
      await deleteOpinion({
        id
      }).unwrap();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      const err = error as { data: { message: string } };
      setApiError(err.data.message);
      setLoading(false);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} header="Delete opinion">
      <form onSubmit={handleSubmit} className="delete-opinion-form">
        <div className="delete-opinion-form-body">
          <div>
            <span>Delete opinion for product:</span>
            <span className="delete-opinion-product-name">
              <Link href={`/p/${createSlug(productInstance.name)}/${productInstance._id}`}>
                {productInstance.name}
              </Link>
            </span>
            ?
          </div>
          {apiError && <p className="delete-opinion-form-error">{apiError}</p>}
        </div>
        <div className="delete-opinion-form-submit-wrapper">
          <div className="delete-opinion-form-submit">
            <Button type="submit" disabled={loading} loading={loading}>
              Delete opinion
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
