import Container from "@/components/ui/Container";

import ProfileHero from "@/components/pages/profile/ProfileHero";
import ProfileHeroContent from "@/components/pages/profile/ProfileHeroContent";

export default async function Page() {
  return (
    <Container className={"flex items-center justify-center max-sm:my-10"}>
      <div className="flex h-full w-[90%] items-center justify-around max-md:flex-col max-sm:gap-7">
        <ProfileHero />
        <ProfileHeroContent />
      </div>
    </Container>
  );
}
