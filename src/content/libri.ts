/**
 * Libri e pubblicazioni. ESEMPI: titoli ed editori presi da Figma, descrizioni segnaposto,
 * immagini ancora da ricevere. Per ogni libro vero: aggiungere `copertina` (usata
 * nell'elenco e al centro dell'immagine grande), opzionalmente `sfondo` (colore dietro la
 * copertina nella pagina del libro, es. "#1d3557") e le foto della `galleria`.
 * L'ordine dell'array è l'ordine nell'elenco e in "Libro precedente/successivo".
 */

import type { FotoGalleria } from "@/content/comune";

export type TipoLibro = "libro" | "pubblicazione" | "altro";

/** `filtro`: testo del filtro in cima all'elenco; `etichetta`: testo sotto ogni scheda. */
export const tipi: { valore: TipoLibro; filtro: string; etichetta: string }[] = [
  { valore: "libro", filtro: "Libri", etichetta: "Libro" },
  { valore: "pubblicazione", filtro: "Pubblicazioni", etichetta: "Pubblicazione" },
  { valore: "altro", filtro: "Altro", etichetta: "Altro" },
];

export function etichettaTipo(tipo: TipoLibro) {
  return tipi.find((t) => t.valore === tipo)?.etichetta ?? tipo;
}

export type Libro = {
  slug: string;
  editore: string;
  titolo: string;
  tipo: TipoLibro;
  copertina?: string;
  sfondo?: string;
  descrizioneTitolo: string;
  descrizione: string;
  galleria: FotoGalleria[];
};

const descrizione =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat";

function esempio(slug: string, editore: string, titolo: string, tipo: TipoLibro): Libro {
  return {
    slug,
    editore,
    titolo,
    tipo,
    descrizioneTitolo: "Titolo della descrizione",
    descrizione,
    galleria: Array.from({ length: 4 }, (_, k) => ({ alt: `Foto ${k + 1}: ${titolo}` })),
  };
}

export const libri: Libro[] = [
  esempio("il-lustro-del-lustro", "Rizzoli", "Il lustro del lustro", "libro"),
  esempio("venetians-il-segreto-dellarsenale", "Sonzogno", "Venetians — Il segreto dell’Arsenale", "libro"),
  esempio("pubblicazione-1", "Casa Editrice", "Nome pubblicazione", "pubblicazione"),
  esempio("pubblicazione-2", "Casa Editrice", "Nome pubblicazione", "pubblicazione"),
  esempio("pubblicazione-3", "Casa Editrice", "Nome pubblicazione", "pubblicazione"),
  esempio("pubblicazione-4", "Casa Editrice", "Nome pubblicazione", "pubblicazione"),
];

export function trovaLibro(slug: string) {
  return libri.find((libro) => libro.slug === slug);
}
