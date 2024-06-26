import { ArticlePageType } from "@/app/types";
import { getSingleArticlePage } from "@/utils/notion-service";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Image Cover";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: any) {
  const { article } = (await getSingleArticlePage(
    params.slug,
  )) as ArticlePageType;
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          backgroundImage: `url('${article.cover}')`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    ),
  );
}
