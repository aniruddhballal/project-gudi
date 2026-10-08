import type { ImgHTMLAttributes } from "react";

type ContentImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * Content images come from Payload with their original dimensions. A native
 * image element lets the browser preserve those dimensions instead of
 * forcing an editorial crop through a fixed Next Image frame.
 */
export function ContentImage({ className, alt, ...props }: ContentImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={alt} className={`block ${className ?? ""}`} />
  );
}
