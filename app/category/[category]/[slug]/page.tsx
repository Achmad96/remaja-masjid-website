import Markdown from "react-markdown";
import { notFound } from "next/navigation";

import type { ArticlePageType, ArticleType } from "@/app/types";
import { getSingleArticlePage } from "@/utils/notion-service";
import { type BlurResponseType, getBlurDataImage } from "@/app/actions";

import { ImageComponent, ImageContainer } from "@/components/ui/ImageComponent";

import AuthorBadge from "@/components/ui/AuthorBadge";
import Container from "@/components/ui/Container";

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
  const blurDataImage = await getBlurDataImage(article.cover);
  return (
    <Container className="mt-10">
      <div className="mb-10 flex w-full flex-col gap-3 max-sm:pl-5">
        <ImageContainer className={"mx-auto h-auto w-[80%] max-md:w-[90%]"}>
          <ImageComponent
            className={"h-96 w-full rounded-3xl border-2"}
            blurDataImage={blurDataImage as BlurResponseType}
          />
        </ImageContainer>
        <div className="ml-[10%] flex flex-col gap-3 max-sm:ml-[5%] max-sm:w-[90%]">
          <h1 className="mt-7 text-5xl max-sm:text-3xl">{article.title}</h1>
          <p>Terakhir update pada tanggal {article.updatedAt}</p>
          <AuthorBadge author={article.author} />
        </div>
      </div>
      <div className="flex h-auto w-full items-center justify-center">
        {markdown.parent ? (
          <article className="prose mx-auto mb-10 max-w-[80%]">
            <Markdown>{markdown.parent}</Markdown>
          </article>
        ) : (
          <p>Tidak ada isinya untuk saat ini.</p>
        )}
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
