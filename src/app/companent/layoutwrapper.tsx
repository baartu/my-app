// app/companent/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navbarVariant = pathname === "/services" ? "transparent" : "default";

  return (
    <>
      <Navbar variant={navbarVariant} />
      {children}
    </>
  );
}
