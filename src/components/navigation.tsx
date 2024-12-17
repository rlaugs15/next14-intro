"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <ul className="flex justify-between items-center p-10 bg-teal-500">
      <Link href="/">홈{path === "/" ? "😁" : ""}</Link>
      <Link href="/about-kr">About Kr{path === "/about-kr" ? "😁" : ""}</Link>
    </ul>
  );
}
