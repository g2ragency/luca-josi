"use client";

import type { ReactNode } from "react";
import { getLenis } from "@/lib/smooth-scroll";

/** Distanza dall'alto dello schermo a cui arriva la sezione (come i margini delle pagine). */
const MARGINE_ALTO = 48;

/**
 * Link a una sezione della stessa pagina, raggiunta con lo scorrimento morbido del sito.
 * Senza JavaScript funziona come un normale link `#id`.
 */
export function LinkAncora({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(evento) => {
        const lenis = getLenis();
        const destinazione = document.getElementById(id);
        if (!lenis || !destinazione) return;
        evento.preventDefault();
        lenis.scrollTo(destinazione, { offset: -MARGINE_ALTO });
      }}
    >
      {children}
    </a>
  );
}
