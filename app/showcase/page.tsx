import { audienceFromSearchParam } from "@/lib/audience";
import { ShowcaseClient } from "./ShowcaseClient";

type PageProps = {
  searchParams: Promise<{ audience?: string | string[] }>;
};

export default async function ShowcasePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const audience = audienceFromSearchParam(sp.audience);
  return <ShowcaseClient audience={audience} />;
}
