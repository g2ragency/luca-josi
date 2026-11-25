"use client";

import { useId, useState } from "react";
import { TransitionLink } from "@/components/PageTransition";
import { classePulsante, TestoPulsante } from "@/components/ui";
import type { Articolo } from "@/content/articoli";

/** Cerchio nero con la freccia in giù; ruota in su quando l'articolo è aperto. */
function Freccia({ aperto }: { aperto: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-[45px] shrink-0 items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover/riga:bg-grey-scuro"
    >
      <svg
        viewBox="0 0 45 45"
        fill="none"
        className={`size-full transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] ${aperto ? "rotate-180" : ""}`}
      >
        <path d="M14.5 19.5L22.5 27.5L30.5 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * Ultimi articoli in home, a fisarmonica (Figma): righe da 110px con il titolo e la
 * freccia; al passaggio del mouse la riga diventa grigio chiaro e il contenuto rientra di
 * 24px. Al clic si apre sotto l'estratto con "Leggi di più" (uno alla volta).
 */
export function ArticoliFisarmonica({ articoli, className = "" }: { articoli: Articolo[]; className?: string }) {
  const [aperto, setAperto] = useState<number | null>(null);
  const id = useId();

  return (
    <ul className={`border-b border-grey ${className}`}>
      {articoli.map((articolo, i) => {
        const eAperto = aperto === i;
        const idContenuto = `${id}-${i}`;
        return (
          <li key={articolo.slug} className="border-t border-grey">
            <h3>
              <button
                type="button"
                aria-expanded={eAperto}
                aria-controls={idContenuto}
                onClick={() => setAperto(eAperto ? null : i)}
                className="group/riga flex min-h-[110px] w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-[background-color,padding] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] hover:bg-grey-chiaro md:hover:px-6"
              >
                <span className="text-h5">{articolo.titolo}</span>
                <Freccia aperto={eAperto} />
              </button>
            </h3>
            {/* Altezza animata con le righe della griglia (0fr → 1fr). */}
            <div
              id={idContenuto}
              role="region"
              aria-label={articolo.titolo}
              inert={!eAperto}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] ${
                eAperto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-6 pb-12 md:grid-cols-2 md:pb-[52px]">
                  <div className="md:col-start-2">
                    <p className="line-clamp-8 text-body text-grey-testi">{articolo.estratto}</p>
                    <TransitionLink href={`/articoli/${articolo.slug}`} className={`mt-4 ${classePulsante}`}>
                      <TestoPulsante>Leggi di più</TestoPulsante>
                    </TransitionLink>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
