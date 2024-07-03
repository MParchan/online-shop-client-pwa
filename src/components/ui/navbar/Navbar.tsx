import Image from "next/image";
import NavbarCategories from "./elements/NavbarCategories";
import { Category } from "@/types/models/category.types";
import NavbarSearchBar from "./elements/NavbarSearchBar";
import NavbarAccountMenu from "./elements/NavabrAccountMenu";
import Link from "next/link";
import categoriesService from "@/api/services/categoriesService";
import NavbarHamburgerMenu from "./elements/NavbarHamburgerMenu";

export default async function Navbar() {
  const categories: Category[] = await categoriesService.getSubcategories();

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <Link href="/" className="navbar-logo">
          <Image src="/assets/icons/logo.svg" alt="Online shop logo" width={48} height={48} />
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
      <div className="navbar-wrapper-responive">
        <NavbarHamburgerMenu categories={categories} />
        <div className="navbar-search-bar-wrapper">
          <NavbarSearchBar categories={categories} />
        </div>
      </div>
      <NavbarCategories categories={categories} />
    </nav>
  );
}
