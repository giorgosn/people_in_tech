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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images
        .sort((a, b) => a.order - b.order)
        .map((image) => (
          <div key={image.id} className="overflow-hidden rounded-xl">
            <img
              src={image.url}
              alt={image.caption || "Gallery image"}
              className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {image.caption && (
              <p className="mt-2 text-sm text-muted-foreground">
                {image.caption}
              </p>
            )}
          </div>
        ))}
    </div>
  );
}
