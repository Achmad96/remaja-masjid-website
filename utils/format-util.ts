function formatDescription(description: any): string {
  const currentDescription = description.rich_text
    .map((word: any) => word.plain_text)
    .join('');
  const currentDescriptionSplitted = currentDescription.split(' ');
  if (currentDescriptionSplitted.length > 30) {
    const first30Words = currentDescriptionSplitted.slice(0, 30).join(' ');
    return first30Words + '...';
  }

  return currentDescription;
}

function formatDate(date: string): string {
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export { formatDate, formatDescription };
