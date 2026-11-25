/**
 * Pubblicazioni (libri, pubblicazioni, prefazioni…). ESEMPI: titoli, editori ed etichette
 * presi da Figma, descrizioni segnaposto. Immagini: c'è solo la foto de "Il lustro del
 * lustro" (dal file Figma); per le altre aggiungere `copertina` (elenco e, se manca `hero`,
 * immagine grande della pagina), opzionalmente `hero` e le foto della `galleria`.
 * L'ordine dell'array è l'ordine nell'elenco e in "Pubblicazione precedente/successiva".
 */

import type { FotoGalleria } from "@/content/comune";

export type TipoLibro = "libro" | "pubblicazione" | "altro";

/** `filtro`: testo del filtro in cima all'elenco; `etichetta`: testo sull'immagine. */
export const tipi: { valore: TipoLibro; filtro: string; etichetta: string }[] = [
  { valore: "libro", filtro: "Libri", etichetta: "Libro" },
  { valore: "pubblicazione", filtro: "Pubblicazioni", etichetta: "Pubblicazione" },
  { valore: "altro", filtro: "Altro", etichetta: "Altro" },
];

export type Libro = {
  slug: string;
  editore: string;
  titolo: string;
  tipo: TipoLibro;
  /** Testo dell'etichetta se diverso da quello del tipo (es. "Prefazione" tra gli "Altro"). */
  etichetta?: string;
  copertina?: string;
  hero?: string;
  descrizioneTitolo: string;
  descrizione: string;
  galleria: FotoGalleria[];
};

export function etichettaDi(libro: Libro) {
  return libro.etichetta ?? tipi.find((t) => t.valore === libro.tipo)?.etichetta ?? libro.tipo;
}

const descrizione =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat";

function esempio(slug: string, editore: string, titolo: string, tipo: TipoLibro, extra: Partial<Libro> = {}): Libro {
  return {
    slug,
    editore,
    titolo,
    tipo,
    descrizioneTitolo: "Titolo della descrizione",
    descrizione,
    galleria: Array.from({ length: 4 }, (_, k) => ({ alt: `Foto ${k + 1}: ${titolo}` })),
    ...extra,
  };
}

export const libri: Libro[] = [
  esempio("il-lustro-del-lustro", "Rizzoli", "Il lustro del lustro", "libro", {
    copertina: "/pubblicazioni/il-lustro-del-lustro.jpg",
  }),
  esempio("venetians-il-segreto-dellarsenale", "Sonzogno", "Venetians — Il segreto dell’Arsenale", "libro"),
  esempio("pubblicazione-1", "Casa Editrice", "Nome pubblicazione", "pubblicazione"),
  esempio("prefazione-1", "Casa Editrice", "Nome pubblicazione", "altro", { etichetta: "Prefazione" }),
  esempio("altro-1", "Casa Editrice", "Nome pubblicazione", "altro"),
  esempio("prefazione-2", "Casa Editrice", "Nome pubblicazione", "altro", { etichetta: "Prefazione" }),
];

export function trovaLibro(slug: string) {
  return libri.find((libro) => libro.slug === slug);
}
