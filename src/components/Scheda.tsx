import { TransitionLink } from "@/components/PageTransition";
import { Chip, classePulsante, Media, TestoPulsante } from "@/components/ui";

/**
 * Scheda degli elenchi: immagine che si ingrandisce al passaggio, sopratitolo grigio
 * (cliente, casa editrice) e titolo. `aspetto` è la classe con le proporzioni dell'immagine.
 *
 * Due varianti, come in Figma:
 * - senza `pulsante` (Portfolio): etichette sotto il titolo;
 * - con `pulsante` (Pubblicazioni): etichette sopra l'immagine, in alto a sinistra, e sotto
 *   il titolo il pulsante grigio ("Scopri di più").
 */
export function Scheda({
  href,
  immagine,
  sopratitolo,
  titolo,
  etichette,
  aspetto,
  sizes,
  priority = false,
  pulsante,
}: {
  href: string;
  immagine?: string;
  sopratitolo: string;
  titolo: string;
  etichette: string[];
  aspetto: string;
  sizes: string;
  priority?: boolean;
  pulsante?: string;
}) {
  const elencoEtichette = (className: string) => (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {etichette.map((etichetta) => (
        <li key={etichetta}>
          <Chip>{etichetta}</Chip>
        </li>
      ))}
    </ul>
  );

  return (
    <article>
      <TransitionLink href={href} className="group block">
        <div className="relative">
          <Media src={immagine} alt={titolo} sizes={sizes} priority={priority} zoomOnHover className={aspetto} />
          {pulsante && elencoEtichette("absolute top-[10px] left-[10px]")}
        </div>
        <p className={`text-body text-grey-testi ${pulsante ? "mt-[17px]" : "mt-3"}`}>{sopratitolo}</p>
        <h2 className="mt-1 text-h5">{titolo}</h2>
        {pulsante && (
          <span className={`mt-[14px] ${classePulsante}`}>
            <TestoPulsante>{pulsante}</TestoPulsante>
          </span>
        )}
      </TransitionLink>
      {!pulsante && elencoEtichette("mt-[5px]")}
    </article>
  );
}
