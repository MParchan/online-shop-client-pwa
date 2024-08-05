"use client";
import Image from "next/image";
import NavbarCategories from "./elements/NavbarCategories";
import { Category } from "@/types/models/category.types";
import NavbarSearchBar from "./elements/NavbarSearchBar";
import NavbarAccountMenu from "./elements/NavabrAccountMenu";
import Link from "next/link";
import NavbarHamburgerMenu from "./elements/NavbarHamburgerMenu";
import { useEffect, useState } from "react";

interface NavbarProps {
  categories: Category[];
}
export default function Navbar({ categories }: NavbarProps) {
  const [bottomPartHidden, setBottomPartHidden] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setBottomPartHidden(true);
      } else {
        setBottomPartHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar ${bottomPartHidden ? "shadow" : ""} ${hamburgerMenuOpen ? "hamburgerOpen" : ""}`}
      >
        <div className="navbar-wrapper">
          <Link href="/" className="navbar-logo">
            <Image
              src="/assets/icons/logo.svg"
              alt="Online shop logo"
              width={48}
              height={48}
              priority={true}
            />
            <span className="navbar-logo-text">Online shop</span>
          </Link>
          <div className="navbar-search-bar-wrapper">
            <NavbarSearchBar categories={categories} />
          </div>
          <ul className="navbar-tile-list">
            <li className="navbar-tile-list-item">
              <a className="navbar-tile">
                <Image
                  src="/assets/icons/contact.svg"
                  alt="Contact logo"
                  width={32}
                  height={32}
                  className="navbar-tile-logo"
                />
                <p className="navbar-tile-text">Contact</p>
              </a>
            </li>
            <NavbarAccountMenu />
            <li className="navbar-tile-list-item">
              <a className="navbar-tile">
                <Image
                  src="/assets/icons/cart.svg"
                  alt="Cart logo"
                  width={32}
                  height={32}
                  className="navbar-tile-logo"
                />
                <p className="navbar-tile-text">Cart</p>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`navbar-bottom-part ${bottomPartHidden ? "hid" : ""}`}>
        <div className="navbar-wrapper-responive">
          <NavbarHamburgerMenu
            categories={categories}
            hamburgerMenuOpen={hamburgerMenuOpen}
            setHamburgerMenuOpen={setHamburgerMenuOpen}
          />
          <div className="navbar-search-bar-wrapper">
            <NavbarSearchBar categories={categories} isHidden={bottomPartHidden} />
          </div>
        </div>
        <NavbarCategories categories={categories} isHidden={bottomPartHidden} />
      </div>
    </>
  );
}
