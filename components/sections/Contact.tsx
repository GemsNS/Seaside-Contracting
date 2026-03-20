"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const easeArchitectural = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-neutral-offwhite py-20 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeArchitectural }}
          className="max-w-2xl"
        >
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold tracking-tight text-base-black sm:text-4xl"
          >
            Start Your Project
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: easeArchitectural }}
            className="lg:col-span-7"
          >
            <div className="rounded-lg border border-base-black/8 bg-base-white p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeArchitectural }}
            className="lg:col-span-5"
          >
            <ul className="space-y-5 text-base text-base-black/85">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-aqua" strokeWidth={2} aria-hidden />
                <a href="tel:+19028099412" className="font-semibold hover:text-primary-aqua">
                  (902) 809-9412
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-aqua" strokeWidth={2} aria-hidden />
                <a href="mailto:info@seasidecontracting.ca" className="hover:text-primary-aqua">
                  info@seasidecontracting.ca
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-aqua" strokeWidth={2} aria-hidden />
                <span>Halifax, Nova Scotia</span>
              </li>
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
