import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ExteriorDesigner } from "@/components/sections/ExteriorDesigner";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ValueProposition } from "@/components/sections/ValueProposition";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ExteriorDesigner />
      <Services />
      <About />
      <Contact />
    </>
  );
}
