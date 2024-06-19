"use client";
import Link from "next/link";
import { useRef } from "react";
import { CategoryWithSubTags, mergedCategories } from "@/utils/category-util";

interface ICategoryWithoutSub {
  category: string;
}
const CategoryWithoutSub = (props: ICategoryWithoutSub) => {
  const { category } = props;
  return (
    <li>
      <Link href={`/category/${category.toLowerCase()}`}>{category}</Link>
    </li>
  );
};

interface ICategoryWithSub {
  category: CategoryWithSubTags;
}
function CategoryWithSub(props: ICategoryWithSub) {
  const { category } = props;
  return (
    <li>
      <a>{category.main}</a>
      <ul>
        {category.subcategories.map((sub: string, i: number) => {
          const subName = sub.split("_").join(" ");
          return (
            <li key={i}>
              <Link
                href={`/category/${category.main.toLowerCase()}-${sub.toLowerCase()}`}
              >
                {subName}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

interface INavgiationController {
  categories: string[];
}
export default function NavigationController({
  categories,
}: INavgiationController) {
  const ref = useRef<HTMLDetailsElement | null>(null);
  const categoriesWithSubTags = mergedCategories(
    categories
      .filter((value) => value.includes("-"))
      .map((value) => value.split("-")),
  );
  return (
    <details ref={ref} className="w-52 text-white max-sm:w-full">
      <summary className="text-base">Kategori</summary>
      <ul className="z-50 rounded-t-none bg-[#55AD9B] p-2">
        {categories
          .filter((value) => !value.includes("-"))
          .map((category: string, i: number) => (
            <CategoryWithoutSub key={i} category={category} />
          ))}
        {categoriesWithSubTags.map(
          (category: CategoryWithSubTags, i: number) => (
            <CategoryWithSub key={i} category={category} />
          ),
        )}
      </ul>
    </details>
  );
}
