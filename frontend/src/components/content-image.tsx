import type { ImgHTMLAttributes } from "react";

type ContentImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | null;
  alt: string;
};

/**
 * Content images come from Payload with their original dimensions. A native
 * image element lets the browser preserve those dimensions instead of
 * forcing an editorial crop through a fixed Next Image frame.
 */
export function ContentImage({ className, alt, src, ...props }: ContentImageProps) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} src={src} alt={alt} className={`block ${className ?? ""}`} />
  );
}
