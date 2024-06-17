import {
  ImageContainer,
  ImageWithoutBlur,
} from "@/components/ui/ImageComponent";

export default function ProfileHero() {
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const profileId = process.env.NEXT_PUBLIC_PROFILE_HERO_FILE_ID;
  return (
    <div className="-z-50 w-[50%] max-lg:w-[75%] max-md:w-[90%] max-sm:w-full">
      <ImageContainer className="relative -left-8 h-[30rem] w-full max-md:left-0 max-sm:h-[17rem]">
        <ImageWithoutBlur
          src={`${fileUrl}&id=${profileId}`}
          alt="profile-remas"
          className="rounded-xl shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
          sizes="(max-width: 1280px) 100vw"
        />
      </ImageContainer>
    </div>
  );
}
