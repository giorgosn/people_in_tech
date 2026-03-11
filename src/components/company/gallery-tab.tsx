"use client";

import { useTranslations } from "next-intl";
import { ImageIcon } from "lucide-react";

interface GalleryImageData {
  id: string;
  url: string;
  caption: string | null;
  order: number;
}

interface GalleryTabProps {
  images: GalleryImageData[];
  isVerified: boolean;
}

export function GalleryTab({ images, isVerified }: GalleryTabProps) {
  const t = useTranslations("company");

  if (!isVerified) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ImageIcon className="mb-4 size-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">
          Gallery available for verified companies
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ImageIcon className="mb-4 size-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">No gallery images yet</p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-4 md:columns-3">
      {images.sort((a, b) => a.order - b.order).map((image) => (
        <div key={image.id} className="mb-4 break-inside-avoid overflow-hidden rounded-xl">
          <img
            src={image.url}
            alt={image.caption || "Gallery image"}
            className="w-full object-cover transition-transform duration-200 hover:scale-[1.02]"
          />
          {image.caption && (
            <p className="mt-2 text-sm text-muted-foreground">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
