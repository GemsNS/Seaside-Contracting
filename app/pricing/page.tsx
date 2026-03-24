import type { Metadata } from "next";
import Link from "next/link";
import { getPricingItems } from "@/lib/pricingData";

export const metadata: Metadata = {
  title: "Pricing | Seaside Contracting",
  description:
    "Browse Seaside Contracting labour rates for siding, exterior upgrades, and related residential construction scopes.",
};

export default async function PricingPage() {
  const items = await getPricingItems();
  const grouped = groupByCoverage(items);

  return (
    <div className="bg-zinc-50 pt-28 sm:pt-32">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-aqua">
            Seaside Contracting
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-base-black sm:text-5xl">
            Labour price sheet
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Clear reference pricing to help scope your project early. Rates shown are labour-focused and
            may adjust for access, complexity, and custom detailing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex rounded-sm bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Request a quote
            </Link>
            <Link
              href="/showcase"
              className="inline-flex rounded-sm border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100"
            >
              View completed projects
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {grouped.map((group) => (
            <article key={group.unit} className="rounded-sm border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Pricing unit
              </p>
              <h2 className="mt-2 text-2xl font-bold text-base-black">{group.unit}</h2>
              <p className="mt-2 text-sm text-zinc-600">{group.items.length} listed services</p>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-sm border border-zinc-200 bg-white shadow-sm">
          <div className="grid grid-cols-12 border-b border-zinc-200 bg-zinc-100/80 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
            <div className="col-span-5 sm:col-span-6">Item</div>
            <div className="col-span-3 sm:col-span-2">Cost</div>
            <div className="col-span-2">Coverage</div>
            <div className="col-span-2">Waste</div>
          </div>

          <div className="divide-y divide-zinc-200">
            {items.map((item) => (
              <div
                key={item.item}
                className="grid grid-cols-12 px-5 py-4 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                <p className="col-span-5 pr-4 font-medium text-zinc-900 sm:col-span-6">{item.item}</p>
                <p className="col-span-3 font-semibold text-primary-aqua sm:col-span-2">{item.cost}</p>
                <p className="col-span-2 uppercase tracking-[0.08em] text-zinc-600">{item.coverage}</p>
                <p className="col-span-2 text-zinc-600">{item.wasteFactor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function groupByCoverage(
  items: { item: string; cost: string; coverage: string; wasteFactor: string }[],
) {
  const map = new Map<string, typeof items>();
  for (const item of items) {
    const key = item.coverage.toLowerCase();
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }

  return [...map.entries()]
    .map(([unit, groupedItems]) => ({
      unit: unit.toUpperCase(),
      items: groupedItems,
    }))
    .sort((a, b) => b.items.length - a.items.length);
}
