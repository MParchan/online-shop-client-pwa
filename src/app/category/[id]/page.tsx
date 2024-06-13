"use client";
import { useParams } from "next/navigation";

export default function CategoryId() {
  const params = useParams();
  return <div>Category {params.id}</div>;
}
