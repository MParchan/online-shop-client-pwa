import { Metadata } from "next";
import { redirect } from "next/navigation";

interface SearchProps {
  searchParams?: { [key: string]: string | undefined };
}

export async function generateMetadata({ searchParams }: SearchProps): Promise<Metadata> {
  if (!searchParams?.q || searchParams?.q === "") {
    redirect("/");
  }
  return {
    title: `Searching - ${searchParams?.q}`
  };
}

export default function SearchPage({ searchParams }: SearchProps) {
  return <div>{searchParams?.q}</div>;
}
