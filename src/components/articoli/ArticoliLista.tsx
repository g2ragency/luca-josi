"use client";

import { useLayoutEffect, useRef } from "react";
import { TransitionLink } from "@/components/PageTransition";
import { classePulsante, TestoPulsante } from "@/components/ui";
import type { Articolo } from "@/content/articoli";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Distanza dall'alto dello schermo a cui si ferma il primo articolo (px): sotto la navbar fissa (pillola alta fino a 66px). */
const IN_ALTO = 90;
/** Altezza della striscia di un articolo chiuso (Figma, "Group 7"): anche il passo della pila. */
const STRISCIA = 110;
/** Altezza di un articolo aperto in Figma (da linea a linea); cresce se un testo non ci sta. */
const ALTEZZA_MINIMA = 352;
/**
 * Il titolo chiudendosi passa da 34/42px (h4) a 24/30px (h5), sale da 67px a 37px dalla
 * linea (centrato nella striscia, come il pulsante) e si allarga fino al pulsante a destra.
 */
const SALITA_TITOLO = -30;
/** Spazio a destra del titolo nella striscia: pulsante "Leggi di più" più 45px di distanza. */
const SPAZIO_PULSANTE = 181;
/** Spazio minimo tra l'articolo aperto e il fondo dello schermo mentre la pila è ferma. */
const MARGINE_BASSO = 24;

