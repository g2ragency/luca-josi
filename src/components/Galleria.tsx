"use client";

import { useEffect, useRef } from "react";
import { Media } from "@/components/ui";
import type { FotoGalleria } from "@/content/comune";
import { gsap } from "@/lib/gsap";

/** Quanto prosegue la galleria dopo aver lasciato il mouse, in proporzione alla velocità. */
const INERZIA = 400;

/**
 * Galleria orizzontale del progetto (in Figma la terza foto esce dal bordo destro).
 * Scorre in orizzontale con trackpad, touch e frecce da tastiera; con il mouse si trascina
 * e, lasciandola, prosegue per inerzia.
 */
export function Galleria({ foto }: { foto: FotoGalleria[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let attivo = false;
    let partenzaX = 0;
    let partenzaScroll = 0;
    let ultimaX = 0;
    let ultimoTempo = 0;
    let velocita = 0;

    const giu = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      attivo = true;
      partenzaX = ultimaX = e.clientX;
      partenzaScroll = el.scrollLeft;
      ultimoTempo = performance.now();
      velocita = 0;
      gsap.killTweensOf(el);
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const muovi = (e: PointerEvent) => {
      if (!attivo) return;
      el.scrollLeft = partenzaScroll - (e.clientX - partenzaX);
      const ora = performance.now();
      if (ora > ultimoTempo) velocita = (e.clientX - ultimaX) / (ora - ultimoTempo);
      ultimaX = e.clientX;
      ultimoTempo = ora;
    };
    const su = (e: PointerEvent) => {
      if (!attivo) return;
      attivo = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
      gsap.to(el, { scrollLeft: el.scrollLeft - velocita * INERZIA, duration: 0.9, ease: "power3.out" });
    };

    el.addEventListener("pointerdown", giu);
    el.addEventListener("pointermove", muovi);
    el.addEventListener("pointerup", su);
    el.addEventListener("pointercancel", su);
    return () => {
      el.removeEventListener("pointerdown", giu);
      el.removeEventListener("pointermove", muovi);
      el.removeEventListener("pointerup", su);
      el.removeEventListener("pointercancel", su);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Galleria del progetto"
      tabIndex={0}
      data-lenis-prevent-horizontal
      className="mt-16 flex cursor-grab gap-6 overflow-x-auto px-4 select-none [scrollbar-width:none] md:mt-[100px] md:px-12 [&::-webkit-scrollbar]:hidden"
    >
      {foto.map((f, i) => (
        <Media
          key={i}
          src={f.src}
          alt={f.alt}
          sizes="(min-width: 768px) 38vw, 75vw"
          className="pointer-events-none aspect-[546/728] w-[75vw] shrink-0 md:w-[37.9vw]"
        />
      ))}
      {/* Margine finale: il padding destro nei contenitori che scorrono non sempre viene rispettato. */}
      <div aria-hidden="true" className="w-px shrink-0" />
    </div>
  );
}
