import type { ReactNode } from "react";
import { Galleria } from "@/components/Galleria";
import { TransitionLink } from "@/components/PageTransition";
import { ArrowCircle, Chip } from "@/components/ui";
import type { FotoGalleria } from "@/content/comune";

/** Link a un elemento vicino: `testo` è quello visibile ("Progetto precedente"). */
export type Vicino = { href: string; titolo: string; testo: string };

/** Sopratitolo grigio (cliente, casa editrice, categoria), titolo grande ed etichette. */
export function IntestazioneDettaglio({
  sopratitolo,
  titolo,
  etichette = [],
}: {
  sopratitolo: string;
  titolo: string;
  etichette?: string[];
}) {
  return (
    <header className="px-4 pt-[100px] md:px-12 md:pt-[125px]">
      <p className="text-h5 font-normal text-grey-testi">{sopratitolo}</p>
      <h1 data-reveal="heading" className="mt-[11px] text-h1">
        {titolo}
      </h1>
      {etichette.length > 0 && (
        <ul className="mt-[11px] flex flex-wrap gap-6">
          {etichette.map((etichetta) => (
            <li key={etichetta}>
              <Chip>{etichetta}</Chip>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

/**
 * "Precedente" a sinistra e "successivo" a destra, con le frecce tonde.
 * `margine`: distanza dal contenuto sopra su desktop (cambia tra le pagine in Figma).
 */
export function NavVicini({
  etichetta,
  precedente,
  successivo,
  margine = "md:mt-[102px]",
}: {
  etichetta: string;
  precedente: Vicino;
  successivo: Vicino;
  margine?: string;
}) {
  return (
    <nav
      aria-label={etichetta}
      className={`mt-16 mb-20 flex items-center justify-between gap-6 px-4 text-[18px] leading-[28px] font-semibold md:mb-[100px] md:px-12 ${margine}`}
    >
      <TransitionLink href={precedente.href} className="flex items-center gap-3">
        <ArrowCircle direzione="sinistra" />
        <span>
          {precedente.testo}
          <span className="sr-only">: {precedente.titolo}</span>
        </span>
      </TransitionLink>
      <TransitionLink href={successivo.href} className="flex items-center gap-3 text-right">
        <span>
          {successivo.testo}
          <span className="sr-only">: {successivo.titolo}</span>
        </span>
        <ArrowCircle />
      </TransitionLink>
    </nav>
  );
}

/**
 * Pagina di dettaglio di un progetto o di una pubblicazione (in Figma hanno la stessa
 * struttura): intestazione, immagine grande (`hero`, riempie il riquadro 1344×758),
 * descrizione, galleria e link all'elemento precedente/successivo.
 */
export function Dettaglio({
  sopratitolo,
  titolo,
  etichette,
  hero,
  descrizioneTitolo,
  descrizione,
  galleria,
  navigazione,
  precedente,
  successivo,
}: {
  sopratitolo: string;
  titolo: string;
  etichette: string[];
  hero: ReactNode;
  descrizioneTitolo: string;
  descrizione: string;
  galleria: FotoGalleria[];
  navigazione: string;
  precedente: Vicino;
  successivo: Vicino;
}) {
  return (
    <article>
      <IntestazioneDettaglio sopratitolo={sopratitolo} titolo={titolo} etichette={etichette} />

      <div className="relative mx-4 mt-16 aspect-[1344/758] md:mx-12 md:mt-[91px]">{hero}</div>

      <section className="mt-16 grid gap-6 px-4 md:mt-[100px] md:grid-cols-2 md:px-12">
        <h2 className="text-h5">{descrizioneTitolo}</h2>
        <p className="text-body text-grey-testi">{descrizione}</p>
      </section>

      <Galleria foto={galleria} />

      <NavVicini etichetta={navigazione} precedente={precedente} successivo={successivo} />
    </article>
  );
}
