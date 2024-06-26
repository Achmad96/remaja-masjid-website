import "server-only";
import { getPlaiceholder } from "plaiceholder";

export type BlurImageDataType = {
  message: string;
  img: {
    src: string;
    height: number;
    width: number;
  };
  color: {
    r: number;
    g: number;
    b: number;
    hex: string;
  };
  css: {
    backgroundImage: string;
    backgroundPosition: string;
    backgroundSize: string;
    backgroundRepeat: string;
  };
  base64: string;
  pixels: {
    a?: number | undefined;
    r: number;
    g: number;
    b: number;
  }[][];
};

export async function getBlurImageData(
  src: string,
): Promise<BlurImageDataType | null> {
  if (!src) return null;
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );
  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });
  return {
    message: "Success get the blur image",
    ...plaiceholder,
    img: { src, height, width },
  };
}
