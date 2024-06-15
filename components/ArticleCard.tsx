import Link from 'next/link';
import Image from 'next/image';

import { ArticleType } from '@/app/types';
import { BlurResponseType, getBlurDataImage } from '@/app/actions';

interface IArticleCard {
  article: ArticleType;
}

export default async function ArticleCard({ article }: IArticleCard) {
  const { title, description, cover, createdAt } = article;
  const blurDataImage = await getBlurDataImage(cover);
  const { img, base64 } = blurDataImage as BlurResponseType;
  return (
    <Link
      href={`/category/${article.category.toLowerCase()}/${article.slug}`}
      className="card card-compact h-[32rem] w-96 max-w-96 bg-base-100 shadow-xl rounded-lg"
    >
      <figure className="h-72 max-h-72">
        <Image {...img} alt={title} blurDataURL={base64} placeholder="blur" />
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
