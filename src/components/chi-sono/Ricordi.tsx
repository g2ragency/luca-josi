"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { TransitionLink } from "@/components/PageTransition";
import { ArrowCircle, Chip } from "@/components/ui";
import { brano, ricordi } from "@/content/chi-sono";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * Dove si ferma ogni card quando è a fuoco: scostamento dal centro (x in vw, y in vh)
 * e larghezza (in vw su desktop, il doppio su mobile). Si ripete se le card sono di più.
 */
const LAYOUT = [
  { x: 0, y: -2, w: 30 },
  { x: -27, y: -14, w: 19 },
  { x: 25, y: 10, w: 22 },
  { x: -22, y: 15, w: 14 },
  { x: 30, y: -17, w: 12 },
  { x: -8, y: -6, w: 26 },
  { x: 22, y: -4, w: 20 },
  { x: -30, y: 2, w: 18 },
  { x: 10, y: 12, w: 24 },
];

/** Profondità di partenza (lontanissima) e di uscita (ha superato lo schermo), in px. */
const Z_FAR = -3600;
const Z_PAST = 700;
/** Tempi relativi: avvicinamento fino al fuoco, uscita, distanza tra una card e l'altra. */
const APPROACH = 1;
const PASS = 0.35;
const SPACING = 0.33;
/** Punto dell'avvicinamento in cui la card è già nitida (0–1); resta nitida fino a metà uscita. */
const SHARP_FROM = 0.8;
/** Quanto si scorre (in altezze dello schermo) per passare da una card alla successiva. */
const SCROLL_PER_CARD = 0.9;

/**
 * Sezione "ricordi" di Chi sono: si blocca sullo schermo mentre le card arrivano dal fondo
 * verso chi guarda, sfocate da lontano e nitide quando sono a fuoco. Intanto l'anno in
 * basso scorre dal 1991 a oggi, passando per gli anni intermedi, e coincide con l'anno
 * della card a fuoco.
 */
export function Ricordi() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const year = yearRef.current;
    if (!section || !track || !year || ricordi.length === 0) return;

    const currentYear = new Date().getFullYear();
    const years = ricordi.map((ricordo) => ricordo.anno ?? currentYear);
    const focusTimes = ricordi.map((_, i) => i * SPACING + APPROACH);
    const first = focusTimes[0];
    const last = focusTimes[focusTimes.length - 1];

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });

      cards.forEach((card, i) => {
        const at = i * SPACING;
        gsap.set(card, { xPercent: -50, yPercent: -50, z: Z_FAR, autoAlpha: 0, filter: "blur(16px)" });
        // Si avvicina rallentando e diventa nitida prima di arrivare a fuoco; resta nitida
        // anche nella prima metà dell'uscita, poi si sfoca e sparisce oltre lo schermo.
        const passHalf = at + APPROACH + PASS * 0.5;
        timeline
          .to(card, { z: 0, duration: APPROACH, ease: "power2.out" }, at)
          .to(card, { filter: "blur(0px)", duration: APPROACH * SHARP_FROM, ease: "power1.in" }, at)
          .to(card, { autoAlpha: 1, duration: APPROACH * 0.35 }, at)
          .to(card, { z: Z_PAST, duration: PASS, ease: "power2.in" }, at + APPROACH)
          .to(card, { filter: "blur(10px)", duration: PASS * 0.5, ease: "power1.in" }, passHalf)
          .to(card, { autoAlpha: 0, duration: PASS * 0.5 }, passHalf);
      });

      const moveYear = gsap.quickSetter(year, "x", "px");
      let shownYear = "";

      const render = (progress: number) => {
        const time = first + progress * (last - first);
        timeline.time(time);

        // Anno tra quello della card a fuoco e quello della successiva.
        let label = years[0];
        if (years.length > 1) {
          let i = 0;
          while (i < focusTimes.length - 2 && time >= focusTimes[i + 1]) i++;
          const k = gsap.utils.clamp(0, 1, (time - focusTimes[i]) / (focusTimes[i + 1] - focusTimes[i]));
          label = Math.round(years[i] + k * (years[i + 1] - years[i]));
        }
        if (String(label) !== shownYear) {
          shownYear = String(label);
          year.textContent = shownYear;
        }
        moveYear(progress * (track.clientWidth - year.offsetWidth));
      };

      render(0);
      if (prefersReducedMotion() || cards.length < 2) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${(cards.length - 1) * window.innerHeight * SCROLL_PER_CARD}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Ricordi dal 1991 a oggi"
      className="relative h-svh min-h-[600px] overflow-hidden border-y border-grey bg-white"
    >
      <div className="absolute inset-x-0 top-0 bottom-[110px] [perspective:1000px]">
        {ricordi.map((ricordo, i) => {
          const layout = LAYOUT[i % LAYOUT.length];
          return (
            <div
              key={`${ricordo.anno ?? "oggi"}-${i}`}
              data-card
              className="invisible absolute flex aspect-[4/3] w-[calc(var(--w)*2vw)] items-center justify-center rounded-[5px] bg-grey/87 text-button text-grey-testi will-change-[transform,filter] md:w-[calc(var(--w)*1vw)]"
              style={
                {
                  left: `calc(50% + ${layout.x}vw)`,
                  top: `calc(50% + ${layout.y}vh)`,
                  "--w": layout.w,
                } as CSSProperties
              }
            >
              {ricordo.didascalia}
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-[39px] grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 text-button md:px-12">
        <div className="flex items-center gap-5 justify-self-start">
          {/* Lettore musicale: in attesa del brano vero, il pulsante non fa nulla. */}
          <button
            type="button"
            disabled
            aria-label={`Riproduci ${brano.artista} — ${brano.titolo}`}
            className="shrink-0"
          >
            <Image src="/icons/play.svg" alt="" width={45} height={45} unoptimized />
          </button>
          <span className="hidden lg:inline">
            {brano.artista} — {brano.titolo}
          </span>
        </div>

        <div className="flex items-center gap-1" aria-hidden="true">
          <Chip>1991</Chip>
          <div ref={trackRef} className="relative flex h-[33px] w-[80px] items-center sm:w-[160px] md:w-[300px]">
            <div className="h-[14px] w-full bg-[repeating-linear-gradient(to_right,var(--color-grey)_0_1px,transparent_1px_4px)]" />
            <span
              ref={yearRef}
              className="absolute top-0 left-0 rounded-[5px] bg-black px-[14px] py-[6px] text-white tabular-nums"
            >
              {ricordi[0]?.anno ?? "Oggi"}
            </span>
          </div>
          <Chip>OGGI</Chip>
        </div>

        <TransitionLink
          href="/contatti"
          aria-label="Contatti"
          className="flex items-center gap-5 justify-self-end"
        >
          <span className="hidden lg:inline">Contatti</span>
          <ArrowCircle />
        </TransitionLink>
      </div>
    </section>
  );
}
