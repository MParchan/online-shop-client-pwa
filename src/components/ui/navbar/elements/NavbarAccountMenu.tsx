"use client";

import { logout } from "@/libs/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { cn } from "@/libs/twMerge.lib";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../button/Button";

export default function NavbarAccountMenu() {
  const [accountMenu, setAccountMenu] = useState(false);
  const { isLogged, userFirstName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/auth/")) {
      sessionStorage.setItem("path", pathname);
    }
  }, [pathname]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <li
      className="navbar-tile-list-item"
      onMouseEnter={() => setAccountMenu(true)}
      onMouseLeave={() => setAccountMenu(false)}
    >
      <Link href="/profile" className="navbar-tile">
        <Image
          src="/assets/icons/user.svg"
          alt="Account icon"
          width={32}
          height={32}
          className="navbar-tile-logo"
        />
        <p className="navbar-tile-text">Account</p>
      </Link>
      <div
        className={cn("account-menu-wrapper", {
          active: accountMenu
        })}
      >
        <div className="account-menu">
          {isLogged ? (
            <div>
              <header className="account-menu-header">Hello {userFirstName}</header>
              <div className="account-menu-list">
                <Link href="/profile">
                  <div className="account-menu-item">
                    <Image
                      src="/assets/icons/user.svg"
                      alt="Profile icon"
                      width={24}
                      height={24}
                      className="account-menu-item-icon"
                    ></Image>
                    <span className="account-menu-item-name">Profile</span>
                  </div>
                </Link>
                <Link href="/profile/orders">
                  <div className="account-menu-item">
                    <Image
                      src="/assets/icons/list_alt.svg"
                      alt="Orders icon"
                      width={24}
                      height={24}
                      className="account-menu-item-icon"
                    ></Image>
                    <span className="account-menu-item-name">Orders</span>
                  </div>
                </Link>
                <Link href="/profile/addresses">
                  <div className="account-menu-item">
                    <Image
                      src="/assets/icons/home_pin.svg"
                      alt="Addresses icon"
                      width={24}
                      height={24}
                      className="account-menu-item-icon"
                    ></Image>
                    <span className="account-menu-item-name">Addresses</span>
                  </div>
                </Link>
                <Link href="/profile/opinions">
                  <div className="account-menu-item">
                    <Image
                      src="/assets/icons/comment.svg"
                      alt="Comments icon"
                      width={24}
                      height={24}
                      className="w-[22px] h-auto mx-[1px]"
                    ></Image>
                    <span className="account-menu-item-name">Opinions</span>
                  </div>
                </Link>
              </div>
              <div>
                <Button variant="secondary" onClick={logoutHandler}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="login-button-wrapper">
                <Link href="/auth/login">
                  <Button variant="primary">Log In</Button>
                </Link>
              </div>
              <hr />
              <div className="signup-button-header-wrapper">
                <p className="signup-button-header">You dont have account?</p>
              </div>
              <div className="signup-button-wrapper">
                <Link href="/auth/register">
                  <Button variant="secondary">Sign up</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
