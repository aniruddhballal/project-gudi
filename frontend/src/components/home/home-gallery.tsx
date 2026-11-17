"use client";

import { useEffect, useState } from "react";
import { ContentImage } from "@/components/content-image";
import type { HomeContent } from "@/lib/site-content-types";
import styles from "./home-gallery.module.css";

export function HomeGallery({ photos, captions = [] }: {
  photos: HomeContent["gallery"];
  captions?: readonly string[];
}) {
  const [columnCount, setColumnCount] = useState(4);
  const [ratios, setRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    const tablet = window.matchMedia("(max-width: 1099px)");
    const mobile = window.matchMedia("(max-width: 767px)");
    function updateColumns() {
      setColumnCount(mobile.matches ? 2 : tablet.matches ? 3 : 4);
    }
    updateColumns();
    tablet.addEventListener("change", updateColumns);
    mobile.addEventListener("change", updateColumns);
    return () => {
      tablet.removeEventListener("change", updateColumns);
      mobile.removeEventListener("change", updateColumns);
    };
  }, []);

  const columns: Array<Array<{ photo: HomeContent["gallery"][number]; key: string; caption?: string }>> =
    Array.from({ length: columnCount }, () => []);
  const heights = Array<number>(columnCount).fill(0);
  photos.forEach((photo, index) => {
    const key = `${photo.image}-${index}`;
    const column = heights.indexOf(Math.min(...heights));
    columns[column].push({ photo, key, caption: captions[index] });
    heights[column] += (ratios[key] ?? 1) + (captions[index] ? 0.18 : 0) + 0.03;
  });

  return (
    <div className={`${styles.gallery} ${captions.length ? styles.albums : ""}`}>
      {columns.map((column, index) => (
        <div key={index} className={styles.column}>
          {column.map(({ photo, key, caption }) => (
            <figure key={key} className={`${styles.photo} ${caption ? styles.album : ""}`}>
              <ContentImage
                src={photo.image}
                alt={photo.alt}
                loading="eager"
                onLoad={(event) => {
                  const image = event.currentTarget;
                  if (!image.naturalWidth) return;
                  const ratio = image.naturalHeight / image.naturalWidth;
                  setRatios((current) => current[key] === ratio
                    ? current
                    : { ...current, [key]: ratio });
                }}
              />
              {caption && <figcaption className={styles.caption}><h2 className={styles.albumTitle}>{caption}</h2></figcaption>}
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