function Linea() {
  return (
    <div className="absolute inset-x-0 top-0 h-px bg-grey">
      <div data-progress className="h-full origin-left bg-black" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

function Riga({ articolo }: { articolo: Articolo }) {
  const href = `/articoli/${articolo.slug}`;

  return (
    <li data-card className="relative bg-white">
      <Linea />
      <div data-contenuto className="grid gap-6 pt-[37px] pb-12 md:grid-cols-2 md:pb-[61px]">
        <div>
          <p data-etichetta className="text-button text-grey-testi">
            {articolo.categoria}
          </p>
          {/* Il titolo è il link per tastiera e lettori di schermo; i pulsanti servono al mouse. */}
          <h2 data-titolo className="mt-[9px] max-w-[432px] text-h4">
            <TransitionLink href={href}>{articolo.titolo}</TransitionLink>
          </h2>
          <TransitionLink
            data-leggi
            href={href}
            aria-hidden="true"
            tabIndex={-1}
            className={`mt-[10px] ${classePulsante}`}
          >
            <TestoPulsante>Leggi di più</TestoPulsante>
          </TransitionLink>
        </div>
        <p data-estratto className="line-clamp-8 text-body text-grey-testi md:mt-[30px]">
          {articolo.estratto}
        </p>
      </div>
      {/* Pulsante a destra della striscia quando l'articolo è chiuso (solo nella pila su desktop). */}
      <TransitionLink
        data-leggi-chiuso
        href={href}
        aria-hidden="true"
        tabIndex={-1}
        className={`invisible absolute top-[30px] right-0 opacity-0 ${classePulsante}`}
      >
        <TestoPulsante>Leggi di più</TestoPulsante>
      </TransitionLink>
    </li>
  );
}

/**
 * Elenco degli articoli con l'effetto dei valori di Chi sono (carte impilate): su desktop
 * ogni articolo si ferma in alto, 110px sotto il precedente; mentre arriva, la linea in
 * cima si riempie di nero e l'articolo sopra si richiude nella sua striscia, con il titolo
 * più piccolo e "Leggi di più" a destra (Figma: frame "Group 7" accanto ad ARTICOLI).
 *
 * Gli articoli possono essere tanti: se la pila non sta più nello schermo, le strisce più
 * vecchie escono dall'alto, così l'articolo aperto resta sempre leggibile per intero.
 *
 * Tecnica: la lista è "sticky" e alta quanto la pila finale; la sezione intorno è più alta
 * della lista di tutto lo scorrimento che serve. Le posizioni sono calcolate dallo
 * scorrimento (nessun elemento duplicato). Su mobile, con "riduci movimento" o con un solo
 * articolo resta l'elenco normale.
 */
export function ArticoliLista({ articoli, animazione = "" }: { articoli: Articolo[]; animazione?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        pila: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        lista: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        const linee = cards.map((card) => card.querySelector<HTMLElement>("[data-progress]"));
        const n = cards.length;

        if (context.conditions?.lista || n < 2) {
          // Elenco normale: la linea di ogni articolo si riempie mentre lo si scorre.
          cards.forEach((card, i) => {
            gsap.fromTo(
              linee[i],
              { scaleX: 0 },
              { scaleX: 1, ease: "none", scrollTrigger: { trigger: card, start: "top 85%", end: "top 35%", scrub: true } },
            );
          });
          return;
        }

        const palco = root.querySelector<HTMLElement>("[data-palco]");
        if (!palco) return;

        let altezza = ALTEZZA_MINIMA; // di ogni articolo aperto
        let corsa = altezza - STRISCIA; // scorrimento per far arrivare un articolo
        let posti = n; // strisce che stanno nello schermo sopra l'articolo aperto
        let durata = 0; // scorrimento totale con la lista ferma

        // La prima linea resta dov'è in Figma: la pila parte IN_ALTO px sotto l'inizio della lista.
        gsap.set(root, { marginTop: `-=${IN_ALTO}` });
        gsap.set(palco, { position: "sticky", top: 0 });
        gsap.set(cards, { position: "absolute", top: 0, left: 0, right: 0 });

        const misura = () => {
          const contenuti = cards.map((card) => card.querySelector<HTMLElement>("[data-contenuto]"));
          altezza = Math.max(ALTEZZA_MINIMA, ...contenuti.map((el) => Math.ceil(el?.offsetHeight ?? 0)));
          corsa = altezza - STRISCIA;
          const spazio = window.innerHeight - IN_ALTO - altezza - MARGINE_BASSO;
          posti = Math.max(1, Math.floor(spazio / STRISCIA) + 1);
          durata = (n - 1) * corsa;
          const spostamentoFinale = STRISCIA * Math.max(0, n - posti);
          const altezzaPalco = IN_ALTO + (n - 1) * STRISCIA - spostamentoFinale + altezza;
          gsap.set(cards, { height: altezza });
          gsap.set(palco, { height: altezzaPalco });
          gsap.set(root, { height: altezzaPalco + durata });
        };

        // Chiusura di ogni articolo, da 0 (aperto) a 1 (striscia). Il titolo è uno solo: si
        // rimpicciolisce e si allarga fino alla striscia (le misure dipendono dalla larghezza,
        // quindi si ricalcolano a ogni ridimensionamento con invalidate()).
        const chiusure = cards.map((card) => {
          const titolo = card.querySelector<HTMLElement>("[data-titolo]");
          return gsap
            .timeline({ paused: true, defaults: { ease: "none" } })
            .to(card.querySelector("[data-etichetta]"), { autoAlpha: 0, duration: 0.4 }, 0)
            .to(card.querySelector("[data-estratto]"), { autoAlpha: 0, duration: 0.35 }, 0)
            .fromTo(
              titolo,
              {
                fontSize: 34,
                lineHeight: "42px",
                y: 0,
                maxWidth: "none",
                width: () => Math.min(432, titolo?.parentElement?.clientWidth ?? 432),
              },
              {
                fontSize: 24,
                lineHeight: "30px",
                y: SALITA_TITOLO,
                maxWidth: "none",
                width: () => card.clientWidth - SPAZIO_PULSANTE,
                duration: 1,
              },
              0,
            )
            .to(card.querySelector("[data-leggi]"), { autoAlpha: 0, duration: 0.4 }, 0)
            .fromTo(card.querySelector("[data-leggi-chiuso]"), { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: 0.4 }, 0.6);
        });
        const posizioni = cards.map((card) => gsap.quickSetter(card, "y", "px"));

        /** Dispone gli articoli dopo `t` px di scorrimento a lista ferma. */
        const aggiorna = (t: number) => {
          const passo = gsap.utils.clamp(0, n - 1, t / corsa);
          const k = Math.min(n - 1, Math.floor(passo)); // ultimo articolo arrivato in pila
          const f = k === n - 1 ? 0 : passo - k; // quanto è arrivato il successivo
          const spostamento = STRISCIA * Math.max(0, k + f - (posti - 1));
          const yInArrivo = IN_ALTO + k * STRISCIA + altezza - f * corsa - spostamento;

          cards.forEach((_, i) => {
            posizioni[i](i <= k ? IN_ALTO + i * STRISCIA - spostamento : yInArrivo + (i - k - 1) * altezza);
            chiusure[i].progress(i < k ? 1 : i === k ? f : 0);
            // La linea del primo si riempie prima che la lista si fermi (trigger sotto).
            if (i > 0) gsap.set(linee[i], { scaleX: i <= k ? 1 : i === k + 1 ? f : 0 });
          });
        };

        misura();
        aggiorna(0);
        ScrollTrigger.addEventListener("refreshInit", misura);
        // Larghezze del titolo da ricalcolare quando cambia lo schermo.
        const invalida = () => chiusure.forEach((chiusura) => chiusura.invalidate());
        ScrollTrigger.addEventListener("refreshInit", invalida);

        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: () => `+=${durata}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => aggiorna(self.progress * durata),
          onRefresh: (self) => aggiorna(self.progress * durata),
        });

        gsap.fromTo(
          linee[0],
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: () => `top ${corsa}px`, end: "top top", scrub: true, invalidateOnRefresh: true },
          },
        );

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", misura);
          ScrollTrigger.removeEventListener("refreshInit", invalida);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mt-16 mb-20 px-4 md:mt-[100px] md:mb-[43px] md:px-12">
      <ol data-palco className={`relative ${animazione}`}>
        {articoli.map((articolo) => (
          <Riga key={articolo.slug} articolo={articolo} />
        ))}
      </ol>
    </div>
  );
}
