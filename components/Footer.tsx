import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/withBasePath";

const quick = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-black text-base-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="inline-block rounded-lg bg-white p-3 shadow-sm">
              <Image
                src={withBasePath("/brand/logo-main.png")}
                alt="Seaside Contracting"
                width={360}
                height={120}
                unoptimized
                className="h-auto w-[min(100%,280px)] object-contain object-left sm:w-[min(100%,320px)]"
              />
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-aqua">
              Navigate
            </p>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              {quick.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-base-white/85 hover:text-primary-aqua">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-aqua">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-base-white/85">
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
              <li>Halifax, Nova Scotia</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
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
        </div>
      </div>
    </footer>
  );
}
