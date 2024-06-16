import { type BlurResponseType, getBlurDataImage } from "@/app/actions";
import type { ArticlePageType, ArticleType } from "@/app/types";

import { notFound } from "next/navigation";
import { getSingleArticlePage } from "@/utils/notion-service";

import Image from "next/image";

import Markdown from "react-markdown";
import AuthorBadge from "@/components/AuthorBadge";
import Container from "@/components/Container";

export const revalidate = 600; // revalidate the data every 10 minutes
export const dynamicParams = true;

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { article, markdown } = (await getSingleArticlePage(
    params.slug,
  )) as ArticlePageType;
  if (!article || !markdown) return notFound();
  const res = await getBlurDataImage(article.cover);
  const { img, base64 } = res as BlurResponseType;
  return (
    <Container className="mt-10">
      <div className="mb-10 flex w-full flex-col gap-3 max-sm:pl-5">
        <div className="mx-auto h-auto w-[80%] max-md:w-[90%]">
          <Image
            {...img}
            alt="cover"
            loading="lazy"
            blurDataURL={base64}
            placeholder="blur"
            className="h-96 w-full rounded-3xl border-2"
          />
        </div>
        <div className="ml-[10%] flex flex-col gap-3 max-sm:ml-[5%] max-sm:w-[90%]">
          <h1 className="mt-7 text-5xl max-sm:text-3xl">{article.title}</h1>
          <p>Terakhir update pada tanggal {article.updatedAt}</p>
          <AuthorBadge author={article.author} />
        </div>
      </div>
      <div className="flex h-auto w-full items-center justify-center">
        <article className="prose mx-auto mb-10 max-w-[80%]">
          {markdown.parent ? (
            <Markdown>{markdown.parent}</Markdown>
          ) : (
            <p>Tidak ada isinya untuk saat ini.</p>
          )}
        </article>
      </div>
    </Container>
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { article }: { article: ArticleType } = (await getSingleArticlePage(
    params.slug,
  )) as { article: ArticleType };
  if (!article) notFound();
  return { title: `Artikel - ${article.title}` };
};
