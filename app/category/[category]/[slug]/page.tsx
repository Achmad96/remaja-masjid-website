import Image from 'next/image';
import { type BlurResponseType, getBlurDataImage } from '@/app/actions';

import { notFound } from 'next/navigation';
import { getSingleArticlePage } from '@/utils/notion-service';
import type { ArticlePageType, ArticleType } from '@/app/types';

import Markdown from 'react-markdown';

export const revalidate = 600; // revalidate the data every 10 minutes
export const dynamicParams = true;

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { article, markdown } = (await getSingleArticlePage(
    params.slug
  )) as ArticlePageType;
  if (!article || !markdown) return notFound();
  const res = await getBlurDataImage(article.cover);
  if (!res) {
    return (
      <main className="min-h-dvh h-auto w-full">
        <h1 className="mt-7 text-5xl max-sm:text-4xl">{article.title}</h1>
        <p>Terakhir update per tanggal {article.updatedAt}</p>
        <div className="flex h-auto w-full items-center justify-center">
          <article className="prose mx-auto mb-10 max-w-[80%]">
            {markdown.parent ? (
              <Markdown>{markdown.parent}</Markdown>
            ) : (
              <p>The content doesn't exist</p>
            )}
          </article>
        </div>
      </main>
    );
  }
  const { img, base64 } = res as BlurResponseType;
  return (
    <main className="min-h-dvh h-auto w-full mt-10">
      <div className="mb-10 flex w-full flex-col gap-3 max-sm:pl-5">
        <div className="h-auto w-[80%] mx-auto">
          <Image
            {...img}
            alt="cover"
            loading="lazy"
            blurDataURL={base64}
            placeholder="blur"
            className="h-96 w-full rounded-3xl"
          />
        </div>
        <div className="ml-[10%] flex flex-col gap-3">
          <h1 className="mt-7 text-5xl max-sm:text-4xl">{article.title}</h1>
          <p>Terakhir update per tanggal {article.updatedAt}</p>
        </div>
      </div>
      <div className="flex h-auto w-full items-center justify-center">
        <article className="prose prose-p:text-justify mx-auto mb-10 max-w-[80%]">
          {markdown.parent ? (
            <Markdown>{markdown.parent}</Markdown>
          ) : (
            <p>The content doesn't exist</p>
          )}
        </article>
      </div>
    </main>
  );
}

export const generateMetadata = async ({
  params
}: {
  params: { slug: string };
}) => {
  const { article }: { article: ArticleType } = (await getSingleArticlePage(
    params.slug
  )) as { article: ArticleType };
  if (!article) notFound();
  return { title: `Artikel - ${article.title}` };
};
