/**
 * Progetti del portfolio. ESEMPI: testi segnaposto di Figma, immagini ancora da ricevere.
 * Per ogni progetto vero: aggiungere `copertina` (elenco), `hero` (immagine grande in cima),
 * opzionalmente `video` (mp4, parte dal pulsante play sull'hero) e le foto della `galleria`.
 * L'ordine dell'array è l'ordine nell'elenco e in "Progetto precedente/successivo".
 */

import type { FotoGalleria } from "@/content/comune";

export type Progetto = {
  slug: string;
  cliente: string;
  titolo: string;
  categorie: string[];
  copertina?: string;
  hero?: string;
  video?: string;
  descrizioneTitolo: string;
  descrizione: string;
  galleria: FotoGalleria[];
};

export const categorie = ["Categoria 1", "Categoria 2", "Categoria 3", "Categoria 4"];

const descrizione =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat";

const numeri = [
  "uno", "due", "tre", "quattro", "cinque", "sei",
  "sette", "otto", "nove", "dieci", "undici", "dodici",
];

export const progetti: Progetto[] = numeri.map((numero, i) => ({
  slug: `progetto-${numero}`,
  cliente: "Cliente",
  titolo: `Progetto numero ${numero}`,
  // Esempio: categorie distribuite per poter provare i filtri.
  categorie: [categorie[i % 4], ...(i % 3 === 0 ? [categorie[(i + 1) % 4]] : [])],
  descrizioneTitolo: "Titolo della descrizione",
  descrizione,
  galleria: Array.from({ length: 5 }, (_, k) => ({ alt: `Foto ${k + 1} del progetto ${numero}` })),
}));

export function trovaProgetto(slug: string) {
  return progetti.find((progetto) => progetto.slug === slug);
}

