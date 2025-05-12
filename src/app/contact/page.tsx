import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div>Mail: online@shop.com</div>
      <div>Phone number: +00 000 000 000</div>
    </div>
  );
}
