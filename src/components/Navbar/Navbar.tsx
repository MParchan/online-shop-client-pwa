import Image from "next/image";
import NavbarCategories from "./elements/NavbarCategories";
import { Category } from "@/types/models/category.types";
import NavbarSearchBar from "./elements/NavbarSearchBar";
import NavbarAccountMenu from "./elements/NavabrAccountMenu";

export default async function Navbar() {
  const res = await fetch("http://localhost:5001/api/v1/categories");
  const categories: Category[] = await res.json();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-wrapper">
          <a href="/" className="navbar-logo">
            <Image src="/assets/icons/logo.svg" alt="Online shop logo" width={48} height={48} />
            <span className="navbar-logo-text">Online shop</span>
          </a>
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
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu logo"
            width={32}
            height={32}
            className="navbar-menu-icon"
          />
          <div className="navbar-search-bar-wrapper">
            <NavbarSearchBar categories={categories} />
          </div>
        </div>
        <NavbarCategories categories={categories} />
      </nav>
      <div className="overlay" id="overlay"></div>
    </>
  );
}
