import Image from "next/image";
import type { ReactNode } from "react";

/** Etichetta (categoria, periodo, anno): grigia di default, nera se `scura`. */
export function Chip({ children, scura = false }: { children: ReactNode; scura?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-[5px] px-[14px] py-[6px] text-button ${
        scura ? "bg-black text-white" : "bg-grey/87 text-grey-testi"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Pulsante alto 45px, nero con testo bianco, grigio scuro al passaggio del mouse
 * (Contatti, "Leggi di più", "Scopri di più", moduli). Classi da mettere sul link o sul
 * `<button>`; il testo va dentro `<TestoPulsante>`. Non vale per i filtri delle categorie.
 */
export const classePulsante =
  "group/pulsante inline-block cursor-pointer rounded-[5px] bg-black px-7 py-3 text-button text-white transition-colors duration-300 hover:bg-grey-scuro focus-visible:bg-grey-scuro";

/**
 * Testo dei pulsanti con l'effetto di hyrup.de: al passaggio del mouse la scritta esce
 * verso l'alto e una copia identica entra da sotto; uscendo col mouse succede il contrario.
 * Le due copie stanno in una riga che nasconde ciò che sporge.
 *
 * Tempi (misurati sul riferimento): chi esce parte subito e accelera (0,2s); chi entra
 * parte dopo 0,15s e frena (0,26s). Una transizione CSS usa i tempi dello stato di arrivo,
 * quindi ogni copia ha i tempi "di entrata" a riposo e quelli "di uscita" al passaggio
 * (e viceversa per la copia sotto).
 */
export function TestoPulsante({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform delay-[150ms] duration-[260ms] ease-[cubic-bezier(0.2,0.9,0.3,1)] group-hover/pulsante:delay-0 group-hover/pulsante:duration-200 group-hover/pulsante:ease-[cubic-bezier(0.5,0,0.75,0)] motion-safe:group-hover/pulsante:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-full block transition-transform duration-200 ease-[cubic-bezier(0.5,0,0.75,0)] group-hover/pulsante:-translate-y-full group-hover/pulsante:delay-[150ms] group-hover/pulsante:duration-[260ms] group-hover/pulsante:ease-[cubic-bezier(0.2,0.9,0.3,1)] motion-reduce:hidden"
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Cerchio grigio con freccia (Figma: 45×45), verso destra o sinistra. Diventa nero con la
 * freccia bianca quando si passa sul link che lo contiene (il link deve avere `group`).
 */
export function ArrowCircle({ direzione = "destra" }: { direzione?: "destra" | "sinistra" }) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${direzione === "sinistra" ? "-scale-x-100" : ""}`}
    >
      <circle
        cx="22.5"
        cy="22.5"
        r="22.5"
        className="fill-grey/87 transition-colors duration-300 group-hover:fill-black"
      />
      <path
        d="M19.5 14.5L27.5 22.5L19.5 30.5"
        className="stroke-black transition-colors duration-300 group-hover:stroke-white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Immagine con angoli arrotondati che riempie il suo riquadro (proporzioni decise da chi la
 * usa). Senza `src` mostra il riquadro grigio del wireframe.
 */
export function Media({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  zoomOnHover = false,
}: {
  src?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  zoomOnHover?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[5px] bg-grey/87 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${
            zoomOnHover
              ? "transition-transform duration-700 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:scale-[1.03]"
              : ""
          }`}
        />
      ) : null}
    </div>
  );
}
