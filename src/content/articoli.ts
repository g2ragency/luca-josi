/**
 * Articoli. ESEMPI: titoli, categorie e testi segnaposto di Figma.
 * Ogni articolo ha un `estratto` (il testo a destra nell'elenco, al massimo 8 righe) e un
 * `corpo` fatto di blocchi: paragrafi di testo e foto a tutta larghezza con didascalia.
 * L'ordine dell'array è l'ordine nell'elenco e in "Articolo precedente/successivo".
 */

export const categorie = ["Attualità", "Approfondimenti", "Eventi"];

export type Blocco =
  | { tipo: "testo"; paragrafi: string[] }
  | { tipo: "foto"; src?: string; alt: string; didascalia?: string };

export type Articolo = {
  slug: string;
  titolo: string;
  categoria: string;
  estratto: string;
  corpo: Blocco[];
};

const estratto =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat";

const paragrafi = [
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper.",
  "Ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui.",
];

const numeri = ["uno", "due", "tre", "quattro", "cinque", "sei", "sette"];

export const articoli: Articolo[] = numeri.map((numero, i) => ({
  slug: `articolo-${numero}`,
  // Il primo ha il titolo lungo della pagina singola in Figma, per vedere come va a capo.
  titolo: i === 0 ? "Qui il titolo dell’articolo che può anche essere abbastanza lungo" : "Qui il titolo dell’articolo",
  // Esempio: categorie distribuite per poter provare i filtri.
  categoria: categorie[(i + 1) % categorie.length],
  estratto,
  corpo: [
    { tipo: "testo", paragrafi },
    { tipo: "foto", alt: `Foto dell'articolo ${numero}`, didascalia: "Didascalia delle foto" },
    { tipo: "testo", paragrafi },
  ],
}));

export function trovaArticolo(slug: string) {
  return articoli.find((articolo) => articolo.slug === slug);
}
