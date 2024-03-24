import type { Metadata } from "next";

import PrivyProvider from "../utils/PrivyProvider";
import Navbar from "../utils/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: "frames.js starter",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PrivyProvider>
          <Navbar />
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
