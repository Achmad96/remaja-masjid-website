"use client";
import { useRouter } from "next/navigation";

interface IPaginationComponents {
  nextCursor: string | null;
  prevCursor: string | null;
  hasMore: boolean;
}

export default function PaginationComponent({
  nextCursor,
  hasMore,
  prevCursor,
}: IPaginationComponents) {
  const router = useRouter();
  return (
    <div className="join grid grid-cols-2">
      <button
        className="btn btn-outline join-item"
        onClick={() => {
          if (!prevCursor) return;
          router.replace(`?startCursor=${prevCursor}`);
        }}
      >
        Previous
      </button>
      <button
        className={`btn btn-outline join-item ${!hasMore && "btn-disabled"}`}
        onClick={() => {
          if (!hasMore) return;
          router.replace(`?prevCursor=${prevCursor}&startCursor=${nextCursor}`);
        }}
      >
        Next
      </button>
    </div>
  );
}
