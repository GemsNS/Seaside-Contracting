"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Instagram,
  Linkedin,
  Maximize2,
  Menu,
  Search,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { JOB_SHOWCASE_IMAGES, type JobShowcaseImage } from "@/lib/jobShowcaseImages";
import { withBasePath } from "@/lib/withBasePath";
import "./showcase.css";

const HERO_1483 =
  JOB_SHOWCASE_IMAGES.find((image) => image.src.src.toLowerCase().includes("img_1483")) ??
  JOB_SHOWCASE_IMAGES[0];
const HERO_SECONDARY = JOB_SHOWCASE_IMAGES[18] ?? JOB_SHOWCASE_IMAGES[0];
const HERO_TERTIARY = JOB_SHOWCASE_IMAGES[32] ?? JOB_SHOWCASE_IMAGES[0];
const TEAM_IMAGE = JOB_SHOWCASE_IMAGES[15] ?? JOB_SHOWCASE_IMAGES[0];
const SERVICE_AREA_IMAGE = JOB_SHOWCASE_IMAGES[10] ?? JOB_SHOWCASE_IMAGES[0];

type ShowcaseCategory = "All" | "Siding" | "Trim & Capping" | "Doors & Windows" | "Full Exterior";

type ShowcaseGalleryItem = {
  image: JobShowcaseImage;
  category: Exclude<ShowcaseCategory, "All">;
  title: string;
  detail: string;
};

function makeGalleryItem(
  index: number,
  category: ShowcaseGalleryItem["category"],
  title: string,
  detail: string,
): ShowcaseGalleryItem {
  return {
    image: JOB_SHOWCASE_IMAGES[index] ?? JOB_SHOWCASE_IMAGES[0],
    category,
    title,
    detail,
  };
}

const GALLERY_CATEGORIES: ShowcaseCategory[] = [
  "All",
  "Siding",
  "Trim & Capping",
  "Doors & Windows",
  "Full Exterior",
];

const GALLERY_ITEMS: ShowcaseGalleryItem[] = [
  makeGalleryItem(
    4,
    "Siding",
    "Featured coastal siding scope (IMG_1483)",
    "Straight courses, clean transitions, and durable finish strategy for Atlantic conditions.",
  ),
  makeGalleryItem(
    6,
    "Siding",
    "Board-and-batten elevation refresh",
    "Vertical profile alignment with tidy terminations at trim and flashing points.",
  ),
  makeGalleryItem(
    7,
    "Siding",
    "Canexcel-style cladding install",
    "Consistent exposure and fastening layout across the complete wall section.",
  ),
  makeGalleryItem(
    9,
    "Trim & Capping",
    "Soffit and fascia detail finish",
    "Edge work completed with crisp lines and weather-managed transitions.",
  ),
  makeGalleryItem(
    12,
    "Trim & Capping",
    "Exterior trim correction package",
    "Rebuilt boards and caps for stronger moisture control and visual consistency.",
  ),
  makeGalleryItem(
    22,
    "Trim & Capping",
    "Flashing and capping upgrade",
    "Precision cap bends and layered flashing strategy around key penetrations.",
  ),
  makeGalleryItem(
    10,
    "Doors & Windows",
    "Entry surround capping",
    "Refined door perimeter details with durable protection at exposed edges.",
  ),
  makeGalleryItem(
    14,
    "Doors & Windows",
    "Window and opening refinements",
    "Balanced reveal work with weatherproofing-focused trim and cap sequencing.",
  ),
  makeGalleryItem(
    19,
    "Doors & Windows",
    "Garage and opening trim package",
    "Consistent finish language applied across multiple openings and facade elements.",
  ),
  makeGalleryItem(
    24,
    "Full Exterior",
    "Whole-home envelope update",
    "Siding, trim, and accessory scope coordinated as one complete exterior phase.",
  ),
  makeGalleryItem(
    33,
    "Full Exterior",
    "Facade modernization",
    "Full elevation refresh designed for curb appeal and long-service performance.",
  ),
  makeGalleryItem(
    36,
    "Full Exterior",
    "Coastal exterior overhaul",
    "Integrated system update tuned for wind, moisture, and seasonal cycling.",
  ),
];

