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
          <a href="/">
            <Image src="/assets/icons/logo.svg" alt="Online shop logo" width={48} height={48} />
            <span>Online shop</span>
          </a>
          <NavbarSearchBar categories={categories} />
          <ul>
            <li>
              <a>
                <Image src="/assets/icons/contact.svg" alt="Contact logo" width={32} height={32} />
                Contact
              </a>
            </li>
            <NavbarAccountMenu />
            <li>
              <a>
                <Image src="/assets/icons/cart.svg" alt="Cart logo" width={32} height={32} />
                Cart
              </a>
            </li>
          </ul>
        </div>
        <NavbarCategories categories={categories} />
      </nav>
      <div className="overlay" id="overlay"></div>
    </>
  );
}
