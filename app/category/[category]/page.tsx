import type { ArticleResponseType } from "@/app/types";
import { getArticlesByCategory } from "@/utils/notion-service";

import Container from "@/components/Container";
import ArticleCard from "@/components/ArticleCard";
import PaginationComponent from "@/components/PaginationComponent";

interface IPage {
  params: {
    category: string;
  };
  searchParams: {
    startCursor: string;
  };
}

const ITEMS_PER_PAGE = 6;
export const revalidate = 600; // revalidate every 10 minutes
export default async function Page({ params, searchParams }: IPage) {
  const category = params.category.replace(/\b./g, function (c) {
    return c.toUpperCase();
  });
  const response = (await getArticlesByCategory(
    category,
    searchParams.startCursor || undefined,
    ITEMS_PER_PAGE,
  )) as ArticleResponseType;
  const { articles, nextCursor, hasMore } = response;
  if (!articles.length) {
    return (
      <section className="flex min-h-[88dvh] w-full flex-col items-center justify-center">
        <h1 className="text-3xl">Kategori {category}</h1>
        <p>Maaf, belum ada artikel untuk saat ini...</p>
      </section>
    );
  }
  return (
    <Container className="my-10 flex flex-col items-center gap-3 max-sm:flex-col">
      <h1 className="text-3xl">Kategori {category}</h1>
      <main className="flex h-auto w-full flex-wrap justify-center gap-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </main>
      <PaginationComponent nextCursor={nextCursor} hasMore={hasMore} />
    </Container>
  );
}
