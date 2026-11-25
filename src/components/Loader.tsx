"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion, prepareHeadingReveal } from "@/lib/gsap";
import { INTRO_SEEN_KEY } from "@/lib/intro";
import { getLenis } from "@/lib/smooth-scroll";

/** Durata complessiva della scrittura della firma, ripartita sui tratti in base alla lunghezza. */
const WRITING_SECONDS = 1.6;
/** Pausa tra un tratto e l'altro, come quando si stacca la penna dal foglio. */
const PEN_LIFT_SECONDS = 0.06;

/**
 * Schermata di caricamento: sfondo nero e la firma di Luca Josi che si scrive tratto per
 * tratto, poi la schermata sale e scopre la pagina. Si vede una volta per sessione
 * (per scheda del browser). I tracciati sono quelli di public/brand/firma.svg
 * (esportata da Illustrator, nera su tavola 1920×1080), inline perché vanno animati.
 */
export function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const signature = signatureRef.current;
    if (!root || !signature) return;
    // Già vista in questa sessione: il CSS la tiene nascosta (vedi src/lib/intro.ts).
    if (document.documentElement.hasAttribute("data-intro-seen")) return;

    const lenis = getLenis();
    lenis?.stop();
    let cancelled = false;

    const ctx = gsap.context(() => {
      const strokes = Array.from(signature.querySelectorAll("path"));
      const lengths = strokes.map((stroke) => stroke.getTotalLength());
      const totalLength = lengths.reduce((sum, length) => sum + length, 0);

      // Tratto nascosto: trattino lungo quanto il tracciato, spostato appena oltre l'inizio.
      // Il +1/+2 evita che l'estremità arrotondata si veda come un puntino prima del tempo.
      strokes.forEach((stroke, i) =>
        gsap.set(stroke, {
          strokeDasharray: `${lengths[i]} ${lengths[i] + 2}`,
          strokeDashoffset: lengths[i] + 1,
        }),
      );
      gsap.set(signature, { autoAlpha: 1 });

      const finish = () => {
        lenis?.start();
        gsap.set(root, { display: "none" });
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {
          // sessionStorage non disponibile (es. alcune modalità private): la firma tornerà a ogni visita.
        }
      };
      const timeline = gsap.timeline({ paused: true, onComplete: finish });

      if (prefersReducedMotion()) {
        timeline
          .set(strokes, { strokeDashoffset: 0 })
          .to(root, { autoAlpha: 0, duration: 0.4 }, 0.8);
      } else {
        let headings: ReturnType<typeof prepareHeadingReveal> | undefined;
        strokes.forEach((stroke, i) => {
          timeline.to(
            stroke,
            {
              strokeDashoffset: 0,
              duration: Math.max(0.12, (WRITING_SECONDS * lengths[i]) / totalLength),
              ease: "sine.inOut",
            },
            i === 0 ? 0.15 : `+=${PEN_LIFT_SECONDS}`,
          );
        });
        timeline
          .call(() => {
            headings = prepareHeadingReveal(document.querySelector("[data-page]"));
          }, [], "+=0.3")
          .to(signature, { autoAlpha: 0, yPercent: -20, duration: 0.5, ease: "power2.in" })
          .to(root, { yPercent: -100, duration: 0.9 }, "<0.2")
          .call(() => headings?.play(), [], "<0.45");
      }

      // Aspetta i font, altrimenti i titoli verrebbero divisi in righe sbagliate.
      document.fonts.ready.then(() => {
        if (!cancelled) timeline.play();
      });
    }, root);

    return () => {
      cancelled = true;
      lenis?.start();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-loader
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      {/* viewBox ritagliato sui tratti della tavola 1920×1080 di Illustrator, più 5 di margine
          per lo spessore del tratto (10). Larga 212px come la firma precedente. */}
      <svg
        ref={signatureRef}
        width="212"
        height="141.3"
        viewBox="501 234 918 612"
        fill="none"
        overflow="visible"
        className="invisible h-auto max-w-[50vw] opacity-0"
      >
        <g stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
          <path d="M615.9,421.1c69.9-63.4,108.4-76.4,191.9-180.1,0,0-109.6,111.6-196.1,262.2s-105.2,233.3-105.2,233.3c0,0,10.5-11,26.5-55" />
          <path d="M729.2,438.6c-6.4,19.3-36.8,61.2-44.5,73.1s-15,25.7-11.3,27.1c8,2.9,50.7-53.1,69.6-66.7s-20.4,32.4-12.7,47.8,64-30,104.7-46.4c0,0-7.3,10.2-8.2,21.3s18.2-8.2,26.2-16.2,28.9-38.4,20.9-43.9-35.2,34.2-46,67.7,62.9,26.8,126.6,1" />
          <path d="M1083.3,374c-14.8-9.5-19-22.5,26.1-73.5s59.3-65,67.6-59.5-42.7,108.1-91.3,206.4c-17.5,35.4-44.2,83.2-73,134.5l-13.9,24.9c-86.6,150.7-105.2,233.3-105.2,233.3,0,0,10.5-11,26.5-55" />
          <path d="M1121.7,475.7c6.4-10.1,32-33.7,47.6-26.2s11.1,19.6-2.2,35.1-21.6,16.4-32.3,17.1-16.2-6.3-16-15.1c0-3.5.8-7.4,3-11Z" />
          <path d="M1219.8,455.3c-2-6.7,1.8-14.2,12.4-11s22.2,26.1,13.3,45.9c0,0,20.5-27.4,37.3-36.1s13,28.1,35.3,43.6" />
          <path d="M1413.6,372s-.3,15.4-3,30.8" />
        </g>
      </svg>
    </div>
  );
}
