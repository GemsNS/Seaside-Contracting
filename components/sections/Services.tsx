import { ClipboardList, Hammer, Home, Sun } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { WaveIcon } from "@/components/WaveIcon";

const items = [
  {
    title: "General contracting",
    body: "Comprehensive project management from initial design to final walkthrough—on schedule, on budget, and coordinated end to end.",
    icon: ClipboardList,
  },
  {
    title: "Residential renovations",
    body: "Modernizing interiors with high-end finishes, structural updates, and seamless additions that elevate value and livability.",
    icon: Home,
  },
  {
    title: "Custom decks & patios",
    body: "Resilient outdoor living spaces engineered for Maritime weather—built to look sharp and stand up to the elements.",
    icon: Sun,
  },
  {
    title: "Finish carpentry",
    body: "Exacting detail on custom millwork, trim, cabinetry, and architectural focal points that define the character of a home.",
    icon: Hammer,
  },
] as const;

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-32 border-t border-zinc-200/80 bg-zinc-50 py-20 sm:scroll-mt-36 sm:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-aqua">
              Markets &amp; capabilities
            </p>
            <h2
              id="services-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-base-black sm:text-4xl lg:text-[2.35rem] lg:leading-snug"
            >
              Full-service residential construction
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              Whether you&apos;re refreshing a single elevation or orchestrating a complex renovation,
              we bring the same discipline: clear communication, tight site coordination, and craft
              you can see in the details.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px bg-zinc-200/90 sm:grid-cols-2 lg:mt-16 lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} y={22}>
              <article className="group h-full bg-zinc-50 p-8 transition-colors duration-300 hover:bg-white sm:p-10">
                <WaveIcon
                  icon={item.icon}
                  className="mb-6 text-primary-aqua transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="text-lg font-bold text-base-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
