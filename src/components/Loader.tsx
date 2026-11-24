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
 * (per scheda del browser). I tracciati sono quelli di
 * public/brand/firma.svg (Figma, frame CARICAMENTO), inline perché vanno animati.
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
      <svg
        ref={signatureRef}
        width="211.649"
        height="163.665"
        viewBox="0 0 211.649 163.665"
        fill="none"
        overflow="visible"
        className="invisible h-auto max-w-[50vw] opacity-0"
      >
        <g stroke="white" strokeWidth="2.46641" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23.929 71.7959C23.929 71.7959 46.8034 44.9055 56.669 33.9267C66.5565 22.9479 82.0971 3.93689 84.2797 1.36135C86.4842 -1.19237 61.9729 34.8434 36.9159 73.6076C11.8589 112.372 -2.2411 132.714 1.97144 135.464C6.18399 138.214 16.7481 124.398 16.7481 124.398" />
          <path d="M61.1435 62.3668C54.5518 61.5374 53.3077 67.3215 53.1986 68.5438C53.024 70.7483 54.5082 72.1015 56.036 72.3635C59.7684 72.9746 60.6415 70.7919 66.5347 63.8511C72.4278 56.932 74.8943 55.6879 76.4876 56.6483C78.0591 57.6086 75.5272 62.476 73.8029 65.3571C72.0786 68.2382 69.8305 73.0619 69.8305 73.0619C69.8305 73.0619 72.8644 71.3813 80.722 63.8729C82.9483 61.7557 85.6985 58.7436 87.9029 59.5076C91.7663 60.8172 88.0339 69.2859 88.5796 74.3933" />
          <path d="M123.568 51.3444C113.135 50.9733 116.932 35.5637 120.992 28.4701C131.709 9.85192 145.285 -1.03957 154.474 4.5044C166.915 12.0346 146.638 46.4552 125.576 71.0757C108.027 91.5927 56.2543 155.676 64.3083 162.071C66.5128 163.817 71.3583 159.081 77.2515 151.245" />
          <path d="M134.197 73.6294C142.033 76.0958 157.53 73.4329 156.853 63.1963C156.766 61.9303 156.439 60.6425 155.675 59.6385C154.103 57.5213 151.331 56.6264 148.843 57.9579C141.684 61.8212 141.618 72.036 143.605 74.0223C149.541 80.0246 165.671 65.6845 172.132 59.5075C180.601 51.6718 185.643 64.0257 183.656 70.6828" />
          <path d="M210.416 51.6063C209.543 55.0113 208.386 57.5213 205.745 59.835" />
        </g>
      </svg>
    </div>
  );
}
