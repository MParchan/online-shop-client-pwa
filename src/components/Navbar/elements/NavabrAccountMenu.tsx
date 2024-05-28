"use client";

import { cn } from "@/libs/twMerge.lib";
import Image from "next/image";
import { useState } from "react";

export default function NavbarAccountMenu() {
  const [accountMenu, setAccountMenu] = useState(false);

  const handleMouseEnter = () => {
    setAccountMenu(true);
  };

  const handleMouseLeave = () => {
    setAccountMenu(false);
  };

  return (
    <li onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
      <a href="/">
        <Image src="/assets/icons/user.svg" alt="Account" width={32} height={32} />
        Account
      </a>
      <div
        className={cn("account-menu", {
          active: accountMenu
        })}
      >
        <a>Log In</a>
        <a>Sign Up</a>
      </div>
    </li>
  );
}
