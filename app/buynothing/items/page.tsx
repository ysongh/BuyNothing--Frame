import Link from "next/link";
import { currentURL, vercelURL } from "../../utils";
import { createDebugUrl } from "../../debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

import { getAllItem } from "../../../utils/supabase";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "List of Items",
    description: "This show the list of items",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/buynothing/items/frames",
          vercelURL() || process.env.NEXT_PUBLIC_WEBURL
        )
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("/buynothing/items");

  const items = await getAllItem();

  return (
    <div>
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">List of Items</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map(item => (
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden mb-4">
              <Link href={`/buynothing/item/${item.id}`}>
                <img
                  src={item.image_url}
                  alt="Item"
                  className="w-full h-48 object-cover object-center"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
