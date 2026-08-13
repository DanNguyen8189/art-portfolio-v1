import type { ImageMetadata } from "astro";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

function normalizeFolderPath(folder: string): string {
  return folder
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

export function getPhotosFromContent(folder = "illustrations"): Photo[] {
  const normalizedFolder = normalizeFolderPath(folder);

  // Astro requires a static glob, so we match all images and filter by folder
  const modules = import.meta.glob<{ default: ImageMetadata }>(
    "/src/content/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
    { eager: true }
  );

  const folderPrefix = `/src/content/${normalizedFolder}/`;

  return Object.entries(modules)
    .filter(([filePath]) => filePath.startsWith(folderPrefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, module]) => ({
      src: module.default.src,
      width: module.default.width,
      height: module.default.height,
      alt: "",
    }));
}