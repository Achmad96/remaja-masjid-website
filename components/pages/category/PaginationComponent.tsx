"use client";
import { ArticleType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IPaginationComponents {
  articles: ArticleType[];
  nextCursor: string | null;
  hasMore: boolean;
}

const previousCursorsName = "previousCursors";
export default function PaginationComponent({
  articles,
  nextCursor,
  hasMore,
}: IPaginationComponents) {
  const router = useRouter();
  const startCursorArticle = articles[0].id;
  const [prevCursor, setPrevCursor] = useState<string[]>([]);
  useEffect(() => {
    if (!window) return;
    const handleDelete = (_: BeforeUnloadEvent) => {
      localStorage.setItem(previousCursorsName, `[]`);
    };
    window.addEventListener("beforeunload", handleDelete);
    return () => window.removeEventListener("beforeunload", handleDelete);
  }, []);

  useEffect(() => {
    localStorage.setItem(previousCursorsName, JSON.stringify(prevCursor));
  }, [prevCursor]);
  return (
    <div className="join grid grid-cols-2">
      <button
        className={`btn btn-outline join-item ${prevCursor.length < 1 && "btn-disabled"}`}
        onClick={() => {
          if (prevCursor.length < 1) return;
          const lastIndex = prevCursor.length - 1;
          router.replace(`?startCursor=${prevCursor[lastIndex]}`);
          setPrevCursor((prev) => prev.slice(0, lastIndex));
        }}
      >
        Previous
      </button>
      <button
        className={`btn btn-outline join-item ${!hasMore && "btn-disabled"}`}
        onClick={() => {
          if (!hasMore) return;
          setPrevCursor((prev) => [...prev, startCursorArticle]);
          router.replace(`?startCursor=${nextCursor}`);
        }}
      >
        Next
      </button>
    </div>
  );
}
