/** Tipi e funzioni in comune tra le sezioni con pagina di dettaglio (portfolio, libri). */

export type FotoGalleria = { src?: string; alt: string };

/** Elemento precedente e successivo nell'elenco (dopo l'ultimo si ricomincia dal primo). */
export function viciniDi<T extends { slug: string }>(lista: T[], slug: string) {
  const i = lista.findIndex((elemento) => elemento.slug === slug);
  const n = lista.length;
  return {
    precedente: lista[(i - 1 + n) % n],
    successivo: lista[(i + 1) % n],
  };
}
