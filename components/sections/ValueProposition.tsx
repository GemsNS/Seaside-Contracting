import { Reveal } from "@/components/motion/Reveal";

const pillars = [
  {
    title: "Mobilize the right team",
    body:
      "From renovations to custom exteriors, we align the right trades and sequencing so your project moves efficiently—without sacrificing coastal build quality.",
  },
  {
    title: "Value that holds",
    body:
      "Clear scopes, honest timelines, and finishes engineered for Nova Scotia’s weather. We focus on outcomes that protect your investment long after walkthrough.",
  },
  {
    title: "Innovation & craft",
    body:
      "Modern materials, code-aware detailing, and meticulous carpentry—whether you’re refreshing a façade or reimagining how your home meets the shore.",
  },
] as const;

export function ValueProposition() {
  return (
    <section
      className="border-y border-zinc-200/80 bg-zinc-50 py-16 sm:py-20"
      aria-labelledby="value-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-aqua">
              Why Seaside
            </p>
            <h2
              id="value-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-base-black sm:text-4xl lg:text-[2.35rem] lg:leading-snug"
            >
              The flexibility to deliver unique solutions—and the focus to deliver value to your
              bottom line.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Partnering with Seaside means a reliable, full-service residential partner rooted in
              Halifax and coastal Nova Scotia: proven craft, transparent communication, and builds
              designed to thrive where salt air and storms set the bar.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-zinc-200 pt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 lg:pt-16">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} y={20}>
              <div>
                <h3 className="text-lg font-bold text-base-black">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
