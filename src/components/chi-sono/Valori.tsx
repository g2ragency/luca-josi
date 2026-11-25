"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { valori, type Valore } from "@/content/chi-sono";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Distanza dall'alto dello schermo a cui si ferma il primo valore (px). */
const STACK_TOP = 48;
/** Di quanto ogni valore si ferma più in basso del precedente: è anche l'altezza della striscia che resta visibile. */
const STACK_STEP = 60;
/** Altezza di un valore in Figma (da linea a linea); diventa più alta se un testo non ci sta. */
const DEFAULT_CARD_HEIGHT = 363;
const PADDING_TOP = 34;
const PADDING_BOTTOM = 55;

function Linea() {
  return (
    <div className="absolute inset-x-0 top-0 h-px bg-grey">
      <div data-progress className="h-full origin-left bg-black" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

function Contenuto({ valore, numero }: { valore: Valore; numero: number }) {
  return (
    <>
      <span className="absolute top-6 right-0 text-button">{numero}</span>
      <div data-content className="grid gap-6 md:grid-cols-2">
        <div>
          {/* Pallino grigio da 7px e testo 16px più a destra (Figma). */}
          <p className="flex items-center gap-[9px] text-button">
            <span aria-hidden="true" className="size-[7px] shrink-0 rounded-full bg-grey" />
            {valore.etichetta}
          </p>
          <h3 className="mt-6 max-w-[432px] text-h4 md:mt-[34px]">{valore.titolo}</h3>
        </div>
        <p className="text-body text-grey-testi md:mt-[50px]">{valore.testo}</p>
      </div>
    </>
  );
}

/**
 * Elenco dei valori con l'effetto "carte impilate" (riferimento: lamalama.com/about-us,
 * sezione core values). Su desktop ogni valore si ferma in alto, 60px sotto il precedente;
 * mentre arriva, la linea in cima si riempie di nero e il valore sopra si richiude fino a
 * lasciare visibile solo la sua striscia (linea, etichetta, numero). Quando sono impilati
 * tutti, scorrono via insieme.
 *
 * Struttura come nel riferimento: un elenco invisibile dà l'altezza alla sezione, sopra
 * c'è la copia visibile con i valori "sticky". Su mobile (e con "riduci movimento") si
 * vede solo l'elenco normale.
 */
export function Valori() {
  const rootRef = useRef<HTMLDivElement>(null);
  const count = valori.length;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        stack: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        list: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (context.conditions?.list) {
          // Mobile: la linea di ogni valore si riempie mentre lo si scorre.
          gsap.utils.toArray<HTMLElement>("[data-static] li").forEach((item) => {
            gsap.fromTo(
              item.querySelector("[data-progress]"),
              { scaleX: 0 },
              { scaleX: 1, ease: "none", scrollTrigger: { trigger: item, start: "top 85%", end: "top 35%", scrub: true } },
            );
          });
          return;
        }

        // Tutti i valori hanno la stessa altezza: quella del più lungo (minimo come in Figma).
        const contents = gsap.utils.toArray<HTMLElement>("[data-static] [data-content]");
        let cardHeight = DEFAULT_CARD_HEIGHT;
        const measure = () => {
          cardHeight = Math.max(
            DEFAULT_CARD_HEIGHT,
            ...contents.map((el) => Math.ceil(el.offsetHeight) + PADDING_TOP + PADDING_BOTTOM),
          );
          root.style.setProperty("--card-h", `${cardHeight}px`);
        };
        measure();
        ScrollTrigger.addEventListener("refreshInit", measure);

        const staticItems = gsap.utils.toArray<HTMLElement>("[data-static] li");
        const cards = gsap.utils.toArray<HTMLElement>("[data-valore-card]");

        cards.forEach((card, n) => {
          const stickyTop = STACK_TOP + STACK_STEP * n;
          // Il valore n arriva: dal bordo inferiore del valore sopra fino al suo posto.
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: staticItems[n],
              start: () => `top ${stickyTop + cardHeight - STACK_STEP}px`,
              end: () => `top ${stickyTop}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          timeline.fromTo(card.querySelector("[data-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
          if (n > 0) {
            timeline.fromTo(
              cards[n - 1],
              { clipPath: "inset(0px 0px 0px 0px)" },
              { clipPath: () => `inset(0px 0px ${cardHeight - STACK_STEP}px 0px)`, ease: "none" },
              0,
            );
          }
        });

        return () => ScrollTrigger.removeEventListener("refreshInit", measure);
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="mt-20 px-4 md:mt-[117px] md:px-12">
      <div
        ref={rootRef}
        className="relative"
        style={{ "--card-h": `${DEFAULT_CARD_HEIGHT}px` } as CSSProperties}
      >
        {/* Elenco "vero" su mobile; su desktop invisibile, serve solo a dare l'altezza. */}
        <ol data-static className="motion-safe:md:invisible">
          {valori.map((valore, i) => (
            <li key={i} className="relative pt-[34px] pb-12 md:h-[var(--card-h)] md:pb-[55px]">
              <Linea />
              <Contenuto valore={valore} numero={i + 1} />
            </li>
          ))}
        </ol>

        {/* Copia visibile su desktop: ogni valore è sticky dentro una fascia che arriva fino
            in fondo alla sezione, con un margine sotto che li fa ripartire tutti insieme. */}
        <ol className="absolute inset-0 hidden motion-safe:md:block">
          {valori.map((valore, n) => (
            <li
              key={n}
              className="absolute inset-x-0 bottom-0"
              style={{ top: `${(100 * n) / count}%` }}
            >
              <div
                className="sticky"
                style={{ top: STACK_TOP + STACK_STEP * n, paddingBottom: STACK_STEP * (count - 1 - n) }}
              >
                <div data-valore-card className="relative h-[var(--card-h)] bg-white pt-[34px] pb-[55px]">
                  <Linea />
                  <Contenuto valore={valore} numero={n + 1} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
