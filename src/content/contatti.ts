/**
 * Contatti, link del footer e foto della newsletter.
 * DA COMPLETARE: indirizzo del profilo LinkedIn (finché è `null` "Linkedin" resta testo
 * senza link), pagine legali (privacy, cookie, termini: non esistono ancora) e foto vere
 * della fila nella sezione newsletter (aggiungere `src`).
 */

export const email = "info@lucajosi.it";

export const linkedin: string | null = null;

/** Foto quadrate che scorrono nella sezione newsletter (Figma: 204×204). */
export const fotoNewsletter: { src?: string; alt: string }[] = Array.from({ length: 8 }, (_, i) => ({
  alt: `Foto ${i + 1} di Luca Josi`,
}));

/** Colonna "Sito" del footer: le pagine del menu, più la home. */
export const linkSito = [
  { href: "/", label: "Home page" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/libri", label: "Pubblicazioni" },
  { href: "/articoli", label: "Articoli" },
  { href: "/contatti", label: "Contatti" },
];

/** Colonna "Links": pagine legali, `href` da aggiungere quando esisteranno. */
export const linkLegali: { href?: string; label: string }[] = [
  { label: "Privacy Policy" },
  { label: "Cookie Policy" },
  { label: "Termini e Condizioni" },
];
