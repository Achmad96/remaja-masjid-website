import Image from 'next/image';
import Link from 'next/link';

import { ArticleType } from '@/app/types';

interface IArticleCard {
  article: ArticleType;
}

export default function ArticleCard({ article }: IArticleCard) {
  const { title, description, cover, author, updatedAt } = article;
  return (
    <Link
      href={`/category/${article.category.toLowerCase()}/${article.slug}`}
      className="card card-compact w-96 min-w-96 bg-base-100 shadow-xl rounded-lg"
    >
      <figure className="h-72">
        <img src={cover} alt={title} />
      </figure>
      <div className="card-body min-h-40">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="card-actions items-center justify-between px-5">
        <p>{updatedAt}</p>
        {author && (
          <div className="flex p-3 items-center justify-between gap-2">
            <div className="relative w-5 h-5">
              <Image
                className="rounded-full"
                src={author.avatar}
                alt={author.name}
                fill={true}
                sizes="(max-width: 640px) 20vw, (max-width: 768px) 30vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw"
              />
            </div>
            <p className="text-sm">{author.name}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
