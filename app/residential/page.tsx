import type { Metadata } from "next";
import { AudienceSiteHome } from "@/components/pages/AudienceSiteHome";

export const metadata: Metadata = {
  title: "Residential | Seaside Contracting",
  description:
    "Residential renovations, custom exteriors, and coastal-durable craftsmanship for Halifax and Nova Scotia homeowners.",
};

export default function ResidentialPage() {
  return <AudienceSiteHome audience="residential" />;
}
