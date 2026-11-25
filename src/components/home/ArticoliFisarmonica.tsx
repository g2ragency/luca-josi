"use client";

import { useEffect, useId, useRef, useState } from "react";
import { TransitionLink } from "@/components/PageTransition";
import { classePulsante, TestoPulsante } from "@/components/ui";
import type { Articolo } from "@/content/articoli";

/**
 * Tempi e curve della fisarmonica di festivaldellageopolitica.it:
 * - apertura/chiusura: altezza e opacità in 380ms;
 * - fascia al passaggio del mouse: scende dall'alto in 1s;
 * - rientro del contenuto: 0,3s; rotazione della freccia: 0,35s.
 */
const APRI_DURATA = 380;
const APRI_CURVA = "cubic-bezier(0.2, 0.7, 0.2, 1)";

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
        className={`size-full transition-transform duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${aperto ? "rotate-180" : ""}`}
      >
        <path d="M14.5 19.5L22.5 27.5L30.5 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Riga({ articolo, aperto, onClick }: { articolo: Articolo; aperto: boolean; onClick: () => void }) {
  const idContenuto = useId();
  const contenutoRef = useRef<HTMLDivElement>(null);
  const primaVolta = useRef(true);

  // Apre e chiude animando l'altezza (da 0 all'altezza del contenuto) e l'opacità.
  useEffect(() => {
    const contenuto = contenutoRef.current;
    if (!contenuto) return;
    const fermo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (primaVolta.current || fermo) {
      primaVolta.current = false;
      contenuto.style.height = aperto ? "auto" : "0px";
      contenuto.style.opacity = aperto ? "1" : "0";
      return;
    }
    const altezza = contenuto.scrollHeight;
    const animazione = contenuto.animate(
      {
        height: aperto ? ["0px", `${altezza}px`] : [`${altezza}px`, "0px"],
        opacity: aperto ? [0, 1] : [1, 0],
      },
      { duration: APRI_DURATA, easing: APRI_CURVA },
    );
    contenuto.style.height = aperto ? "auto" : "0px";
    contenuto.style.opacity = aperto ? "1" : "0";
    return () => animazione.cancel();
  }, [aperto]);

  return (
    <li className="border-t border-grey">
      <h3>
        {/* Al passaggio del mouse una fascia grigio chiaro scende dall'alto e riempie la riga
            (::before), mentre titolo e freccia rientrano di 24px dai bordi. */}
        <button
          type="button"
          aria-expanded={aperto}
          aria-controls={idContenuto}
          onClick={onClick}
          className="group/riga relative z-0 flex min-h-[110px] w-full cursor-pointer items-center justify-between gap-6 py-6 text-left before:absolute before:inset-0 before:-z-10 before:origin-top before:scale-y-0 before:bg-grey-chiaro before:transition-transform before:duration-1000 before:ease-[cubic-bezier(0.19,1,0.22,1)] hover:before:scale-y-100"
        >
          <span className="text-h5 transition-[padding] duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] md:group-hover/riga:px-6">
            {articolo.titolo}
          </span>
          <span className="transition-[padding] duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] md:group-hover/riga:px-6">
            <Freccia aperto={aperto} />
          </span>
        </button>
      </h3>
      <div
        ref={contenutoRef}
        id={idContenuto}
        role="region"
        aria-label={articolo.titolo}
        inert={!aperto}
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="grid gap-6 pb-12 md:grid-cols-2 md:pb-[52px]">
          <div className="md:col-start-2">
            <p className="line-clamp-8 text-body text-grey-testi">{articolo.estratto}</p>
            <TransitionLink href={`/articoli/${articolo.slug}`} className={`mt-4 ${classePulsante}`}>
              <TestoPulsante>Leggi di più</TestoPulsante>
            </TransitionLink>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Ultimi articoli in home, a fisarmonica: aspetto e disposizione di Figma (righe da 110px,
 * titolo e cerchio con la freccia), animazioni come festivaldellageopolitica.it ma con la
 * fascia grigio chiaro invece che nera. Si apre un articolo alla volta.
 */
export function ArticoliFisarmonica({ articoli, className = "" }: { articoli: Articolo[]; className?: string }) {
  const [aperto, setAperto] = useState<number | null>(null);

  return (
    <ul className={`border-b border-grey ${className}`}>
      {articoli.map((articolo, i) => (
        <Riga
          key={articolo.slug}
          articolo={articolo}
          aperto={aperto === i}
          onClick={() => setAperto(aperto === i ? null : i)}
        />
      ))}
    </ul>
  );
}
