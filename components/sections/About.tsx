import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { withBasePath } from "@/lib/withBasePath";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-32 border-t border-zinc-200/80 bg-white py-20 sm:scroll-mt-36 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Reveal y={24}>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white shadow-lg ring-1 ring-zinc-200/80 lg:aspect-[5/4]">
              <Image
                src={withBasePath("/brand/ns-flag-full.svg")}
                alt="Nova Scotia provincial flag — white field with blue saltire and shield"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center p-6 sm:p-10 lg:p-12"
                unoptimized
                priority
              />
              <figcaption className="sr-only">Nova Scotia</figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal y={20}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-aqua">
                About Seaside
              </p>
              <h2
                id="about-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-base-black sm:text-4xl lg:text-[2.35rem] lg:leading-snug"
              >
                Built for the coast. Built to last.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                <p>
                  At Seaside Contracting, we believe your home should be as resilient as it is
                  beautiful. Specializing in high-end residential builds and modern renovations across
                  Nova Scotia, our team brings meticulous attention to detail and unwavering
                  reliability to every project.
                </p>
                <p>
                  We don&apos;t just build homes—we engineer living spaces designed to thrive in the
                  coastal environment, with assemblies and finishes selected for performance in salt
                  air, wind, and seasonal swings.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
