import type { Metadata } from "next";
import CartOverview from "@/components/shoppingCart/cartOverview/CartOverview";

export const metadata: Metadata = {
  title: "Shopping cart",
  description: "Your shopping cart"
};

export default async function CartPage() {
  return (
    <>
      <CartOverview />
    </>
  );
}
