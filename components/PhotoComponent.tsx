import Image from 'next/image';

async function PhotoComponent() {
  return (
    <>
      <Image
        src={
          'https://drive.google.com/uc?export=view&id=1avEC7sPJyEToECaE-KI9VMWlg8IaF1Hr'
        }
        className="object-cover"
        fill={true}
        priority={true}
        sizes="(max-width: 640px) 80vw, (max-width: 768px) 80vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw"
        alt="hero-image"
      />
      <div className="absolute z-30 w-full h-full bg-black bg-opacity-70" />
    </>
  );
}

function PhotoSkeleton() {
  return <div className="skeleton w-full h-fit" />;
}

export { PhotoComponent, PhotoSkeleton };
