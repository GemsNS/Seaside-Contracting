import { ClipboardList, Hammer, Home, Sun } from "lucide-react";
import { WaveIcon } from "@/components/WaveIcon";

const items = [
  {
    title: "General Contracting",
    body: "Comprehensive project management from initial design to final walkthrough, ensuring your build is delivered on time and on budget.",
    icon: ClipboardList,
  },
  {
    title: "Residential Renovations",
    body: "Modernizing interiors with high-end finishes, structural updates, and seamless additions that elevate your home's value.",
    icon: Home,
  },
  {
    title: "Custom Decks & Patios",
    body: "Building resilient, architecturally striking outdoor living spaces engineered to withstand the harsh Maritimes weather.",
    icon: Sun,
  },
  {
    title: "Finish Carpentry",
    body: "Exacting attention to detail on custom millwork, trim, cabinetry, and architectural focal points.",
    icon: Hammer,
  },
] as const;

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-neutral-offwhite py-20 sm:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="services-heading"
            className="text-3xl font-extrabold tracking-tight text-base-black sm:text-4xl"
          >
            Services
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-base-black/5 bg-base-white p-8 shadow-sm"
            >
              <WaveIcon icon={item.icon} className="mb-6" />
              <h3 className="text-lg font-bold text-base-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-base-black/75">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
