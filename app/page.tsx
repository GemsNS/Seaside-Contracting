import type { Metadata } from "next";
import { AudienceGate } from "@/components/landing/AudienceGate";

export const metadata: Metadata = {
  title: "Seaside Contracting | Residential & Commercial",
  description:
    "Halifax and coastal Nova Scotia contracting—choose a residential or commercial path for exteriors, renovations, and envelope work.",
};

export default function HomePage() {
  return <AudienceGate />;
}
