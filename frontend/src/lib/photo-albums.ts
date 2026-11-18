import type { HomeContent, PhotoAlbum, PhotosContent } from "./site-content-types";

/** Legacy fallback only. Version 2 albums always honour the editor's explicit cover choices. */
export function resolvePhotoAlbums(photos: PhotosContent, gallery: HomeContent["gallery"]): readonly PhotoAlbum[] {
  if ((photos.contentModelVersion ?? 0) >= 2 || photos.albums.some((album) => album.coverImage || album.photos?.length)) return photos.albums;
  const coverOrder = [3, 4, 2, 6, 7, 1, 5, 0];
  const used = new Set<string>();
  const albums: PhotoAlbum[] = photos.albums.map((album, index) => {
    const cover = gallery[coverOrder[index]];
    if (cover?.image) used.add(cover.image);
    return { ...album, coverImage: cover?.image, coverAlt: cover?.alt, coverStatus: "illustrative" };
  });
  for (const photo of gallery) {
    if (photo.image && !used.has(photo.image)) {
      albums.push({ coverImage: photo.image, coverAlt: photo.alt, coverStatus: "illustrative" });
      used.add(photo.image);
    }
  }
  return albums;
}
