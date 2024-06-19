type CategoryWithSubTags = {
  main: string;
  subcategories: string[];
};

const mergedCategories = (categoriesWithSubTags: string[][]) => {
  return categoriesWithSubTags.reduce(
    (acc: CategoryWithSubTags[], [main, sub]) => {
      const existingCategory = acc.find(
        (category: CategoryWithSubTags) => category.main === main,
      ) as CategoryWithSubTags;
      if (existingCategory) {
        existingCategory.subcategories.push(sub);
      } else {
        acc.push({ main, subcategories: [sub] });
      }
      return acc;
    },
    [],
  );
};

export { type CategoryWithSubTags, mergedCategories };
