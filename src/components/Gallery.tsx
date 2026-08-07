import * as React from "react";
import "react-photo-album/rows.css";
import { RowsPhotoAlbum } from "react-photo-album";
import type { Photo } from "../lib/photos";

export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="gallery-layout-switch">
      <div className="desktop-rows">
        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={220}
          defaultContainerWidth={1168}
          spacing={12}
          padding={0}
          sizes={{
            size: "1168px",
            sizes: [
              { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
              { viewport: "(max-width: 768px)", size: "calc(100vw - 24px)" },
              { viewport: "(max-width: 480px)", size: "calc(100vw - 16px)" },
            ],
          }}
        />
      </div>

      <div className="mobile-stack" role="group" aria-label="Photo album">
        {photos.map((photo, index) => (
          <img
            key={`${photo.src}-${index}`}
            src={photo.src}
            alt={photo.alt || ""}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <style>{`
        .gallery-layout-switch {
          width: 100%;
        }

        .mobile-stack {
          display: none;
          width: 100%;
        }

        .mobile-stack img {
          display: block;
          width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .desktop-rows {
            display: none;
          }

          .mobile-stack {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}