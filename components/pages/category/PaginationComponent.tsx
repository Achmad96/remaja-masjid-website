"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArticleType } from "@/app/types";

interface IPaginationComponents {
  category: string;
  articles: ArticleType[];
  nextCursor: string | null;
  hasMore: boolean;
}

const PREV_CURSORS_NAME = "previousCursors";

export default function PaginationComponent({
  category,
  articles,
  nextCursor,
  hasMore,
}: IPaginationComponents) {
  const router = useRouter();
  const startCursorArticle = articles[0]?.id || "";
  const [prevCursors, setPrevCursors] = useState<string[]>([]);

  useEffect(() => {
    if (!window) return;
    const storedCursors = localStorage.getItem(PREV_CURSORS_NAME);
    const data = storedCursors ? JSON.parse(storedCursors) : [];
    setPrevCursors(data);

    const handleDelete = () => {
      localStorage.setItem(PREV_CURSORS_NAME, "[]");
    };

    window.addEventListener("beforeunload", handleDelete);
    return () => window.removeEventListener("beforeunload", handleDelete);
  }, []);

  useEffect(() => {
    setPrevCursors([]);
    localStorage.setItem(PREV_CURSORS_NAME, "[]");
  }, [category]);

  useEffect(() => {
    localStorage.setItem(PREV_CURSORS_NAME, JSON.stringify(prevCursors));
  }, [prevCursors]);

  const handlePreviousClick = () => {
    const lastIndex = prevCursors.length - 1;
    router.replace(`?startCursor=${prevCursors[lastIndex]}`);
    setPrevCursors((prev) => prev.slice(0, lastIndex));
  };

  const handleNextClick = () => {
    if (prevCursors.includes(startCursorArticle)) return;
    setPrevCursors((prev) => [...prev, startCursorArticle]);
    router.replace(`?startCursor=${nextCursor}`);
  };

  return (
    <div className="join grid grid-cols-2">
      <button
        disabled={prevCursors.length < 1}
        className={`btn btn-outline join-item ${prevCursors.length < 1 && "btn-disabled"}`}
        onClick={handlePreviousClick}
      >
        Previous
      </button>
      <button
        className={`btn btn-outline join-item ${!hasMore && "btn-disabled"}`}
        disabled={!hasMore}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}
