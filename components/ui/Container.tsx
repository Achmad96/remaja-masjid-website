export default function Container(props: any) {
  const { children, className } = props;
  return (
    <main className={`h-auto min-h-[88dvh] w-full max-w-full ${className}`}>
      {children}
    </main>
  );
}
