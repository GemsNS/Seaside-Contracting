import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seaside Contracting | Coastal craft & full-service builds",
  description:
    "Halifax and coastal Nova Scotia residential construction—renovations, exteriors, decks, and exterior packages.",
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
