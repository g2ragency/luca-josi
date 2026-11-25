"use client";

import { useLayoutEffect, useRef } from "react";
import { LogoLucaJosi, FRAZIONE_INIZIALI, SPOSTAMENTO_J } from "@/components/LogoLucaJosi";
import { TransitionLink } from "@/components/PageTransition";
import { classePulsante, TestoPulsante } from "@/components/ui";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const links = [
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/libri", label: "Pubblicazioni" },
  { href: "/articoli", label: "Articoli" },
];

/** Dopo quanti px di scroll la navbar si raccoglie al centro. */
const SOGLIA = 100;
/** Larghezza del logo esteso nell'header (Figma: 130px). */
const LARGHEZZA_LOGO = 130;
/** Pillola: spazio a sinistra del logo, distanze tra logo, menu e Contatti, spazio a destra. */
const PAD_SX = 20;
const DIST_LOGO = 40;
const DIST_CONTATTI = 32;
const PAD_DX = 6;

/**
 * Navbar fissa in alto. In cima alla pagina: logo esteso a sinistra, menu al centro,
 * Contatti a destra. Appena si scorre (come su symbolstudio.pl) logo e Contatti scivolano
 * verso il centro e dietro compare una pillola nera che li raccoglie con il menu (logo e
 * menu diventano bianchi, Contatti bianco con testo nero, grigio al passaggio); il logo
 * intanto si stringe nelle iniziali "LJ" ("uca" e "osi" svaniscono e la J raggiunge la L).
 * Tornando in cima si riapre. Le voci del menu hanno la stessa animazione dei pulsanti
 * (scritta che rotola), senza sfondo.
 */
