import Image from "next/image";
import Link from "next/link";
import { NovaScotiaFlag } from "@/components/NovaScotiaFlag";
import { withBasePath } from "@/lib/withBasePath";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-base-white pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-[50%] w-[70%] rounded-full bg-primary-aqua/[0.07] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[45%] w-[65%] rounded-full bg-primary-aqua/[0.05] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,180,216,0.09),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 px-4 pb-6 sm:px-6 sm:pb-8 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-10">
        <div>
          <div className="max-w-3xl">
            <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-aqua">
              <NovaScotiaFlag
                size={18}
                className="shrink-0 rounded-sm shadow-sm ring-1 ring-base-black/[0.08]"
              />
              <span>Halifax &amp; coastal Nova Scotia</span>
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-base-black sm:text-5xl lg:text-6xl">
              Precision in Every Build.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-base-black/75 sm:text-xl">
              Delivering modern design and uncompromising coastal craftsmanship to Halifax and
              surrounding areas.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#exterior-design"
              className="inline-flex items-center justify-center rounded-md bg-primary-aqua px-6 py-3.5 text-base font-semibold text-base-white shadow-sm transition-opacity hover:opacity-90"
            >
              Try exterior designer
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-base-black/15 bg-base-white px-6 py-3.5 text-base font-semibold text-base-black transition-colors hover:border-primary-aqua hover:text-primary-aqua"
            >
              Request a Consultation
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center text-sm font-semibold text-base-black/70 underline-offset-4 hover:text-primary-aqua hover:underline"
            >
              View services
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-6 lg:items-end">
          <div className="w-full max-w-[min(100%,520px)] lg:max-w-none">
            <Image
              src={withBasePath("/brand/ns-flag-full.svg")}
              alt="Provincial flag of Nova Scotia"
              width={1200}
              height={600}
              className="h-auto w-full rounded-lg object-contain shadow-[0_12px_40px_-8px_rgba(15,23,42,0.25)] ring-1 ring-base-black/10"
              sizes="(max-width: 1024px) 92vw, min(520px, 45vw)"
              priority
              unoptimized
            />
          </div>
          <Image
            src={withBasePath("/brand/header-crest.png")}
            alt="Seaside Contracting — house, sun, and wave mark"
            width={400}
            height={308}
            className="h-auto w-full max-w-[200px] object-contain opacity-95 drop-shadow-sm sm:max-w-[220px]"
            sizes="220px"
            unoptimized
          />
        </div>
      </div>

      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-primary-aqua/60 to-transparent" />
    </section>
  );
}
