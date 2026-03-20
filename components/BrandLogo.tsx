"use client";

import Image from "next/image";

/**
 * Raster wordmarks from `/public/brand/` (source: `assets/logo1.png`, `assets/whitebanner1.png`).
 * `onDark` = light treatment for transparent header over the hero; scrolled = full-color lockup.
 */
type BrandLogoProps = {
  className?: string;
  /** Light / ice logo for dark photography & overlays */
  onDark?: boolean;
};

export function BrandLogo({ className, onDark = false }: BrandLogoProps) {
  const src = onDark ? "/brand/logo-on-dark.png" : "/brand/logo-main.png";

  return (
    <Image
      src={src}
      alt="Seaside Contracting"
      width={360}
      height={120}
      priority
      unoptimized
      className={`object-contain object-left ${className ?? ""}`}
      sizes="(max-width: 640px) 200px, 240px"
    />
  );
}
