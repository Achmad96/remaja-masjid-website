import Link from "next/link";

import NavigationController from "./NavigationController";

import { getCategories } from "@/utils/notion-service";
import { ImageWithoutBlur } from "@/components/ui/ImageComponent";

export default async function Navbar() {
  const categories = await getCategories();
  return (
    <nav className="navbar z-[100] h-[12dvh] justify-between bg-[#55AD9B] px-7">
      <Link href={"/"} className="btn btn-ghost relative h-[3.5rem] w-16">
        <ImageWithoutBlur
          src={"/logo.png"}
          alt="logo"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 60vw, (max-width: 1280px) 60vw"
        />
      </Link>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-7 px-1">
          <li>
            <Link href={"/profile"} className="text-base text-white">
              Profil
            </Link>
          </li>
          <li>
            <NavigationController categories={categories} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
