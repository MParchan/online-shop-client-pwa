"use client";

import { cn } from "@/libs/twMerge.lib";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavbarAccountMenu() {
  const [accountMenu, setAccountMenu] = useState(false);

  return (
    <li
      className="navbar-tile-list-item"
      onMouseEnter={() => setAccountMenu(true)}
      onMouseLeave={() => setAccountMenu(false)}
    >
      <Link href="/" className="navbar-tile">
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
          <div>
            <div className="login-button-wrapper">
              <Link href="/auth/login">
                <button className="login-button">Log In</button>
              </Link>
            </div>
            <hr />
            <div className="signup-button-header-wrapper">
              <p className="signup-button-header">You dont have account?</p>
            </div>
            <div className="signup-button-wrapper">
              <Link href="/auth/register">
                <button className="signup-button">Sign up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
