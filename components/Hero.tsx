import PhotoComponent from "@/components/PhotoComponent";

import HeroContent from "@/components/HeroContent";
import Container from "@/components/Container";

export default async function Hero() {
  return (
    <Container className="relative flex items-center justify-center">
      <PhotoComponent />
      <HeroContent />
    </Container>
  );
}
