function formatDescription(description: any): string {
  description = description.rich_text
    .map((word: any) => word.plain_text)
    .join("");
  const words = description.split(" ");
  const wordLimit = 30,
    charLimit = 200;
  let truncatedDescription;
  if (words.length > wordLimit) {
    truncatedDescription = words.slice(0, wordLimit).join(" ") + "...";
  } else {
    truncatedDescription = description;
  }
  if (truncatedDescription.length > charLimit) {
    const truncatedByChars = truncatedDescription.slice(0, charLimit);
    const lastSpaceIndex = truncatedByChars.lastIndexOf(" ");
    truncatedDescription = truncatedByChars.slice(0, lastSpaceIndex) + "...";
  }
  return truncatedDescription;
}

function formatDate(date: string): string {
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export { formatDate, formatDescription, formatCategory };
