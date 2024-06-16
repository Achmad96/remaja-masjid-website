import Image from "next/image";
import Container from "@/components/Container";
import ProfileHeroContent from "@/components/ProfileHeroContent";

export default async function Page() {
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const profileId = process.env.NEXT_PUBLIC_PROFILE_HERO_FILE_ID;
  return (
    <Container className={"flex items-center justify-center"}>
      <div className="flex h-full w-[90%] items-center justify-around max-md:flex-col">
        <div className="-z-50 w-[50%] max-lg:w-[75%] max-md:w-[90%] max-sm:w-full">
          {/* <div className="mask-profile -z-50"> */}
          <div className="relative -left-8 h-[30rem] w-full max-md:left-0">
            <Image
              // src={`${fileUrl}&id=${profileId}`}
              src={"/profile2.png"}
              alt="profile-remas"
              className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.7)]"
              fill={true}
              sizes="(max-width: 1280px) 100vw"
            />
          </div>
          {/* </div> */}
        </div>
        <ProfileHeroContent />
      </div>
    </Container>
  );
}
