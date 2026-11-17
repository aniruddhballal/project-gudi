import { ContentImage } from "@/components/content-image";
import type { HomeContent } from "@/lib/site-content-types";
import styles from "./home-gallery.module.css";

export function HomeGallery({ photos }: { photos: HomeContent["gallery"] }) {
  return (
    <div className={styles.gallery}>
      {photos.map((photo, index) => (
        <figure key={`${photo.image}-${index}`} className={styles.photo}>
          <ContentImage src={photo.image} alt={photo.alt} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
