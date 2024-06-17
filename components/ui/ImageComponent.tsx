import { BlurImageDataType } from "@/app/actions";
import Image from "next/image";

interface ImageContainerInterface {
  children: React.ReactNode;
  className: string;
}
function ImageContainer({ children, className }: ImageContainerInterface) {
  return <div className={className}>{children}</div>;
}

interface ImageWithoutBlurDataInterface {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

function ImageWithoutBlurData({
  src,
  alt,
  sizes,
  className = "",
}: ImageWithoutBlurDataInterface) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={true}
      fill={true}
      sizes={sizes}
      className={className}
    />
  );
}
interface ImageComponentInterface {
  className: string;
  blurImageData: BlurImageDataType;
}
function ImageComponent({ className, blurImageData }: ImageComponentInterface) {
  const { img, base64 } = blurImageData;
  return (
    <Image
      {...img}
      alt="cover"
      loading="lazy"
      blurDataURL={base64}
      placeholder="blur"
      className={className}
    />
  );
}

export { ImageWithoutBlurData, ImageComponent, ImageContainer };
