import Link from "next/link";
import Image from "next/image";

import { ArticleType } from "@/app/types";
import { BlurResponseType, getBlurDataImage } from "@/app/actions";

interface IArticleCard {
  article: ArticleType;
}

export default async function ArticleCard({ article }: IArticleCard) {
  const { title, description, slug, category, cover, createdAt } = article;
  const blurDataImage = await getBlurDataImage(cover);
  const { img, base64 } = blurDataImage as BlurResponseType;
  return (
    <Link
      href={`/category/${category.toLowerCase()}/${slug}`}
      className="card card-compact h-[32rem] w-96 max-w-96 rounded-lg border bg-base-100 shadow-2xl"
    >
      <figure className="relative h-80">
        <Image
          src={img.src}
          alt={title}
          fill={true}
          blurDataURL={base64}
          placeholder="blur"
          sizes="(max-width: 640px) 60vw, (max-width: 768px) 60vw, (max-width: 1024px) 80vw, (max-width: 1280px) 100vw"
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