/** Showcase hero slides sourced from completed Seaside projects. */
const SLIDES = [
  {
    image: HERO_1483.src,
    eyebrow: "Featured project · IMG_1483",
    title: "Coastal siding craftsmanship with clean, durable lines",
    href: "/#contact",
  },
  {
    image: HERO_SECONDARY.src,
    eyebrow: "Openings, trim, and detail work",
    title: "Precision capping and finish carpentry around windows and doors",
    href: "/#exterior-design",
  },
  {
    image: HERO_TERTIARY.src,
    eyebrow: "Full envelope upgrades",
    title: "Complete exterior packages built for Halifax weather cycles",
    href: "/#about",
  },
] as const;

const TAB_LABELS = [
  { n: "01", label: "Featured siding" },
  { n: "02", label: "Trim details" },
  { n: "03", label: "Full exterior scope" },
] as const;

export function ShowcaseClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const filteredGallery = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((i) => (i + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("showcase-reveal-active");
          if (el.classList.contains("showcase-stat-counter")) {
            el.querySelectorAll<HTMLElement>("[data-count-target]").forEach((c) => startCounter(c));
          }
          if (el.classList.contains("showcase-map-section")) {
            el.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    root.querySelectorAll(".showcase-reveal, .showcase-map-section").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    if (!filteredGallery.length) {
      setLightboxIndex(null);
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % filteredGallery.length,
        );
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + filteredGallery.length) % filteredGallery.length,
        );
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filteredGallery.length, lightboxIndex]);

  return (
    <div ref={rootRef} className="showcase-root scroll-smooth bg-white text-slate-900">
      <nav
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 text-white transition-all duration-500 md:px-16 ${
          navSolid ? "bg-[var(--sea-dark)] py-4 shadow-2xl" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src={withBasePath("/brand/newlogolight.png")}
            alt="Seaside Contracting"
            width={200}
            height={56}
            className="h-9 w-auto max-w-[160px] object-contain object-left md:h-10"
            unoptimized
            priority
          />
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <button
            type="button"
            className="hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/90 transition hover:text-[var(--sea-accent)] md:flex"
            aria-label="Search (coming soon)"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
            Search
          </button>
          <Link
            href="/#contact"
            className="rounded-full p-2 text-white transition hover:bg-white/10"
            aria-label="Menu — jump to contact"
          >
            <Menu className="h-8 w-8" strokeWidth={2} />
          </Link>
        </div>
      </nav>

      {/* Hero slider */}
      <section className="relative h-screen w-full overflow-hidden" id="hero-slider">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            className={`slide absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "z-[1] opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="showcase-animate-zoom absolute inset-0">
                <div className="relative h-full w-full">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 0}
                    unoptimized
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] showcase-hero-gradient" aria-hidden />
            </div>
            <div
              className={`absolute right-0 top-0 z-10 h-1/2 w-1/4 bg-[var(--sea-accent)] showcase-clip-wing-tr transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
            />
            <div className="relative z-20 flex h-full items-center px-8 md:px-24">
              <div className="max-w-4xl">
                <div key={`${i}-eyebrow`} className="showcase-hero-line mb-6 flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-[var(--sea-accent)]" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--sea-accent)]">
                    {slide.eyebrow}
                  </span>
                </div>
                <h1 key={`${i}-title`} className="showcase-hero-title mb-8 text-5xl font-extrabold leading-tight text-white md:text-7xl">
                  {slide.title}
                </h1>
                <Link
                  href={slide.href}
                  className="showcase-hero-cta group flex w-fit items-center gap-4 border-b-2 border-white/30 pb-2 text-sm font-bold uppercase tracking-widest text-white transition hover:border-[var(--sea-accent)]"
                >
                  Get started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 z-30 grid w-full grid-cols-1 md:grid-cols-3">
          {TAB_LABELS.map((tab, i) => (
            <button
              key={tab.n}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`group p-8 text-left backdrop-blur-md transition-all duration-500 ${
                i === currentSlide
                  ? "border-t-4 border-[var(--sea-accent)] bg-[var(--sea-accent)]/20"
                  : "border-t-4 border-transparent bg-black/20 hover:bg-[var(--sea-accent)]"
              } ${i === 0 ? "bg-black/40" : ""}`}
            >
              <p
                className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${
                  i === currentSlide
                    ? "text-white/80"
                    : "text-white/60 group-hover:text-black"
                }`}
              >
                {tab.n}
              </p>
              <p
                className={`text-xs font-bold uppercase tracking-widest ${
                  i === currentSlide ? "text-white" : "text-white group-hover:text-black"
                }`}
              >
                {tab.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="relative grid grid-cols-1 items-start gap-16 overflow-hidden px-8 py-32 md:px-24 lg:grid-cols-12">
        <div className="showcase-reveal space-y-12 lg:col-span-7">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Who we are</p>
            <h2 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Coastal craft. Clear communication.
            </h2>
          </div>
          <div className="max-w-2xl space-y-8 text-xl leading-relaxed text-slate-600">
            <p>
              Seaside Contracting delivers modern design and uncompromising craftsmanship across Halifax
              and coastal Nova Scotia—from renovations and finish carpentry to custom decks, siding,
              windows, and doors.
            </p>
            <p>
              We focus on scopes you can trust: honest timelines, code-aware detailing, and finishes
              selected for salt air, wind load, and the realities of building beside the Atlantic.
            </p>
          </div>
          <Link
            href="/#about"
            className="group relative inline-block overflow-hidden border-2 border-slate-900 px-12 py-5 text-sm font-bold uppercase tracking-widest transition-colors duration-500 hover:text-white"
          >
            <span className="relative z-10">About Seaside</span>
            <div className="absolute inset-0 translate-y-full bg-slate-900 transition-transform duration-500 group-hover:translate-y-0" />
          </Link>
        </div>

        <div
          className="showcase-reveal showcase-stat-counter space-y-16 border-l-2 border-slate-100 pl-12 lg:col-span-5"
          style={{ transitionDelay: "300ms" }}
        >
          <div className="group">
            <h3 className="text-7xl font-black text-teal-900" data-count-target="15">
              0
            </h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-[var(--sea-accent)]">
              Years serving coastal NS
            </p>
          </div>
          <div className="group">
            <div className="flex items-baseline gap-1">
              <h3 className="text-7xl font-black text-teal-900" data-count-target="250">
                0
              </h3>
              <span className="text-4xl font-black text-teal-900">+</span>
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-[var(--sea-accent)]">
              Projects &amp; phases delivered
            </p>
          </div>
          <div className="group">
            <h3 className="text-7xl font-black text-teal-900">100%</h3>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-[var(--sea-accent)]">
              Licensed &amp; insured
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 h-48 w-48 bg-[var(--sea-accent)] opacity-20 showcase-clip-wing-bl transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translateX(0)]" />
      </section>

      {/* Map / service area */}
      <section className="showcase-map-section bg-slate-50 px-8 py-32 md:px-24">
        <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="showcase-reveal space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Where we work</p>
            <h2 className="text-5xl font-extrabold leading-tight">
              Halifax, HRM, and communities along the Nova Scotia coast.
            </h2>
          </div>
          <div className="showcase-reveal flex items-end">
            <p className="border-l-4 border-[var(--sea-accent)] pl-10 text-lg italic text-slate-600">
              &ldquo;From urban infill to shore-side renos—if you&apos;re ready to build, we&apos;re
              ready to listen.&rdquo;
            </p>
          </div>
        </div>

        <div className="mb-16 flex flex-wrap gap-12 overflow-hidden border-b border-slate-200">
          <span className="border-b-4 border-[var(--sea-accent)] pb-6 text-sm font-bold uppercase tracking-widest">
            Nova Scotia
          </span>
          <span className="pb-6 text-sm font-bold uppercase tracking-widest text-slate-400">
            Atlantic Canada
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="group relative aspect-video overflow-hidden rounded-sm bg-slate-900 lg:col-span-8">
            <Image
              src={SERVICE_AREA_IMAGE.src}
              alt="Seaside project within Halifax and Nova Scotia service area"
              fill
              className="object-cover opacity-30 grayscale transition-all duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div
              className="showcase-map-dot bg-[var(--sea-accent)]"
              style={{ top: "38%", left: "72%", animationDelay: "100ms" }}
            />
            <div
              className="showcase-map-dot bg-[var(--sea-accent)]"
              style={{ top: "42%", left: "78%", animationDelay: "200ms" }}
            />
            <div
              className="showcase-map-dot bg-[var(--sea-accent)]"
              style={{ top: "48%", left: "70%", animationDelay: "300ms" }}
            />
          </div>
          <div className="space-y-16 lg:col-span-4">
            <div className="showcase-reveal">
              <h3 className="text-7xl font-black text-teal-900">902</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                Local area code · HRM &amp; shore
              </p>
            </div>
            <div className="showcase-reveal" style={{ transitionDelay: "200ms" }}>
              <h3 className="text-7xl font-black text-teal-900">24h</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                Quote requests answered promptly
              </p>
            </div>
            <Link
              href="/#contact"
              className="block w-full bg-teal-900 py-6 text-center text-sm font-bold uppercase tracking-widest text-white shadow-xl transition-all hover:bg-teal-800"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative bg-white px-8 py-32 md:px-24">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div className="showcase-reveal">
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">How we deliver</p>
            <h2 className="mb-8 text-5xl font-extrabold text-slate-900">Field execution with finish-level detail</h2>
            <p className="mb-12 text-lg text-slate-600">
              Every scope in this gallery reflects our process: inspect the substrate, protect critical
              transitions, and finish each elevation with alignment and weather durability in mind. The same
              standards carry across siding, trim, openings, and full exterior packages.
            </p>
            <div className="flex items-center gap-12 border-t border-slate-100 pt-12">
              <div>
                <h4 className="text-2xl font-bold">Seaside Contracting</h4>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Halifax &amp; coastal Nova Scotia
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/#contact"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 transition-all hover:bg-slate-900 hover:text-white"
                  aria-label="Contact"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/#services"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 transition-all hover:bg-slate-900 hover:text-white"
                  aria-label="Services"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="showcase-reveal relative" style={{ transitionDelay: "300ms" }}>
            <div className="absolute right-0 top-0 h-full w-32 bg-[var(--sea-accent)]/10 showcase-clip-wing-tr" />
            <div className="relative aspect-[4/5] w-full overflow-hidden showcase-owner-mask">
              <Image
                src={TEAM_IMAGE.src}
                alt="Seaside exterior project showing precision field execution"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -right-8 bottom-20 h-32 w-32 bg-[var(--sea-accent)] showcase-clip-wing-tr [transform:translateX(0)]" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-slate-50 px-8 py-32 md:px-24">
        <div className="showcase-reveal mb-16 flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Completed projects</p>
            <h2 className="text-4xl font-extrabold">Browse projects by scope</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              Filter by service category and open any image in fullscreen for a closer look at field details.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/pricing"
              className="border-b-2 border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest transition hover:border-teal-900"
            >
              See pricing
            </Link>
            <Link
              href="/"
              className="border-b-2 border-slate-300 pb-1 text-xs font-bold uppercase tracking-widest transition hover:border-teal-900"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="showcase-reveal mb-10 flex flex-wrap gap-3">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
              }}
              className={`rounded-sm border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                category === activeCategory
                  ? "border-teal-900 bg-teal-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-teal-900 hover:text-teal-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {filteredGallery.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="showcase-reveal group"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="relative mb-8 aspect-video overflow-hidden bg-slate-300">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-teal-900/40 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-4 top-4 bg-[var(--sea-accent)] px-3 py-1 text-[10px] font-bold uppercase text-slate-900">
                  {item.category}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-sm bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-900 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
                  aria-label={`Open ${item.title} fullscreen`}
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Fullscreen
                </button>
              </div>
              <h3 className="text-2xl font-bold leading-tight transition-colors group-hover:text-teal-900">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {item.detail}
              </p>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {item.category} | Halifax | HRM | Coastal Nova Scotia
              </p>
            </div>
          ))}
        </div>
      </section>

      {lightboxIndex !== null && filteredGallery[lightboxIndex] ? (
        <div
          className="fixed inset-0 z-[80] bg-slate-950/95 p-4 md:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-7xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4 text-white">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--sea-accent)]">
                  {filteredGallery[lightboxIndex].category}
                </p>
                <h3 className="mt-2 text-xl font-bold md:text-2xl">
                  {filteredGallery[lightboxIndex].title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-white/75">
                  {filteredGallery[lightboxIndex].detail}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
                aria-label="Close fullscreen gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-white/10 bg-slate-900">
              <Image
                src={filteredGallery[lightboxIndex].image.src}
                alt={filteredGallery[lightboxIndex].image.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-white">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === null ? 0 : (prev - 1 + filteredGallery.length) % filteredGallery.length,
                  )
                }
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-white/10"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                {lightboxIndex + 1} of {filteredGallery.length}
              </p>
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev === null ? 0 : (prev + 1) % filteredGallery.length,
                  )
                }
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-white/10"
                aria-label="Next image"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[var(--sea-dark)] px-8 pb-16 pt-32 text-white md:px-24">
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-20 translate-y-20 bg-[var(--sea-accent)] opacity-10 showcase-clip-wing-bl" />
        <div className="relative z-10 mb-32 grid grid-cols-1 gap-20 md:grid-cols-4">
          <div className="space-y-8 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={withBasePath("/brand/newlogolight.png")}
                alt="Seaside Contracting"
                width={280}
                height={80}
                className="h-12 w-auto object-contain object-left"
                unoptimized
              />
            </Link>
            <p className="max-w-sm text-lg text-slate-400">
              Full-service residential construction for Halifax and coastal Nova Scotia—precision,
              accountability, and craft you can see in the details.
            </p>
          </div>
          <div className="space-y-6">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[var(--sea-accent)]">
              Explore
            </h5>
            <ul className="space-y-4 text-slate-300">
              <li>
                <Link href="/#services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#exterior-design" className="transition hover:text-white">
                  Exterior designer
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="text-xs font-bold uppercase tracking-widest text-[var(--sea-accent)]">
              Connect
            </h5>
            <p className="text-slate-300">
              <a href="tel:+19028099412" className="font-semibold text-white hover:text-[var(--sea-accent)]">
                (902) 809-9412
              </a>
            </p>
            <p className="text-slate-300">
              <a
                href="mailto:info@seasidecontracting.ca"
                className="hover:text-[var(--sea-accent)]"
              >
                info@seasidecontracting.ca
              </a>
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:bg-[var(--sea-accent)] hover:text-slate-900"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:bg-[var(--sea-accent)] hover:text-slate-900"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition hover:bg-[var(--sea-accent)] hover:text-slate-900"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-6 border-t border-white/10 pt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Seaside Contracting. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/" className="transition hover:text-white">
              Main site
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function startCounter(el: HTMLElement) {
  if (el.dataset.started === "true") return;
  el.dataset.started = "true";
  const target = parseFloat(el.getAttribute("data-count-target") ?? "0");
  if (Number.isNaN(target)) return;
  let current = 0;
  const duration = 2000;
  const step = 20;
  const increment = target / (duration / step);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = String(Math.round(target));
      clearInterval(timer);
    } else {
      el.textContent = String(Math.floor(current));
    }
  }, step);
}
