import { Client } from '@notionhq/client';
import { cache } from 'react';
import { NotionToMarkdown } from 'notion-to-md';
import { ArticleType, AuthorType } from '@/app/types';
import { formatDate, formatDescription } from '@/utils/format-util';

const API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY as string;
const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string;

const client = new Client({ auth: API_KEY });
const notionToMarkdown = new NotionToMarkdown({ notionClient: client });

const getAuthorById = async (user_id: string): Promise<AuthorType> => {
  const response = await client.users.retrieve({ user_id });
  return {
    id: response.id,
    name: response.name as string,
    avatar: response.avatar_url as string
  };
};

const getCategories = async () => {
  const response = (await client.databases.retrieve({
    database_id: DATABASE_ID
  })) as any;
  return response.properties.Category.select.options.map(
    (category: any) => category.name
  );
};

const getAndTransformPageToArticleForm = async (
  page: any
): Promise<ArticleType> => {
  const { properties } = page;
  const {
    Title,
    Description,
    Author,
    Category,
    Published,
    Slug,
    CreatedAt,
    UpdatedAt
  } = properties;

  return {
    id: page.id as string,
    cover: !page.cover
      ? ''
      : page.cover.type === 'file'
      ? (page.cover.file.url as string)
      : (page.cover.external.url as string),
    title: Title.title[0].plain_text as string,
    description: formatDescription(Description) as string,
    author: await getAuthorById(Author.people[0].id),
    category: Category.select.name as string,
    published: Published.checkbox as boolean,
    slug: Slug.formula.string as string,
    createdAt: formatDate(CreatedAt.created_time) as string,
    updatedAt: formatDate(UpdatedAt.last_edited_time) as string
  };
};

const getArticlesByCategory = cache(
  async (category: string): Promise<ArticleType[]> => {
    const response = await client.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Category',
            select: {
              equals: category
            }
          },
          {
            property: 'Published',
            checkbox: {
              equals: true
            }
          }
        ]
      }
    });
    const articles = await Promise.all(
      response.results.map(getAndTransformPageToArticleForm)
    );
    return articles;
  }
);

const getSingleArticlePage = cache(async (slug: string) => {
  const response = await client.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug
          }
        },
        {
          property: 'Published',
          checkbox: {
            equals: true
          }
        }
      ]
    }
  });

  if (!response.results[0]) {
    return { error: 'Sorry, there was an error' };
  }

  const page = response.results[0];
  const mdBlocks = await notionToMarkdown.pageToMarkdown(page.id);
  const markdown = notionToMarkdown.toMarkdownString(mdBlocks);
  const article = await getAndTransformPageToArticleForm(page);
  return {
    article,
    markdown
  };
});

export {
  getAuthorById,
  getCategories,
  getSingleArticlePage,
  getArticlesByCategory
};
