"use client";

import { useGetOpinionsQuery } from "@/libs/redux/features/api/services/opinionsService";
import OpinionList from "../opinionList/OpinionList";
import Loader from "@/components/ui/loader/Loader";
import ProfileNavigation from "@/components/profile/profileNavigation/ProfileNavigation";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import Link from "next/link";

export default function OpinionOverview() {
  const { data: opinions = [], isLoading } = useGetOpinionsQuery();

  return (
    <div className="opinion-overview">
      <div className="opinion-overview-profile-button">
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
      <div className="opinion-overview-profile-navigation">
        <ProfileNavigation />
      </div>
      <div className="user-opinions">
        <div className="user-opinions-header">
          Your opinions
          <span className="user-opinions-header-quantity">({opinions.length})</span>
        </div>
        <div>
          {isLoading ? (
            <div className="user-opinions-loader">
              <Loader />
            </div>
          ) : (
            <OpinionList opinions={opinions} />
          )}
        </div>
      </div>
    </div>
  );
}
