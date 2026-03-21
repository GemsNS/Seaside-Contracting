import Image from "next/image";
import Link from "next/link";
import { MaritimeFooterBanner } from "@/components/maritime/MaritimeFooterBanner";
import { withBasePath } from "@/lib/withBasePath";
import { NovaScotiaFlag } from "@/components/NovaScotiaFlag";

const quick = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-black text-base-white [box-shadow:inset_0_3px_0_0_var(--ns-saltire-blue)]">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <MaritimeFooterBanner />
        </div>

        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-start md:justify-between md:gap-x-8 lg:gap-12">
          {/* Logo card: centered on mobile, left-aligned from md when in a row */}
          <div className="flex w-fit max-w-full shrink-0 justify-center self-center md:self-start md:justify-start">
            <div className="w-fit max-w-full rounded-lg bg-white p-2.5 shadow-sm sm:p-3">
              <Image
                src={withBasePath("/brand/logo-main.png")}
                alt="Seaside Contracting"
                width={360}
                height={120}
                unoptimized
                className="h-auto w-auto max-w-[220px] object-contain object-left sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px]"
              />
            </div>
          </div>

          <nav className="shrink-0 text-left" aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-aqua">
              Navigate
            </p>
            <ul className="mt-3 space-y-2 text-sm font-semibold sm:mt-4">
              {quick.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-base-white/85 hover:text-primary-aqua">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 shrink-0 text-left md:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-aqua">
              Contact
            </p>
            <ul className="mt-3 space-y-2.5 text-sm text-base-white/85 sm:mt-4 sm:space-y-3">
              <li>
                <a href="tel:+19028099412" className="font-semibold hover:text-primary-aqua">
                  (902) 809-9412
                </a>
              </li>
              <li>
                <a href="mailto:info@seasidecontracting.ca" className="hover:text-primary-aqua">
                  info@seasidecontracting.ca
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <NovaScotiaFlag
                  size={22}
                  className="mt-0.5 shrink-0 rounded-sm shadow-sm ring-1 ring-white/15"
                />
                <span>Halifax, Nova Scotia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8">
          <p className="text-xs text-base-white/55">
            © 2026 Seaside Contracting. All rights reserved.
          </p>
          <p className="mt-3">
            <Link
              href="/brand-preview"
              className="text-[11px] text-base-white/35 underline-offset-2 transition-colors hover:text-primary-aqua/90 hover:underline"
            >
              Brand &amp; fleet reference
            </Link>
            <span className="mx-2 text-base-white/25" aria-hidden>
              ·
            </span>
            <span className="text-[11px] text-base-white/30">Internal use — not in main menu</span>
          </p>
          <p className="mt-4 text-[11px] text-base-white/40">made by: joel</p>
        </div>
      </div>
    </footer>
  );
}
