import Image from "next/image";
import NavbarCategories from "./parts/NavbarCategories";
import { Category } from "@/types/models/category.types";
import SearchBar from "./parts/SearchBar";

export default async function Navbar() {
  const res = await fetch("http://localhost:5001/api/v1/categories");
  const categories: Category[] = await res.json();

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <a href="/">
          <Image src="/assets/icons/logo.svg" alt="Online shop logo" width={48} height={48} />
          <span>Online shop</span>
        </a>
        <SearchBar categories={categories} />
        <ul>
          <li>
            <Image src="/assets/icons/contact.svg" alt="Contact logo" width={32} height={32} />
            <span>Contact</span>
          </li>
          <li>
            <Image src="/assets/icons/user.svg" alt="Account" width={32} height={32} />
            <span>Account</span>
          </li>
          <li>
            <Image src="/assets/icons/cart.svg" alt="Cart logo" width={32} height={32} />
            <span>Cart</span>
          </li>
        </ul>
      </div>
      <NavbarCategories categories={categories} />
    </nav>
  );
}
