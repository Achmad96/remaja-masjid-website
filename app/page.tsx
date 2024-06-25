import Container from "@/components/ui/Container";
import Hero from "@/components/pages/app/Hero";
import Navbar from "@/components/ui/Navbar";

export const revalidate = 600;
export default function Home() {
  return (
    <>
      <Navbar />
      <Container className="flex flex-col">
        <Hero />
      </Container>
    </>
  );
}
