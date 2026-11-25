"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

/** Colore di partenza dei testi che "si scrivono" scorrendo (richiesto: #DDDDDD). */
const GRIGIO = "#dddddd";
const NERO = "#000000";

/**
 * Di quanto ogni immagine è più alta del suo riquadro, sopra e sotto (in proporzione
 * all'altezza del riquadro). Valori diversi in sequenza: le immagini vicine scorrono a
 * velocità diverse tra loro, come su symbolstudio.pl.
 */
const AMPIEZZE = [0.08, 0.15, 0.11, 0.19, 0.09, 0.14];

/**
 * Effetti legati allo scroll validi in tutto il sito, riattivati a ogni cambio pagina:
 *
 * - `[data-colore-scorrimento]`: il testo parte grigio chiaro e diventa nero lettera per
 *   lettera mentre attraversa lo schermo (scrub: tornando su torna grigio).
 * - `[data-parallasse]` (lo mette `Media` quando c'è un'immagine): l'immagine, un po' più
 *   alta del riquadro, scorre al suo interno più lentamente della pagina.
 *
 * Con "riduci movimento" non fa nulla: testi neri e immagini ferme.
 */
export function EffettiScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const pagina = document.querySelector<HTMLElement>("[data-page]");
    if (!pagina) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits = gsap.utils.toArray<HTMLElement>("[data-colore-scorrimento]", pagina).map((testo) => {
        const split = SplitText.create(testo, { type: "words,chars" });
        gsap.fromTo(
          split.chars,
          { color: GRIGIO },
          {
            color: NERO,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: testo, start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );
        return split;
      });

      gsap.utils.toArray<HTMLElement>("[data-parallasse]", pagina).forEach((riquadro, i) => {
        const immagine = riquadro.querySelector<HTMLElement>("[data-parallasse-img]");
        if (!immagine) return;
        const ampiezza = AMPIEZZE[i % AMPIEZZE.length];
        // L'immagine sborda sopra e sotto; lo spostamento la porta da un bordo all'altro.
        gsap.set(immagine, { top: `${-ampiezza * 100}%`, bottom: `${-ampiezza * 100}%` });
        const spostamento = (100 * ampiezza) / (1 + 2 * ampiezza);
        gsap.fromTo(
          immagine,
          { yPercent: -spostamento },
          {
            yPercent: spostamento,
            ease: "none",
            scrollTrigger: { trigger: riquadro, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      ScrollTrigger.refresh();
      return () => splits.forEach((split) => split.revert());
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
