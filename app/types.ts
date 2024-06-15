import { MdStringObject } from 'notion-to-md/build/types';

type ArticleType = {
  id: string;
  title: string;
  description: string;
  author: AuthorType;
  published: boolean;
  cover: string;
  slug: string;
  category: string;
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

export type { ArticlePageType, ArticleType, AuthorType };
