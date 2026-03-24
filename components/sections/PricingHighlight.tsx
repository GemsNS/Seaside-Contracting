import Link from "next/link";
import { getPricingItems } from "@/lib/pricingData";

export async function PricingHighlight() {
  const pricingItems = await getPricingItems();
  const previewItems = pricingItems.slice(0, 6);

  return (
    <section
      id="pricing"
      className="scroll-mt-32 border-t border-zinc-200/80 bg-zinc-950 py-20 text-white sm:scroll-mt-36 sm:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-aqua">
              Transparent pricing
            </p>
            <h2
              id="pricing-heading"
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.2rem]"
            >
              Labour price sheet
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-300 sm:text-base">
              Reference rates from the current Seaside Contracting price list. Final pricing can vary by
              site conditions, detailing, and project complexity.
            </p>
            <Link
              href="/pricing"
              className="mt-7 inline-flex rounded-sm bg-primary-aqua px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              View full pricing page
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {previewItems.map((item) => (
                <article
                  key={item.item}
                  className="rounded-sm border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <p className="text-sm font-semibold text-white">{item.item}</p>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <p className="text-lg font-bold text-primary-aqua">{item.cost}</p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                      / {item.coverage}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400">Waste factor: {item.wasteFactor}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
