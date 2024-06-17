import Image from "next/image";
import { AuthorType } from "@/app/types";
import { IoPersonCircle } from "react-icons/io5";

interface IAuthorBadge {
  author: AuthorType;
}

export default function AuthorBadge({ author }: IAuthorBadge) {
  return (
    <div className="flex items-center gap-2">
      {author.avatar ? (
        <div className="relative h-8 w-8">
          <Image
            className="rounded-full"
            src={author.avatar}
            alt={author.name}
            fill={true}
            sizes="(max-width: 640px) 20vw, (max-width: 768px) 30vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw"
          />
        </div>
      ) : (
        <IoPersonCircle className="h-8 w-8" />
      )}
      <p className="text-base">{author.name}</p>
    </div>
  );
}
