import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex h-[10dvh] w-full items-center justify-center gap-5 bg-[#55AD9B]">
      <Link
        className="flex items-center gap-2 text-white"
        href={
          "https://www.instagram.com/remas.nurulhaqq?igsh=MWwyOWkyazFlYzN6Mg=="
        }
      >
        <FaInstagram className="h-7 w-7" />
        <span className="text-sm">remas.nurulhaqq</span>
      </Link>
      <Link
        className="flex items-center gap-2 text-white"
        href={"https://www.tiktok.com/@remas.nurulhaqq?_t=8nUSx7yl1es&_r=1"}
      >
        <FaTiktok className="h-7 w-7" />
        <span className="text-sm">remas.nurulhaqq</span>
      </Link>
    </footer>
  );
}
