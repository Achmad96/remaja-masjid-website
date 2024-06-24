import Markdown from "react-markdown";
import { notFound } from "next/navigation";

import type { ArticlePageType, ArticleType } from "@/app/types";
import { getSingleArticlePage } from "@/utils/notion-service";
import { type BlurImageDataType, getBlurImageData } from "@/app/actions";

import { ImageWithBlur, ImageContainer } from "@/components/ui/ImageComponent";

import Container from "@/components/ui/Container";

import { MdStringObject } from "notion-to-md/build/types";

export const revalidate = 600; // revalidate the data every 10 minutes
export const dynamicParams = true;

interface PageProps {
  params: { slug: string };
}

function HeaderArticleSection({
  article,
  blurImageData,
}: {
  article: ArticleType;
  blurImageData: BlurImageDataType;
}) {
  const { title, author, updatedAt } = article;
  return (
    <section className="mb-10 flex w-full flex-col gap-3 max-sm:pl-5">
      <ImageContainer className={"mx-auto h-auto w-[80%] max-md:w-[90%]"}>
        <ImageWithBlur
          alt={"header-image"}
          className={"h-96 w-full rounded-3xl border-2"}
          blurImageData={blurImageData}
        />
      </ImageContainer>
      <div className="ml-[10%] flex flex-col gap-3 max-sm:ml-[5%] max-sm:w-[90%]">
        <h1 className="mt-7 text-5xl max-sm:text-3xl">{title}</h1>
        <p>Terakhir update pada tanggal {updatedAt}</p>
        <p>{author}</p>
      </div>
    </section>
  );
}

function ArticleSection({ markdown }: { markdown: MdStringObject }) {
  return (
    <section className="flex h-auto w-full items-center">
      {markdown.parent ? (
        <article className="prose mb-10 ml-[10%] max-w-[80%]">
          <Markdown>{markdown.parent}</Markdown>
        </article>
      ) : (
        <p>Tidak ada isinya untuk saat ini.</p>
      )}
    </section>
  );
}

export default async function Page({ params }: PageProps) {
  const { article, markdown } = (await getSingleArticlePage(
    params.slug,
  )) as ArticlePageType;
  if (!article || !markdown) return notFound();
  const blurImageData = (await getBlurImageData(
    article.cover,
  )) as BlurImageDataType;
  return (
    <Container className="mt-10">
      <HeaderArticleSection article={article} blurImageData={blurImageData} />
      <ArticleSection markdown={markdown} />
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
