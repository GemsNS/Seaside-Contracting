"use client";

import { motion } from "framer-motion";

const easeArchitectural = [0.22, 1, 0.36, 1] as const;

function CoastalWaves() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden" aria-hidden>
      <svg
        className="absolute bottom-0 left-1/2 w-[120%] min-w-[800px] -translate-x-1/2"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 Q 200 40 400 70 T 800 65 T 1200 75 L 1200 120 L 0 120 Z"
          className="fill-primary-aqua/10"
        />
        <path
          d="M0 95 Q 220 55 440 85 T 880 78 T 1200 88 L 1200 120 L 0 120 Z"
          className="fill-primary-aqua/18"
        />
        <path
          d="M0 105 Q 240 70 480 95 T 960 88 T 1200 98 L 1200 120 L 0 120 Z"
          fill="none"
          className="stroke-primary-aqua"
          strokeWidth="1.25"
          opacity={0.35}
        />
      </svg>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-base-white py-20 sm:py-24"
      aria-labelledby="about-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easeArchitectural }}
          className="max-w-3xl"
        >
          <h2
            id="about-heading"
            className="text-3xl font-extrabold tracking-tight text-base-black sm:text-4xl"
          >
            Built for the Coast. Built to Last.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-base-black/80">
            At Seaside Contracting, we believe your home should be as resilient as it is beautiful.
            Specializing in high-end residential builds and modern renovations across Nova Scotia,
            our team brings meticulous attention to detail and unwavering reliability to every
            project. We don&apos;t just build homes; we engineer living spaces designed to thrive in
            the coastal environment.
          </p>
        </motion.div>
      </div>

      <CoastalWaves />
    </section>
  );
}
