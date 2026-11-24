"use client";

import { useLayoutEffect, useRef } from "react";
import { valori } from "@/content/chi-sono";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Elenco dei valori. In Figma sulla linea sopra il secondo valore c'è un tratto nero
 * a metà: lo interpreto come avanzamento della lettura, quindi la linea di ogni valore
 * si riempie di nero mentre lo si scorre.
 */
export function Valori() {
  const listRef = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-valore]").forEach((item) => {
        const line = item.querySelector("[data-line]");
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 85%", end: "top 35%", scrub: true },
          },
        );
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <ol ref={listRef} className="mt-20 px-4 md:mt-[117px] md:px-12">
      {valori.map((valore, i) => (
        <li key={i} data-valore className="relative pt-[34px] pb-12 md:pb-[55px]">
          <div className="absolute inset-x-0 top-0 h-px bg-grey">
            <div data-line className="h-full origin-left bg-black" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="absolute top-6 right-0 text-button">{i + 1}</span>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-button uppercase">{valore.etichetta}</p>
              <h3 className="mt-6 max-w-[432px] text-h4 md:mt-[34px]">{valore.titolo}</h3>
            </div>
            <p className="text-body text-grey-testi md:mt-[50px]">{valore.testo}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
