import Container from "@/components/ui/Container";

import ProfileHero from "@/components/pages/profile/ProfileHero";
import ProfileHeroContent from "@/components/pages/profile/ProfileHeroContent";

export default async function Page() {
  return (
    <Container
      className={
        "flex h-full w-[90%] items-center justify-around max-lg:flex-col max-lg:gap-3"
      }
    >
      <ProfileHero />
      <ProfileHeroContent />
    </Container>
  );
}
