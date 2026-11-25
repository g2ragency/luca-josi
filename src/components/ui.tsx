import Image from "next/image";
import type { ReactNode } from "react";

/** Etichetta (categoria, periodo, anno): grigia di default, nera se `scura`. */
export function Chip({ children, scura = false }: { children: ReactNode; scura?: boolean }) {
  return (
    <span
      className={`inline-block rounded-[5px] px-[14px] py-[6px] text-button ${
        scura ? "bg-black text-white" : "bg-grey/87 text-grey-testi"
      }`}
    >
      {children}
    </span>
  );
}

/** Pulsante grigio alto 45px (Contatti, "Leggi di più", "Scopri di più"): classi da mettere sul link. */
export const classePulsante = "inline-block rounded-[5px] bg-grey/87 px-7 py-3 text-button";

/** Cerchio grigio con freccia (Figma: 45×45), verso destra o sinistra. */
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
      <circle cx="22.5" cy="22.5" r="22.5" fill="#DDDDDD" fillOpacity="0.866667" />
      <path
        d="M19.5 14.5L27.5 22.5L19.5 30.5"
        stroke="black"
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
