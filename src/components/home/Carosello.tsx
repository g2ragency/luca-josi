"use client";

import { useLayoutEffect, useRef } from "react";
import { Media } from "@/components/ui";
import { gsap } from "@/lib/gsap";

/**
 * Carosello di foto verticali (Figma: 432×576, tre per schermo). Su desktop lo scroll è
 * "forzato" in orizzontale: quando il carosello arriva al centro dello schermo la pagina
 * si ferma e, scorrendo, le foto passano da destra a sinistra; finite le foto la pagina
 * riprende a scendere. Lo spostamento è 1:1 con lo scroll. Su mobile e con "riduci
 * movimento" si scorre a mano in orizzontale.
 */
export function Carosello({ foto }: { foto: { src?: string; alt: string }[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const traccia = root.querySelector<HTMLElement>("[data-traccia]");
      if (!traccia) return;
      // Quanto manca da vedere: larghezza di tutte le foto meno quella visibile.
      const distanza = () => Math.max(0, traccia.scrollWidth - traccia.clientWidth);

      gsap.to(traccia, {
        x: () => -distanza(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "center center",
          end: () => `+=${distanza()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} aria-label="Foto" className="overflow-hidden">
      <div className="px-4 md:px-12">
        <ul
          data-traccia
          className="flex gap-4 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto md:gap-6 motion-reduce:overflow-x-auto"
        >
          {foto.map((f, i) => (
            <li key={i} className="w-[75vw] shrink-0 snap-start md:w-[calc((100%-3rem)/3)]">
              <Media src={f.src} alt={f.alt} sizes="(min-width: 768px) 30vw, 75vw" className="aspect-[432/576]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
