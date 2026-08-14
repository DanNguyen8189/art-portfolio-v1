import * as React from "react";
import { useState } from "react";
import "react-photo-album/rows.css";
import "react-photo-album/columns.css";
import "react-photo-album/masonry.css";
import { RowsPhotoAlbum, ColumnsPhotoAlbum, MasonryPhotoAlbum } from "react-photo-album";
import type { Photo } from "../lib/photos";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Gallery({ photos }: { photos: Photo[] }) {
    const [index, setIndex] = useState(-1);
    return (
        <div className="gallery-layout-switch">
            <div className="rows-layout">
                {/* <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={220}
          defaultContainerWidth={1168}
          spacing={12}
          padding={0}
          onClick={({ index }) => setIndex(index)}
          sizes={{
            size: "1168px",
            sizes: [
              { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
              { viewport: "(max-width: 768px)", size: "calc(100vw - 24px)" },
              { viewport: "(max-width: 480px)", size: "calc(100vw - 16px)" },
            ],
          }}
        /> */}
                <MasonryPhotoAlbum
                    photos={photos}
                    columns={(containerWidth) => {
                        if (containerWidth < 900) return 2;
                        return 3;
                    }}
                    defaultContainerWidth={1168}
                    spacing={12}
                    padding={0}
                    onClick={({ index }) => setIndex(index)}
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

            <div className="columns-layout">
                <ColumnsPhotoAlbum photos={photos}
                    columns={1}
                    onClick={({ index }) => setIndex(index)}
                />
            </div>

            <Lightbox
                slides={photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />

            {/* <div className="mobile-stack" role="group" aria-label="Photo album">
        {photos.map((photo, index) => (
          <img
            key={`${photo.src}-${index}`}
            src={photo.src}
            alt={photo.alt || ""}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div> */}

            <style>{`
        @keyframes photoFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-layout-switch {
          width: 100%;
        }

        .gallery-layout-switch img {
          opacity: 0;
          animation: photoFadeIn 700ms ease forwards;
        }
          
        .gallery-layout-switch {
          width: 100%;
        }

        .rows-layout {
          width: 100%;
        }

        .columns-layout {
          display: none;
          width: 100%;
        }

        .columns-layout img {
          display: block;
          width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .rows-layout {
            display: none;
          }

          .columns-layout {
            display: block;
          }
        }
      `}</style>
        </div>
    );
}