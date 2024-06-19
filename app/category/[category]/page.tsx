import Link from "next/link";
import Container from "@/components/ui/Container";
import ArticleCard from "@/components/pages/category/ArticleCard";
import PaginationComponent from "@/components/pages/category/PaginationComponent";

import type { ArticleResponseType } from "@/app/types";
import { getArticlesByCategory } from "@/utils/notion-service";
import { getSubCategory, formatCategory } from "@/utils/format-util";

const ARTICLES_PER_PAGE = 6; // Maximum number of articles per page
export const revalidate = 600; // revalidate every 10 minutes
export const dynamicParams = true;

function BreadCrumbs({ category }: { category: string }) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <a>{category}</a>
        </li>
      </ul>
    </div>
  );
}

function EmptyArticle({ category }: { category: string }) {
  return (
    <Container className="flex flex-col items-center justify-center">
      <h1 className="text-3xl max-sm:text-xl">Kategori {category}</h1>
      <p>Maaf, belum ada artikel untuk saat ini...</p>
    </Container>
  );
}

interface IPage {
  params: {
    category: string;
  };
  searchParams: {
    prevCursor: string;
    startCursor: string;
  };
}
export default async function Page({ params, searchParams }: IPage) {
  const { startCursor } = searchParams;
  const category = formatCategory(params.category);
  const subCategory = getSubCategory(category);
  const response = (await getArticlesByCategory(
    category,
    startCursor || undefined,
    ARTICLES_PER_PAGE,
  )) as ArticleResponseType;
  const { articles, nextCursor, hasMore } = response;
  if (!articles.length) return <EmptyArticle category={category} />;
  return (
    <Container className="my-10 flex flex-col items-center gap-3 max-sm:flex-col">
      <h1 className="text-3xl max-sm:text-xl">
        Kategori {category || subCategory}
      </h1>
      <BreadCrumbs category={subCategory || category} />
      <main className="flex h-auto w-full flex-wrap justify-center gap-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </main>
      <PaginationComponent
        category={category}
        articles={articles}
        nextCursor={nextCursor}
        hasMore={hasMore}
      />
    </Container>
  );
}
