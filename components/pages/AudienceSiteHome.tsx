import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ExteriorDesigner } from "@/components/sections/ExteriorDesigner";
import { Hero } from "@/components/sections/Hero";
import { JobShowcaseGallery } from "@/components/sections/JobShowcaseGallery";
import { QuoteInvitation } from "@/components/sections/QuoteInvitation";
import { Services } from "@/components/sections/Services";
import { ValueProposition } from "@/components/sections/ValueProposition";
import type { ProjectAudience } from "@/lib/audience";
import { getPricingItems } from "@/lib/pricingData";

type AudienceSiteHomeProps = {
  audience: ProjectAudience;
};

export async function AudienceSiteHome({ audience }: AudienceSiteHomeProps) {
  const pricingItems = await getPricingItems();

  return (
    <>
      <Hero audience={audience} />
      <ValueProposition audience={audience} />
      <ExteriorDesigner pricingItems={pricingItems} />
      <Services audience={audience} />
      <JobShowcaseGallery audience={audience} />
      <QuoteInvitation audience={audience} />
      <About audience={audience} />
      <Contact />
    </>
  );
}
