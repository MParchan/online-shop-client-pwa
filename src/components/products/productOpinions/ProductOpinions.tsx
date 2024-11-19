"use client";

import Button from "@/components/ui/button/Button";
import { Opinion } from "@/types/models/opinion.types";
import { averageRating } from "@/utils/averageRating";
import ProductRating from "../productRating/ProductRating";
import Image from "next/image";
import { User } from "@/types/models/user.types";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import AddOpinionModal from "./addOpinionModal/AddOpinionModal";
import { useAppSelector } from "@/libs/redux/hooks";
import { useRouter } from "next/navigation";
import { useGetProductOpinionsQuery } from "@/libs/redux/features/api/services/productsService";

interface ProductOpinionsProps {
  productId: string;
}
export default function ProductOpinions({ productId }: ProductOpinionsProps) {
  const [displayedCount, setDisplayedCount] = useState(10);
  const [openAddOpinionModal, setOpenAddOpinionModal] = useState(false);
  const { isLogged } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const { data: opinions = [] } = useGetProductOpinionsQuery({ id: productId });

  const handleLoadMore = () => {
    setDisplayedCount((prevCount) => prevCount + 10);
  };
  const remainingOpinions = opinions.length - displayedCount;

  const graph = [];
  for (let i = 5; i >= 1; i--) {
    const countIStarOpinions = opinions.filter((opinion) => opinion.rating === i).length;
    graph.push(
      <div key={i} className="product-opinions-rating-graph-row group">
        <Image
          src="/assets/icons/star_empty.svg"
          alt="Star empty icon"
          height={20}
          width={20}
          className="product-opinions-rating-graph-row-star"
        />
        <span className="product-opinions-rating-graph-row-number">{i}</span>
        <div className="product-opinions-rating-graph-row-slider">
          <div
            className="product-opinions-rating-graph-row-inner-slider"
            style={{ width: `calc(${(countIStarOpinions / opinions.length) * 100}%)` }}
          ></div>
        </div>
        <span className="product-opinions-rating-graph-row-quantity">{countIStarOpinions}</span>
      </div>
    );
  }

  const handleOpenAddOpinionModal = () => {
    if (isLogged) {
      setOpenAddOpinionModal(true);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div id="productOpinionsId" className="product-opinions">
      <div className="product-opinions-title">Opinions</div>
      <div className="product-opinions-overview">
        {opinions.length > 0 && (
          <div className="product-opinions-rating">
            <div className="product-opinions-value">
              <span className="product-opinions-average-value">{averageRating(opinions)}</span>/5
              <div className="product-opinions-rating-stars">
                <ProductRating opinions={opinions} />
              </div>
            </div>
            <div className="product-opinions-rating-graph">{graph}</div>
          </div>
        )}
        <div className="product-opinions-add">
          <div className="product-opinions-add-header">Do you have the product?</div>
          <div>
            <Button onClick={handleOpenAddOpinionModal}>
              {opinions.length ? "Add opinion" : "Add first opinion"}
            </Button>
          </div>
        </div>
      </div>
      {opinions.length > 0 && (
        <div className="product-opinions-reviews">
          <div className="product-opinions-reviews-header">
            User reviews
            <span className="product-opinions-reviews-header-quantity">({opinions.length})</span>
          </div>
          {opinions.slice(0, displayedCount).map((opinion: Opinion) => {
            const user = opinion.user as User;
            return (
              <div key={opinion._id} className="product-opinions-review-wrapper">
                <div className="product-opinions-review-user">{user.firstName}</div>
                <div className="product-opinions-review-rating">
                  <ProductRating opinions={[opinion]} quantity={false} />
                  <span className="product-opinions-review-rating-date">
                    {formatDistanceToNow(new Date(opinion.date), { addSuffix: true })}
                  </span>
                </div>
                <div className="product-opinions-review-description">{opinion.description}</div>
              </div>
            );
          })}
          {remainingOpinions > 0 && (
            <div className="product-opinions-load-more">
              <Button variant="secondary" onClick={handleLoadMore}>
                Load more ({remainingOpinions})
              </Button>
            </div>
          )}
        </div>
      )}
      <AddOpinionModal
        openModal={openAddOpinionModal}
        setOpenModal={setOpenAddOpinionModal}
        productId={productId}
      />
    </div>
  );
}
