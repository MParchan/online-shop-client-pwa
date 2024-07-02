"use client";

import Image from "next/image";
import { useState } from "react";

export default function NavbarHamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="hamburger-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image
          src="/assets/icons/menu.svg"
          alt="Menu logo"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
      </div>
      <div className={`hamburger-menu ${isMenuOpen ? "open" : "close"}`}>
        <div className="hamburger-menu-header">
          <div className="hamburger-menu-close-icon" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/assets/icons/close.svg"
              alt="Close logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </div>
        </div>
        <p>AAA</p>
      </div>
    </>
  );
}
