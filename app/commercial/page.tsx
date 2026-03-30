import type { Metadata } from "next";
import { AudienceSiteHome } from "@/components/pages/AudienceSiteHome";

export const metadata: Metadata = {
  title: "Commercial | Seaside Contracting",
  description:
    "Commercial building envelopes, exterior upgrades, and phased cladding and opening work for Nova Scotia properties.",
};

export default function CommercialPage() {
  return <AudienceSiteHome audience="commercial" />;
}
