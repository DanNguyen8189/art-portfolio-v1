import type { ImageMetadata } from "astro";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export function getPhotosFromContent(): Photo[] {
  // Adjust this path to where your images live
  const modules = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/illustrations/*.{jpg,jpeg,png,webp,avif}",
    { eager: true }
  );

  return Object.values(modules).map((m) => ({
    src: m.default.src,
    width: m.default.width,
    height: m.default.height,
    alt: "",
  }));
}