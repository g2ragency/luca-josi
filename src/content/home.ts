/**
 * Contenuti della home. Testi segnaposto di Figma, da sostituire con quelli definitivi.
 * Progetti, pubblicazioni e articoli vengono dai rispettivi file (i primi dell'elenco).
 */

export const titoloApertura = "Qui inserire il titolo descrittivo per la pagina home page del sitoweb";

export const testoChiSono =
  "UVP o altro testo lorem ipsum dolor sit amet to consectetuer adipiscing elit lommodo ligula eget dolor massa cum sociis nato amet sunto to";

/** Foto del carosello che scorre in orizzontale (Figma: 432×576). Aggiungere `src`. */
export const fotoCarosello: { src?: string; alt: string }[] = Array.from({ length: 6 }, (_, i) => ({
  alt: `Foto ${i + 1} di Luca Josi`,
}));

export const titoloClienti = "Lorem ipsum dolor sit amet sunto consectetuer adipiscing elit";

/**
 * Loghi dei clienti su due file che scorrono in versi opposti. Senza `logo` il riquadro
 * mostra la scritta "Logo" (segnaposto di Figma). Misure del logo come in Figma.
 */
export type Cliente = { nome: string; logo?: { src: string; larghezza: number; altezza: number } };

const segnaposto: Cliente = { nome: "Logo" };

export const clienti: Cliente[][] = [
  [segnaposto, { nome: "TIM", logo: { src: "/clienti/tim.png", larghezza: 121, altezza: 35 } }, segnaposto, segnaposto, segnaposto],
  [
    { nome: "Intesa Sanpaolo", logo: { src: "/clienti/intesa-sanpaolo.png", larghezza: 141, altezza: 65 } },
    segnaposto,
    { nome: "Mediaset", logo: { src: "/clienti/mediaset.png", larghezza: 146, altezza: 69 } },
    segnaposto,
    segnaposto,
  ],
];

export const titoloPortfolio = "Lorem ipsum dolor sit amet sunto consectetuer adipiscing elit";

export const testoPubblicazioni =
  "Libri e pubblicazioni lorem ipsum dolor sit amet to consectetuer adipiscing elit lommodo ligula eget dolor massa cum sociis nato amet sunto to";

export const testoArticoli =
  "Articoli lorem ipsum dolor sit amet to consectetuer adipiscing elit lommodo ligula eget dolor massa cum sociis nato amet sunto to";
