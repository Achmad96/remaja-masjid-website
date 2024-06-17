import HeroImage from "@/components/pages/app/HeroImage";

import HeroContent from "@/components/pages/app/HeroContent";
import Container from "@/components/ui/Container";

export default async function Hero() {
  return (
    <Container className="relative flex items-center justify-center">
      <HeroImage />
      <HeroContent />
    </Container>
  );
}
