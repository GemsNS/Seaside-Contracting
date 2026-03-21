"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "#exterior-design", label: "Designer" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

/** Hero is light (no full-bleed photo) — transparent header uses dark ink, not white links */
const HERO_IS_LIGHT = true;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !scrolled && !HERO_IS_LIGHT;
  const linkClass = onDark
    ? "text-base-white/90 hover:text-primary-aqua"
    : "text-base-black/80 hover:text-primary-aqua";

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(255,255,255,0.97)"
          : HERO_IS_LIGHT
            ? "rgba(255,255,255,0.86)"
            : "rgba(18,18,18,0)",
        boxShadow:
          scrolled || HERO_IS_LIGHT ? "0 1px 0 rgba(18,18,18,0.06)" : "none",
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed inset-x-0 top-0 z-50 border-b ${
        !scrolled && HERO_IS_LIGHT ? "border-base-black/5 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className={`min-w-0 shrink-0 font-semibold uppercase tracking-wide transition-colors text-xs sm:text-sm ${linkClass}`}
          >
            Seaside Contracting
          </Link>
          <span
            className={`hidden h-8 w-px shrink-0 md:block ${onDark ? "bg-base-white/25" : "bg-base-black/15"}`}
            aria-hidden
          />
        </div>

        <nav
          className={`hidden items-center gap-8 text-sm font-semibold uppercase tracking-wide md:flex ${linkClass}`}
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+19028099412"
            className={`hidden items-center gap-2 text-sm font-semibold lg:flex ${onDark ? "text-base-white" : "text-base-black"}`}
          >
            <Phone className="h-4 w-4 text-primary-aqua" strokeWidth={2} aria-hidden />
            <span>(902) 809-9412</span>
          </a>

          <Link
            href="#contact"
            className="hidden rounded-md bg-primary-aqua px-4 py-2.5 text-sm font-semibold text-base-white shadow-sm transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            className={`inline-flex rounded-md p-2 md:hidden ${onDark ? "text-base-white" : "text-base-black"}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className={`border-t px-4 py-4 md:hidden ${
            scrolled || HERO_IS_LIGHT
              ? "border-base-black/10 bg-base-white"
              : "border-base-white/10 bg-base-black/90 backdrop-blur-md"
          }`}
        >
          <nav
            className={`flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide ${onDark && !scrolled ? "text-base-white" : "text-base-black"}`}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="mt-2 rounded-md bg-primary-aqua px-4 py-3 text-center text-base-white"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
            <a href="tel:+19028099412" className="flex items-center gap-2 py-2 text-primary-aqua">
              <Phone className="h-4 w-4" />
              (902) 809-9412
            </a>
          </nav>
        </div>
      ) : null}
    </motion.header>
  );
}
