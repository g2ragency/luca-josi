import { TransitionLink } from "@/components/PageTransition";
import { Chip, Media } from "@/components/ui";

/**
 * Scheda degli elenchi (portfolio, libri): immagine che si ingrandisce al passaggio,
 * sopratitolo grigio (cliente, casa editrice), titolo ed etichette.
 * `aspetto` è la classe con le proporzioni dell'immagine.
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
}: {
  href: string;
  immagine?: string;
  sopratitolo: string;
  titolo: string;
  etichette: string[];
  aspetto: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <article>
      <TransitionLink href={href} className="group block">
        <Media src={immagine} alt={titolo} sizes={sizes} priority={priority} zoomOnHover className={aspetto} />
        <p className="mt-3 text-body text-grey-testi">{sopratitolo}</p>
        <h2 className="mt-1 text-[24px] leading-[36px] font-semibold">{titolo}</h2>
      </TransitionLink>
      <ul className="mt-[5px] flex flex-wrap gap-2">
        {etichette.map((etichetta) => (
          <li key={etichetta}>
            <Chip>{etichetta}</Chip>
          </li>
        ))}
      </ul>
    </article>
  );
}
