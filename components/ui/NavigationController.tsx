"use client";
import Link from "next/link";
import { useRef } from "react";

interface INavgiationController {
  categories: string[];
}
export default function NavigationController({
  categories,
}: INavgiationController) {
  const ref = useRef<HTMLDetailsElement | null>(null);
  return (
    <details ref={ref}>
      <summary className="text-base text-white">Kategori</summary>
      <ul className="z-50 rounded-t-none bg-[#55AD9B] p-2">
        {categories.map((category: string, i: number) => (
          <li
            key={i}
            className="text-white"
            onClick={() => {
              if (!ref.current) return;
              ref.current.open = false;
            }}
          >
            <Link href={`/category/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
