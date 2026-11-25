"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Secondi per scorrere una larghezza di schermo (riferimento: data-marquee-speed="25"). */
const VELOCITA = 25;
/** Spostamento legato allo scroll, in % della larghezza dello schermo (data-marquee-scroll-speed="10"). */
const SPOSTAMENTO_SCROLL = 10;
/** Copie della fila oltre all'originale, perché il giro non si interrompa mai. */
const COPIE = 2;

/**
 * Fila che scorre da sola (come la newsletter di paulkalkbrenner.net, stessa logica e stessi
 * valori): verso destra quando si scorre la pagina in giù, verso sinistra quando si torna su.
 * In più, mentre attraversa lo schermo, tutta la fila si sposta di ±10% della larghezza
 * dello schermo insieme allo scroll. `inverso` scambia i due versi (per due file affiancate
 * che vanno in direzioni opposte). Con "riduci movimento" resta ferma.
 *
 * `elementi` sono già pronti con il loro spazio a destra; la fila viene ripetuta tre volte
 * e le copie sono nascoste ai lettori di schermo.
 */
export function Scorrevole({ elementi, inverso = false }: { elementi: ReactNode[]; inverso?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const verso = inverso ? -1 : 1;

    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scorrimento = root.querySelector<HTMLElement>("[data-scorrimento]");
      const file = gsap.utils.toArray<HTMLElement>("[data-fila]");
      if (!scorrimento || file.length === 0) return;

      // Su schermi piccoli il giro dura meno (come nel riferimento), così non sembra fermo.
      const moltiplicatore = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;
      const durata = VELOCITA * (file[0].offsetWidth / window.innerWidth) * moltiplicatore;

      const giro = gsap
        .to(file, { xPercent: -100, repeat: -1, duration: durata, ease: "none" })
        .totalProgress(0.5)
        .timeScale(verso);

      // Scroll in giù: la fila va verso destra (giro all'indietro); scroll in su: verso sinistra.
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => giro.timeScale((self.direction === 1 ? -1 : 1) * verso),
      });

      gsap.fromTo(
        scorrimento,
        { x: `${-SPOSTAMENTO_SCROLL * verso}vw` },
        {
          x: `${SPOSTAMENTO_SCROLL * verso}vw`,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, [inverso]);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      {/* Più larga dello schermo del doppio dello spostamento, così i bordi non restano mai vuoti. */}
      <div data-scorrimento className="-ml-[10%] flex w-[120%]">
        {Array.from({ length: COPIE + 1 }, (_, copia) => (
          <ul key={copia} data-fila aria-hidden={copia > 0 ? true : undefined} className="flex shrink-0">
            {elementi.map((elemento, i) => (
              <li key={i} className="shrink-0">
                {elemento}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
