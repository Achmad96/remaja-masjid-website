import Image from "next/image";
import Container from "@/components/Container";
import ProfileHeroContent from "@/components/ProfileHeroContent";

export default async function Page() {
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const profileId = process.env.NEXT_PUBLIC_PROFILE_HERO_FILE_ID;
  return (
    <Container className={"flex items-center justify-center max-sm:my-10"}>
      <div className="flex h-full w-[90%] items-center justify-around max-md:flex-col max-sm:gap-7">
        <div className="-z-50 w-[50%] max-lg:w-[75%] max-md:w-[90%] max-sm:w-full">
          <div className="relative -left-8 h-[30rem] w-full max-md:left-0 max-sm:h-[17rem]">
            <Image
              src={`${fileUrl}&id=${profileId}`}
              alt="profile-remas"
              className="rounded-xl shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
              fill={true}
              priority={true}
              sizes="(max-width: 1280px) 100vw"
            />
          </div>
        </div>
        <ProfileHeroContent />
      </div>
    </Container>
  );
}
