"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/withBasePath";

/**
 * Compact nav mark from `assets/miniseal.png` → `public/brand/mini-seal.png`.
 */
type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  const src = withBasePath("/brand/mini-seal.png");

  return (
    <Image
      src={src}
      alt="Seaside Contracting"
      width={88}
      height={88}
      priority
      unoptimized
      className={`h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12 ${className ?? ""}`}
      sizes="48px"
    />
  );
}
