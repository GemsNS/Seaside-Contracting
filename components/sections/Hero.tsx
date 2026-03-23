"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { easeArchitectural } from "@/components/motion/easing";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80";

const stagger = 0.08;

export function Hero() {
  const reduce = usePrefersReducedMotion();

  const item = reduce
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeArchitectural },
        },
      };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-zinc-900">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Modern coastal residential architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:from-black/60" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: reduce
                  ? { staggerChildren: 0 }
                  : { staggerChildren: stagger, delayChildren: 0.06 },
              },
            }}
            className="max-w-3xl"
          >
            <motion.p
              variants={item}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-aqua"
            >
              Halifax &amp; coastal Nova Scotia
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-4 text-display font-bold text-white drop-shadow-sm"
            >
              Precision in every build.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl"
            >
              Modern design and uncompromising craftsmanship for homes on the Atlantic—delivered with
              the clarity and accountability you expect from a full-service partner.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Link
                href="/#exterior-design"
                className="inline-flex items-center justify-center rounded-sm bg-primary-aqua px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Exterior designer
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-sm border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-[transform,background-color] duration-300 hover:bg-white/18"
              >
                Request a consultation
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center text-sm font-semibold text-white/85 underline-offset-4 transition-colors hover:text-primary-aqua hover:underline"
              >
                View capabilities
              </Link>
              <Link
                href="/showcase"
                className="inline-flex items-center justify-center rounded-sm border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-[transform,background-color] duration-300 hover:border-primary-aqua/60 hover:bg-white/10"
              >
                Full showcase
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
