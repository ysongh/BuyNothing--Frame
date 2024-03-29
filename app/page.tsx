import Link from "next/link";
import { currentURL, vercelURL } from "./utils";
import { createDebugUrl } from "./debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Home",
    description: "Landing",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          vercelURL() || process.env.NEXT_PUBLIC_WEBURL
        )
      )),
    },
  };
}

export default async function Home() {
  const url = currentURL("/");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Buy Nothing Frame</h1>
        <p>
          A platform designed to facilitate community connections through gifting and sharing on Warpcast
        </p>
        <div className="flex space-x-4 mt-4">
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            href="/buynothing/items"
          >
            View Items
          </Link>
          <Link
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            href="/buynothing/create"
          >
            Create Post
          </Link>
          <Link
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            href={createDebugUrl(url)}
          >
            Debug
          </Link>
        </div>
      </div>
    </div>
  );
}