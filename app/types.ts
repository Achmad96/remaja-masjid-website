import { MdStringObject } from "notion-to-md/build/types";

type ArticleType = {
  id: string;
  title: string;
  description: string;
  author: AuthorType;
  published: boolean;
  cover: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

type ArticlePageType = {
  article: ArticleType;
  markdown: MdStringObject;
};

type AuthorType = {
  id: string;
  name: string;
  avatar: string;
};

type ArticleResponseType = {
  articles: ArticleType[];
  hasMore: boolean;
  nextCursor: string | null;
};

export type { AuthorType, ArticleResponseType, ArticleType, ArticlePageType };
