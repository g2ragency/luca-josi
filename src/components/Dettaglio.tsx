import type { ReactNode } from "react";
import { Galleria } from "@/components/Galleria";
import { TransitionLink } from "@/components/PageTransition";
import { ArrowCircle, Chip } from "@/components/ui";
import type { FotoGalleria } from "@/content/comune";

type Vicino = { href: string; titolo: string };

/**
 * Pagina di dettaglio di un progetto o di un libro (in Figma hanno la stessa struttura):
 * intestazione, immagine grande (`hero`, riempie il riquadro 1344×758), descrizione,
 * galleria e link all'elemento precedente/successivo. `voce` è la parola dei link
 * ("Progetto" → "Progetto precedente").
 */
export function Dettaglio({
  sopratitolo,
  titolo,
  etichette,
  hero,
  descrizioneTitolo,
  descrizione,
  galleria,
  voce,
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
  voce: string;
  precedente: Vicino;
  successivo: Vicino;
}) {
  return (
    <article>
      <header className="px-4 pt-[100px] md:px-12 md:pt-[125px]">
        <p className="text-[24px] leading-[36px] text-grey-testi">{sopratitolo}</p>
        <h1 data-reveal="heading" className="mt-[7px] text-h1">
          {titolo}
        </h1>
        <ul className="mt-[11px] flex flex-wrap gap-6">
          {etichette.map((etichetta) => (
            <li key={etichetta}>
              <Chip>{etichetta}</Chip>
            </li>
          ))}
        </ul>
      </header>

      <div className="relative mx-4 mt-16 aspect-[1344/758] md:mx-12 md:mt-[91px]">{hero}</div>

      <section className="mt-16 grid gap-6 px-4 md:mt-[100px] md:grid-cols-2 md:px-12">
        <h2 className="text-[24px] leading-[36px] font-semibold">{descrizioneTitolo}</h2>
        <p className="text-body text-grey-testi">{descrizione}</p>
      </section>

      <Galleria foto={galleria} />

      <nav
        aria-label={`${voce} precedente e successivo`}
        className="mt-16 mb-20 flex items-center justify-between gap-6 px-4 text-[18px] leading-[28px] font-semibold md:mt-[102px] md:mb-[100px] md:px-12"
      >
        <TransitionLink href={precedente.href} className="flex items-center gap-3">
          <ArrowCircle direzione="sinistra" />
          <span>
            {voce} precedente<span className="sr-only">: {precedente.titolo}</span>
          </span>
        </TransitionLink>
        <TransitionLink href={successivo.href} className="flex items-center gap-3 text-right">
          <span>
            {voce} successivo<span className="sr-only">: {successivo.titolo}</span>
          </span>
          <ArrowCircle />
        </TransitionLink>
      </nav>
    </article>
  );
}
