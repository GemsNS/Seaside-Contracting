import type { Metadata } from "next";
import { CommercialSiteHome } from "@/components/pages/CommercialSiteHome";
import { getPricingItems } from "@/lib/pricingData";

export const metadata: Metadata = {
  title: "Commercial | Seaside Contracting",
  description:
    "Commercial building envelopes, exterior upgrades, and phased cladding and opening work for Nova Scotia properties.",
};

export default async function CommercialPage() {
  const pricingItems = await getPricingItems();
  return <CommercialSiteHome pricingItems={pricingItems} />;
}
