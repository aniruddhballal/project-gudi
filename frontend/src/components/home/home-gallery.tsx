"use client";

import { useEffect, useRef } from "react";
import { ContentImage } from "@/components/content-image";
import type { HomeContent } from "@/lib/site-content-types";
import styles from "./home-gallery.module.css";

export function HomeGallery({ photos }: { photos: HomeContent["gallery"] }) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const figures = Array.from(gallery.querySelectorAll<HTMLElement>("figure"));
    const images = Array.from(gallery.querySelectorAll<HTMLImageElement>("img"));
    let frame: number | undefined;

    function layout() {
      if (!gallery) return;
      const css = getComputedStyle(gallery);
      const columns = Number(css.getPropertyValue("--gallery-columns")) || 4;
      const gap = parseFloat(css.columnGap) || 10;
      const width = (gallery.clientWidth - gap * (columns - 1)) / columns;
      if (width <= 0) return;
      const heights = Array<number>(columns).fill(0);

      for (const figure of figures) {
        const image = figure.querySelector("img");
        if (!image) continue;
        const column = heights.indexOf(Math.min(...heights));
        const height = image.naturalWidth > 0
          ? width * image.naturalHeight / image.naturalWidth
          : width;
        figure.style.width = `${width}px`;
        figure.style.transform = `translate(${column * (width + gap)}px, ${heights[column]}px)`;
        heights[column] += height + gap;
      }
      gallery.style.height = `${Math.max(0, ...heights) - (figures.length ? gap : 0)}px`;
      gallery.dataset.packed = "true";
    }

    function scheduleLayout() {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { frame = undefined; layout(); });
    }

    const observer = new ResizeObserver(scheduleLayout);
    observer.observe(gallery);
    images.forEach((image) => {
      observer.observe(image);
      image.addEventListener("load", scheduleLayout);
      image.addEventListener("error", scheduleLayout);
    });
    layout();

    return () => {
      observer.disconnect();
      if (frame !== undefined) cancelAnimationFrame(frame);
      images.forEach((image) => {
        image.removeEventListener("load", scheduleLayout);
        image.removeEventListener("error", scheduleLayout);
      });
    };
  }, [photos]);

  return (
    <div ref={galleryRef} className={styles.gallery}>
      {photos.map((photo, index) => (
        <figure key={`${photo.image}-${index}`} className={styles.photo}>
          <ContentImage src={photo.image} alt={photo.alt} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
