import Container from "@/components/ui/Container";

import ProfileHero from "@/components/pages/profile/ProfileHero";
import ProfileHeroContent from "@/components/pages/profile/ProfileHeroContent";
import Navbar from "@/components/ui/Navbar";

export const revalidate = 600;
export default async function Page() {
  return (
    <>
      <Navbar />
      <Container
        className={
          "flex h-full w-[90%] items-center justify-around max-lg:flex-col max-lg:gap-3"
        }
      >
        <ProfileHero />
        <ProfileHeroContent />
      </Container>
    </>
  );
}
