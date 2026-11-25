import type { ReactNode } from "react";
import { TransitionLink } from "@/components/PageTransition";
import { classePulsante, Etichetta, TestoPulsante } from "@/components/ui";

/**
 * Apertura delle sezioni della home (Figma): etichetta con il pallino a sinistra e testo
 * grande (h3) che parte una colonna più a destra (rientro di 228px = 204 + 24), poi il
 * pulsante. Il testo si colora di nero scorrendo. Su mobile l'etichetta va sopra.
 */
export function TestoSezione({
  etichetta,
  children,
  pulsante,
  className = "",
}: {
  etichetta: string;
  children: ReactNode;
  pulsante?: { href: string; testo: string };
  className?: string;
}) {
  return (
    <div className={`px-4 md:px-12 ${className}`}>
      <div className="relative">
        <Etichetta className="mb-4 md:absolute md:top-[13px] md:left-0 md:mb-0">{etichetta}</Etichetta>
        <p data-colore-scorrimento className="font-semibold max-md:text-[28px] max-md:leading-[36px] md:indent-[228px] md:text-h3">
          {children}
        </p>
      </div>
      {pulsante && (
        <TransitionLink href={pulsante.href} className={`mt-6 md:mt-[7px] ${classePulsante}`}>
          <TestoPulsante>{pulsante.testo}</TestoPulsante>
        </TransitionLink>
      )}
    </div>
  );
}
