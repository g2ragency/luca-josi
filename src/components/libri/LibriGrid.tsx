"use client";

import { ElencoVuoto, Filtri, useFiltro } from "@/components/Filtri";
import { Scheda } from "@/components/Scheda";
import { etichettaTipo, tipi, type Libro } from "@/content/libri";

const opzioni = tipi.map((tipo) => ({ valore: tipo.valore, etichetta: tipo.filtro }));

/**
 * Sfalsamento delle due colonne (Figma): la colonna destra parte più in basso di mezza
 * copertina (449px su 898, cioè il 68.03% della larghezza della colonna: nelle griglie i
 * margini in % sono calcolati sulla larghezza della cella).
 * Il primo libro a destra scende di quella misura; dalla seconda riga in poi è il libro a
 * sinistra a risalire della stessa misura, così le colonne restano a 100px di distanza
 * tra una scheda e l'altra e l'ordine nel codice resta quello di lettura.
 */
function sfalsamento(i: number) {
  if (i === 1) return "md:mt-[68.03%]";
  if (i > 0 && i % 2 === 0) return "md:-mt-[68.03%]";
  return "";
}

/** Elenco dei libri su due colonne sfalsate; su mobile una colonna sola. */
export function LibriGrid({ libri }: { libri: Libro[] }) {
  const filtro = useFiltro(libri, (libro, tipo) => libro.tipo === tipo);

  return (
    <>
      <Filtri opzioni={opzioni} attivo={filtro.attivo} onCambia={filtro.cambia} />

      <div
        key={filtro.chiave}
        className={`mt-16 mb-20 grid items-start gap-12 px-4 md:mt-[100px] md:mb-[101px] md:grid-cols-2 md:gap-x-6 md:gap-y-[100px] md:px-12 ${filtro.animazione}`}
      >
        {filtro.visibili.map((libro, i) => (
          <div key={libro.slug} className={sfalsamento(i)}>
            <Scheda
              href={`/libri/${libro.slug}`}
              immagine={libro.copertina}
              sopratitolo={libro.editore}
              titolo={libro.titolo}
              etichette={[etichettaTipo(libro.tipo)]}
              aspetto="aspect-[660/898]"
              sizes="(min-width: 768px) 46vw, 100vw"
              priority={i < 2}
            />
          </div>
        ))}
        {filtro.visibili.length === 0 && <ElencoVuoto />}
      </div>
    </>
  );
}
