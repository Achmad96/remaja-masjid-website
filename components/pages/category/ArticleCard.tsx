import Link from "next/link";

import { ArticleType } from "@/app/types";
import { BlurImageDataType, getBlurImageData } from "@/app/actions";
import { ImageWithBlur } from "@/components/ui/ImageComponent";

interface IArticleCard {
  article: ArticleType;
}

export default async function ArticleCard({ article }: IArticleCard) {
  const { title, description, slug, category, cover, createdAt } = article;
  const blurImageData = (await getBlurImageData(cover)) as BlurImageDataType;
  return (
    <Link
      href={`/category/${category.toLowerCase()}/${slug}`}
      className="card card-compact h-[32rem] w-96 max-w-96 rounded-lg border bg-base-100 shadow-2xl"
    >
      <figure>
        <ImageWithBlur
          alt={title}
          blurImageData={blurImageData}
          style={{
            height: "20rem",
          }}
        />
      </figure>
      <div className="card-body min-h-40">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="card-actions items-center justify-between px-5 py-3">
        <p>{createdAt}</p>
      </div>
    </Link>
  );
}
