import type { ImageMetadata } from "astro";

export type Photo = {
    src: string;
    image: ImageMetadata;
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

    // Astro requires a static glob; 
    // Astro figures out each image's URL and dimensions at build time
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
            image: module.default,
            width: module.default.width,
            height: module.default.height,
            alt: "",
        }));
}