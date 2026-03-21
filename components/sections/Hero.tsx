"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { withBasePath } from "@/lib/withBasePath";

const easeArchitectural = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: easeArchitectural },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-base-white pt-28 sm:pt-32">
      {/* Soft ambient layers — no hero photo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-[50%] w-[70%] rounded-full bg-primary-aqua/[0.07] blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[45%] w-[65%] rounded-full bg-primary-aqua/[0.05] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,180,216,0.09),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-10 sm:px-6 sm:pb-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-14">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="max-w-3xl"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-aqua"
            >
              Halifax &amp; coastal Nova Scotia
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-5 text-4xl font-extrabold tracking-tight text-base-black sm:text-5xl lg:text-6xl"
            >
              Precision in Every Build.
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-base-black/75 sm:text-xl"
            >
              Delivering modern design and uncompromising coastal craftsmanship to Halifax and
              surrounding areas.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: easeArchitectural }}
          className="flex justify-center lg:justify-end"
        >
          <Image
            src={withBasePath("/brand/header-crest.png")}
            alt="Seaside Contracting — house, sun, and wave mark"
            width={520}
            height={400}
            className="h-auto w-full max-w-[min(100%,420px)] object-contain drop-shadow-sm lg:max-w-[min(100%,480px)]"
            sizes="(max-width: 1024px) 90vw, 480px"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-primary-aqua/60 to-transparent" />
    </section>
  );
}
