"use client";

import { ElencoVuoto, Filtri, useFiltro } from "@/components/Filtri";
import { Scheda } from "@/components/Scheda";
import { etichettaDi, tipi, type Libro } from "@/content/libri";

const opzioni = tipi.map((tipo) => ({ valore: tipo.valore, etichetta: tipo.filtro }));

/** Elenco delle pubblicazioni: griglia a due colonne (Figma: immagini 660×486), una su mobile. */
export function LibriGrid({ libri }: { libri: Libro[] }) {
  const filtro = useFiltro(libri, (libro, tipo) => libro.tipo === tipo);

  return (
    <>
      <Filtri opzioni={opzioni} attivo={filtro.attivo} onCambia={filtro.cambia} />

      <div
        key={filtro.chiave}
        className={`mt-16 mb-20 grid items-start gap-12 px-4 md:mt-[125px] md:mb-[123px] md:grid-cols-2 md:gap-x-6 md:gap-y-[50px] md:px-12 ${filtro.animazione}`}
      >
        {filtro.visibili.map((libro, i) => (
          <Scheda
            key={libro.slug}
            href={`/libri/${libro.slug}`}
            immagine={libro.copertina}
            sopratitolo={libro.editore}
            titolo={libro.titolo}
            etichette={[etichettaDi(libro)]}
            aspetto="aspect-[660/486]"
            sizes="(min-width: 768px) 46vw, 100vw"
            priority={i < 2}
            pulsante="Scopri di più"
          />
        ))}
        {filtro.visibili.length === 0 && <ElencoVuoto />}
      </div>
    </>
  );
}
