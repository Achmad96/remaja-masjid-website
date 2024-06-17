"use client";
import { ArticleType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IPaginationComponents {
  articles: ArticleType[];
  nextCursor: string | null;
  hasMore: boolean;
}

const prevCursorsName = "previousCursors";
export default function PaginationComponent({
  articles,
  nextCursor,
  hasMore,
}: IPaginationComponents) {
  const router = useRouter();
  const startCursorArticle = articles[0].id;
  const [prevCursors, setPrevCursors] = useState<string[]>([]);
  useEffect(() => {
    if (!window) return;
    const data = JSON.parse(
      localStorage.getItem(prevCursorsName) as string,
    ) as string[];
    setPrevCursors((prev) => [...prev, ...data]);
    const handleDelete = (_: BeforeUnloadEvent) => {
      localStorage.setItem(prevCursorsName, "[]");
    };
    window.addEventListener("beforeunload", handleDelete);
    return () => window.removeEventListener("beforeunload", handleDelete);
  }, []);
  useEffect(() => {
    localStorage.setItem(prevCursorsName, JSON.stringify(prevCursors));
  }, [prevCursors]);
  return (
    <div className="join grid grid-cols-2">
      <button
        disabled={prevCursors.length < 1}
        className={`btn btn-outline join-item ${prevCursors.length < 1 && "btn-disabled"}`}
        onClick={() => {
          const lastIndex = prevCursors.length - 1;
          router.replace(`?startCursor=${prevCursors[lastIndex]}`);
          setPrevCursors((prev) => prev.slice(0, lastIndex));
        }}
      >
        Previous
      </button>
      <button
        className={`btn btn-outline join-item ${!hasMore && "btn-disabled"}`}
        disabled={!hasMore}
        onClick={() => {
          if (prevCursors.includes(startCursorArticle)) return;
          setPrevCursors((prev) => [...prev, startCursorArticle]);
          router.replace(`?startCursor=${nextCursor}`);
        }}
      >
        Next
      </button>
    </div>
  );
}
