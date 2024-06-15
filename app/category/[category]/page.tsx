import ArticleCard from '@/components/ArticleCard';

import type { ArticleType } from '@/app/types';
import { getArticlesByCategory } from '@/utils/notion-service';

interface IPage {
  params: {
    category: string;
  };
}

export const revalidate = 600; // revalidate every 10 minutes
export default async function Page({ params }: IPage) {
  const category = params.category.replace(/\b./g, function (c) {
    return c.toUpperCase();
  });
  const response = (await getArticlesByCategory(category)) as ArticleType[];
  if (!response.length) {
    return (
      <section className="h-dvh w-full justify-center items-center flex">
        <p>Maaf, belum ada artikel untuk saat ini...</p>
      </section>
    );
  }
  return (
    <section className="flex h-auto min-h-dvh w-full items-center justify-center gap-3 max-sm:my-10 max-sm:flex-col">
      {response.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
}
