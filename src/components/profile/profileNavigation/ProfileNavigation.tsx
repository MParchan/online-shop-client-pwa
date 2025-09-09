"use client";

import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { logout } from "@/libs/redux/features/auth/authSlice";

export default function ProfileNavigation() {
  const { userFirstName, userRole } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const navigationItems =
    userRole === "Admin"
      ? [
          { href: "/profile", name: "Profile", icon: "/assets/icons/user.svg" },
          { href: "/profile/orders", name: "Orders", icon: "/assets/icons/list_alt.svg" },
          { href: "/profile/addresses", name: "Addresses", icon: "/assets/icons/home_pin.svg" },
          { href: "/profile/opinions", name: "Opinions", icon: "/assets/icons/comment.svg" },
          { href: "/admin/orders", name: "All orders", icon: "/assets/icons/list_alt.svg" }
        ]
      : [
          { href: "/profile", name: "Profile", icon: "/assets/icons/user.svg" },
          { href: "/profile/orders", name: "Orders", icon: "/assets/icons/list_alt.svg" },
          { href: "/profile/addresses", name: "Addresses", icon: "/assets/icons/home_pin.svg" },
          { href: "/profile/opinions", name: "Opinions", icon: "/assets/icons/comment.svg" }
        ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="profile-navigation">
      <div className="profile-navigation-header">Hello {userFirstName}</div>
      <div className="profile-navigation-list">
        {navigationItems.map((item) => (
          <Link href={item.href} key={item.name}>
            <div className="profile-navigation-item">
              <Image
                src={item.icon}
                alt={`${item.name} icon`}
                width={24}
                height={24}
                className={`${item.href === "/profile/opinions" ? "w-[22px] h-[22px] mx-[1px]" : ".profile-navigation-item-icon"}`}
              />
              <span
                className={`profile-navigation-item-name ${pathname === item.href ? "active" : ""}`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
        <div className="w-full flex flex-row justify-center mt-8">
          <div className="w-1/2">
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
