"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { TransitionLink } from "@/components/PageTransition";
import { linkedin, linkLegali, linkSito } from "@/content/contatti";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function Colonna({ titolo, children }: { titolo: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-body font-semibold text-grey-testi uppercase">{titolo}</h2>
      <ul className="mt-[2px] text-button">{children}</ul>
    </div>
  );
}

/**
 * Footer di tutte le pagine (Figma: frame CONTATTI). Effetto come su paulkalkbrenner.net:
 * mentre il footer entra dal fondo dello schermo, il suo contenuto parte spostato verso
 * l'alto (-75%) e coperto da un velo nero al 50%, e arriva al suo posto, senza velo,
 * quando si tocca il fondo della pagina. Sembra così che il footer stia sotto la pagina e
 * venga scoperto.
 */
export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "clamp(top bottom)",
            end: "clamp(top top)",
            scrub: true,
            // Il footer resta montato tra le pagine, quindi è creato prima delle animazioni
            // della pagina nuova: va ricalcolato per ultimo, dopo le sezioni bloccate (pin)
            // che allungano la pagina (es. i ricordi di Chi sono), altrimenti parte troppo presto.
            refreshPriority: -1,
          },
        })
        .from("[data-footer-contenuto]", { yPercent: -75, ease: "none" })
        .from("[data-footer-velo]", { opacity: 0.5, ease: "none" }, "<");
    });

    // Il footer resta montato tra una pagina e l'altra: quando l'altezza della pagina cambia
    // (filtri, immagini, liste animate) le posizioni dello scroll vanno ricalcolate.
    const pagina = document.querySelector("[data-page]");
    let attesa: number | undefined;
    const osservatore = new ResizeObserver(() => {
      window.clearTimeout(attesa);
      attesa = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    if (pagina) osservatore.observe(pagina);

    return () => {
      osservatore.disconnect();
      window.clearTimeout(attesa);
      mm.revert();
    };
  }, []);

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-black text-white">
      <div data-footer-contenuto className="px-4 pt-16 pb-10 md:px-12 md:pt-[100px] md:pb-[39px]">
        <Image
          src="/brand/logo-luca-josi-bianco.svg"
          alt="Luca Josi"
          width={1344}
          height={252}
          unoptimized
          className="h-auto w-full"
        />

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-[203px] md:grid-cols-[342fr_798fr_204fr] md:gap-0">
          <Colonna titolo="Sito">
            {linkSito.map((link) => (
              <li key={link.href}>
                <TransitionLink href={link.href}>{link.label}</TransitionLink>
              </li>
            ))}
          </Colonna>
          <Colonna titolo="Links">
            {linkLegali.map((link) => (
              <li key={link.label}>{link.href ? <TransitionLink href={link.href}>{link.label}</TransitionLink> : link.label}</li>
            ))}
          </Colonna>
          <div>
            <Colonna titolo="Seguimi">
              <li>
                {linkedin ? (
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    Linkedin
                  </a>
                ) : (
                  "Linkedin"
                )}
              </li>
            </Colonna>
            {/* L'anno è quello del browser: può differire da quello della build. */}
            <p className="mt-6 text-button md:mt-[36px]" suppressHydrationWarning>
              Luca Josi
              <br />@{new Date().getFullYear()} Tutti i diritti riservati
            </p>
          </div>
        </div>
      </div>
      <div data-footer-velo aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] bg-black opacity-0" />
    </footer>
  );
}
