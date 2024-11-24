"use client";

import ProductRating from "@/components/products/productRating/ProductRating";
import { Opinion } from "@/types/models/opinion.types";
import { Product } from "@/types/models/product.types";
import createSlug from "@/utils/createSlug";
import { getProductMainImage } from "@/utils/getProductMainImage";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditOpinionModal from "../../editOpinionModal.tsx/EditOpinionModal";
import DeleteOpinionModal from "../../deleteOpinionModal/DeleteOpinionModal";

interface OpinionItemProps {
  opinion: Opinion;
}

export default function OpinionItem({ opinion }: OpinionItemProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const product: Product = opinion.product as Product;
  const mainImage = getProductMainImage(product.images);

  return (
    <div className="opinion-item">
      <div className="opinion-item-image-wrapper">
        <Link href={`/p/${createSlug(product.name)}/${product._id}`}>
          <Image
            src={mainImage?.image || "/assets/icons/no-photography.svg"}
            alt={`${product.name} image`}
            width={160}
            height={120}
            priority
            className="opinion-item-image"
          />
        </Link>
      </div>
      <div className="opinion-item-product-responsive">
        <Link href={`/p/${createSlug(product.name)}/${product._id}`}>
          <Image
            src={mainImage?.image || "/assets/icons/no-photography.svg"}
            alt={`${product.name} image`}
            width={80}
            height={60}
            priority
            className="opinion-item-image-responsive"
          />
        </Link>
        <div className="opinion-item-name-responsive">
          <Link href={`/p/${createSlug(product.name)}/${product._id}`}>{product.name}</Link>
        </div>
      </div>
      <div className="opinion-item-info-wrapper">
        <div className="opinion-item-product-name">
          <Link href={`/p/${createSlug(product.name)}/${product._id}`}>{product.name}</Link>
        </div>
        <div className="opinion-item-rating">
          <div className="opinion-item-rating-stars">
            <ProductRating opinions={[opinion]} quantity={false} />
          </div>
          <div className="opinion-item-rating-date">
            {formatDistanceToNow(new Date(opinion.date), { addSuffix: true })}
          </div>
        </div>
        <div className="opinion-item-description">{opinion.description}</div>
      </div>
      <div className="opinion-item-actions">
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit icon"
          width={32}
          height={32}
          className="opinion-item-action-icon"
          title="Edit"
          onClick={() => setOpenEditModal(true)}
        />
        <Image
          src="/assets/icons/delete.svg"
          alt="Delete icon"
          width={32}
          height={32}
          className="opinion-item-action-icon"
          title="Delete"
          onClick={() => setOpenDeleteModal(true)}
        />
      </div>
      <EditOpinionModal opinion={opinion} open={openEditModal} setOpen={setOpenEditModal} />
      <DeleteOpinionModal opinion={opinion} open={openDeleteModal} setOpen={setOpenDeleteModal} />
    </div>
  );
}
