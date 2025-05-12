"use client";

import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";
import ProfileNavigation from "@/components/profile/profileNavigation/ProfileNavigation";
import { useGetOrdersQuery } from "@/libs/redux/features/api/services/ordersService";
import Loader from "@/components/ui/loader/Loader";
import OrderList from "../orderList/OrderList";

export default function OrderOverview() {
  const { data: orders = [], isLoading } = useGetOrdersQuery();

  return (
    <div className="order-overview">
      <div className="order-overview-profile-button">
        <Link href="/profile">
          <Button variant="secondary">
            <Image
              src="/assets/icons/arrow_left.svg"
              alt="Arrow left icon"
              width={24}
              height={24}
              className="order-overview-profile-button-icon"
            />
            Profile
          </Button>
        </Link>
      </div>
      <div className="order-overview-profile-navigation">
        <ProfileNavigation />
      </div>
      <div className="user-orders">
        <div className="user-orders-header">
          Your orders
          <span className="user-orders-header-quantity">({orders.length})</span>
        </div>
        <div>
          {isLoading ? (
            <div className="user-orders-loader">
              <Loader />
            </div>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
}
