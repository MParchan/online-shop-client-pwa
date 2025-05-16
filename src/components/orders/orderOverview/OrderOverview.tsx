"use client";

import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";
import ProfileNavigation from "@/components/profile/profileNavigation/ProfileNavigation";
import {
  useGetAllOrdersQuery,
  useGetOrdersQuery
} from "@/libs/redux/features/api/services/ordersService";
import Loader from "@/components/ui/loader/Loader";
import OrderList from "../orderList/OrderList";

interface OrderOverviewProps {
  isAdmin?: boolean;
}
export default function OrderOverview({ isAdmin }: OrderOverviewProps) {
  const allOrdersQuery = useGetAllOrdersQuery(undefined, { skip: !isAdmin });
  const userOrdersQuery = useGetOrdersQuery(undefined, { skip: isAdmin });

  const orderRes = isAdmin ? allOrdersQuery.data : userOrdersQuery.data;
  const isLoading = isAdmin ? allOrdersQuery.isLoading : userOrdersQuery.isLoading;

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
          {isAdmin ? "All orders" : "Your orders"}
          <span className="user-orders-header-quantity">({orderRes?.orderCount})</span>
        </div>
        <div>
          {isLoading || !orderRes ? (
            <div className="user-orders-loader">
              <Loader />
            </div>
          ) : (
            <OrderList orders={orderRes.orders} isAdmin={isAdmin} />
          )}
        </div>
      </div>
    </div>
  );
}
