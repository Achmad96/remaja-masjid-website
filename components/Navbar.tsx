import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/utils/notion-service";

export default async function Navbar() {
  const categories = await getCategories();
  return (
    <nav className="navbar z-[100] h-[12dvh] justify-between bg-[#55AD9B] px-7">
      <Link href={"/"} className="btn btn-ghost relative h-[3.5rem] w-16">
        <Image
          src={"/logo.png"}
          alt="logo"
          fill={true}
          priority={true}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 60vw, (max-width: 1280px) 60vw"
        />
      </Link>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-7 px-1">
          <li>
            <Link href={"/profil"} className="text-base text-white">
              Profil
            </Link>
          </li>
          <li>
            <details>
              <summary className="text-base text-white">Kategori</summary>
              <ul className="z-50 rounded-t-none bg-[#55AD9B] p-2">
                {categories.map((category: string, i: number) => (
                  <li key={i} className="text-white">
                    <Link href={`/category/${category.toLowerCase()}`}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}
