import Image, { ImageProps } from "next/image";

export function PromoBanner({ alt, ...props }: ImageProps) {
  return (
    <Image
      height={0}
      width={0}
      className="h-auto w-full px-5 mt-8"
      sizes="100vw"
      alt={alt}
      {...props}
    />
  );
}