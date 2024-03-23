import Link from "next/link";
import { currentURL, vercelURL } from "../../utils";
import { createDebugUrl } from "../../debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "List of Items",
    description: "This show the list of items",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/buynothing/items/frames",
          process.env.NEXT_PUBLIC_WEBURL || vercelURL()
        )
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("/buynothing/items");

  return (
    <div>
      List of Items
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
    </div>
  );
}
