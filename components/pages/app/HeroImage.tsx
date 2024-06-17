import { ImageWithoutBlurData } from "@/components/ui/ImageComponent";

export default async function HeroImage() {
  const fileUrl = process.env.NEXT_PUBLIC_FILE_URL as string;
  const fileId = process.env.NEXT_PUBLIC_HERO_FILE_ID as string;
  return (
    <>
      <ImageWithoutBlurData
        src={`${fileUrl}&id=${fileId}`}
        className="object-cover"
        sizes="(max-width: 640px) 80vw, (max-width: 768px) 80vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw"
        alt="hero-image"
      />
      <div className="absolute z-30 h-full w-full bg-black bg-opacity-70" />
    </>
  );
}