export function Header() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const [logo] = q("[data-nav-logo]");
    const [menu] = q("[data-nav-menu]");
    const [contatti] = q("[data-nav-contatti]");
    const [pillola] = q("[data-nav-pillola]");
    const uca = q("[data-logo-uca]");
    const osi = q("[data-logo-osi]");
    const j = q("[data-logo-j]");
    if (!logo || !menu || !contatti || !pillola) return;

    let compatta = false;
    /** I colori "chiari su nero" (data-compatta) tornano scuri solo a pillola quasi svanita. */
    let ritornoColori: gsap.core.Tween | undefined;
    const colori = (scuri: boolean) => {
      root.dataset.compatta = scuri ? "true" : "false";
    };
    const fermo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** Posizione a riposo (senza spostamenti) di un elemento, in px dal bordo sinistro. */
    const sinistra = (el: Element) => el.getBoundingClientRect().left - Number(gsap.getProperty(el, "x"));

    /** Dove vanno logo, menu, Contatti e pillola quando la navbar è raccolta. */
    const misure = () => {
      const larghezzaIniziali = LARGHEZZA_LOGO * FRAZIONE_INIZIALI;
      const larghezzaMenu = menu.getBoundingClientRect().width;
      const larghezzaContatti = contatti.getBoundingClientRect().width;
      const conMenu = larghezzaMenu > 0;
      const larghezzaPillola =
        PAD_SX +
        larghezzaIniziali +
        (conMenu ? DIST_LOGO + larghezzaMenu + DIST_CONTATTI : 24) +
        larghezzaContatti +
        PAD_DX;
      const inizio = (window.innerWidth - larghezzaPillola) / 2;
      const xLogo = inizio + PAD_SX;
      const xMenu = xLogo + larghezzaIniziali + DIST_LOGO;
      const xContatti = conMenu ? xMenu + larghezzaMenu + DIST_CONTATTI : xLogo + larghezzaIniziali + 24;
      return {
        logo: xLogo - sinistra(logo),
        menu: conMenu ? xMenu - sinistra(menu) : 0,
        contatti: xContatti - sinistra(contatti),
        pillola: { left: inizio, width: larghezzaPillola },
        // Pillola "aperta": dal logo a Contatti, con gli stessi margini, a barra distesa.
        pillolaAperta: {
          left: sinistra(logo) - PAD_SX,
          width: sinistra(contatti) + larghezzaContatti + PAD_DX - (sinistra(logo) - PAD_SX),
        },
      };
    };

    const durata = fermo ? 0 : 0.8;

    const raccogli = (subito = false) => {
      ritornoColori?.kill();
      colori(true);
      const m = misure();
      const d = subito ? 0 : durata;
      gsap.to(logo, { x: m.logo, duration: d, overwrite: true });
      gsap.to(menu, { x: m.menu, duration: d, overwrite: true });
      gsap.to(contatti, { x: m.contatti, duration: d, overwrite: true });
      gsap.to(uca, { opacity: 0, x: -30, duration: d * 0.5, overwrite: true });
      gsap.to(osi, { opacity: 0, x: SPOSTAMENTO_J, duration: d * 0.5, overwrite: true });
      gsap.to(j, { x: SPOSTAMENTO_J, duration: d, overwrite: true });
      // La fascia bianca compare subito larga quanto la barra distesa (copre ciò che c'è sotto
      // mentre gli elementi si muovono) e si stringe con loro fino alla pillola.
      if (!compatta && !subito) gsap.set(pillola, m.pillolaAperta);
      gsap.to(pillola, { ...m.pillola, duration: d, overwrite: true });
      gsap.to(pillola, { autoAlpha: 1, duration: d * 0.3, overwrite: false });
      compatta = true;
    };

    const apri = () => {
      gsap.to([logo, menu, contatti], { x: 0, duration: durata, overwrite: true });
      gsap.to(j, { x: 0, duration: durata, overwrite: true });
      gsap.to([...uca, ...osi], { opacity: 1, x: 0, duration: durata * 0.6, delay: durata * 0.4, overwrite: true });
      // Al contrario: la pillola si allarga con gli elementi e svanisce verso la fine.
      const m = misure();
      gsap.to(pillola, { ...m.pillolaAperta, duration: durata, overwrite: true });
      gsap.to(pillola, { autoAlpha: 0, duration: durata * 0.35, delay: durata * 0.65, overwrite: false });
      ritornoColori = gsap.delayedCall(durata * 0.6, () => colori(false));
      compatta = false;
    };

    const trigger = ScrollTrigger.create({
      start: SOGLIA,
      end: "max",
      onEnter: () => raccogli(),
      onLeaveBack: () => apri(),
    });
    if (trigger.isActive) raccogli(true);

    // Se cambia la larghezza dello schermo, la pillola va ricalcolata.
    const ridimensiona = () => {
      if (compatta) raccogli(true);
    };
    window.addEventListener("resize", ridimensiona);

    return () => {
      ritornoColori?.kill();
      trigger.kill();
      window.removeEventListener("resize", ridimensiona);
      gsap.killTweensOf([logo, menu, contatti, pillola, ...uca, ...osi, ...j]);
    };
  }, []);

  return (
    <header
      ref={rootRef}
      data-compatta="false"
      className="group/nav pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-[15px] text-button md:px-12"
    >
      {/* Pillola nera della navbar raccolta (Contatti dentro, con 6px di margine). */}
      <div
        data-nav-pillola
        aria-hidden="true"
        className="invisible absolute top-[9px] left-0 h-[57px] rounded-[10px] bg-black opacity-0 shadow-[0_8px_30px_rgb(0_0_0/0.12)]"
      />
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center">
        <TransitionLink
          data-nav-logo
          href="/"
          aria-label="Luca Josi, home"
          className="pointer-events-auto justify-self-start transition-colors duration-500 group-data-[compatta=true]/nav:text-white"
        >
          <LogoLucaJosi className="block h-auto w-[130px]" />
        </TransitionLink>

        {/* La versione mobile del menu non è ancora disegnata: per ora sotto i 768px restano logo e Contatti. */}
        <nav
          data-nav-menu
          aria-label="Principale"
          className="pointer-events-auto hidden items-center gap-12 transition-colors duration-500 group-data-[compatta=true]/nav:text-white md:flex"
        >
          {links.map((link) => (
            <TransitionLink key={link.href} href={link.href} className="group/pulsante block">
              <TestoPulsante>{link.label}</TestoPulsante>
            </TransitionLink>
          ))}
        </nav>

        <TransitionLink
          data-nav-contatti
          href="/contatti"
          className={`pointer-events-auto col-start-3 justify-self-end ${classePulsante} group-data-[compatta=true]/nav:bg-white group-data-[compatta=true]/nav:text-black group-data-[compatta=true]/nav:hover:bg-grey`}
        >
          <TestoPulsante>Contatti</TestoPulsante>
        </TransitionLink>
      </div>
    </header>
  );
}
