import { BlurImageDataType } from "@/app/actions";
import Image from "next/image";

interface ImageContainerInterface {
  children: React.ReactNode;
  className: string;
}
function ImageContainer({ children, className }: ImageContainerInterface) {
  return <div className={className}>{children}</div>;
}

interface ImageWithoutBlurInterface {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

function ImageWithoutBlur(props: ImageWithoutBlurInterface) {
  const { src, alt, sizes, className } = props;
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
interface ImageWithBlurInterface {
  blurImageData: BlurImageDataType;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}
function ImageWithBlur(props: ImageWithBlurInterface) {
  const { alt, className, blurImageData, style } = props;
  if (!blurImageData) return;
  const { img, base64 } = blurImageData;
  return (
    <Image
      {...img}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      blurDataURL={base64}
      style={{
        maxWidth: "100%",
        ...style,
      }}
      className={className}
    />
  );
}

export { ImageWithoutBlur, ImageWithBlur, ImageContainer };
