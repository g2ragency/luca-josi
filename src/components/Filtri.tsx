import { useState } from "react";
import { Chip } from "@/components/ui";

export type OpzioneFiltro = { valore: string; etichetta: string };

/**
 * Stato del filtro di un elenco: una categoria alla volta, un secondo clic la toglie.
 * `animazione` va sull'elenco (con `chiave` come key) per farlo ricomparire a ogni cambio.
 */
export function useFiltro<T>(elementi: T[], appartiene: (elemento: T, valore: string) => boolean) {
  const [attivo, setAttivo] = useState<string | null>(null);
  // L'elenco si anima solo dopo un clic su un filtro, non all'arrivo sulla pagina.
  const [filtrato, setFiltrato] = useState(false);

  return {
    attivo,
    cambia(valore: string | null) {
      setFiltrato(true);
      setAttivo(valore);
    },
    visibili: attivo ? elementi.filter((elemento) => appartiene(elemento, attivo)) : elementi,
    chiave: attivo ?? "tutti",
    animazione: filtrato ? "animate-fade-up" : "",
  };
}

/** Etichette cliccabili sotto il titolo della pagina (nera quella attiva). */
export function Filtri({
  opzioni,
  attivo,
  onCambia,
}: {
  opzioni: OpzioneFiltro[];
  attivo: string | null;
  onCambia: (valore: string | null) => void;
}) {
  return (
    <div role="group" aria-label="Filtra per categoria" className="mt-6 flex flex-wrap gap-6 px-4 md:mt-[17px] md:px-12">
      {opzioni.map(({ valore, etichetta }) => (
        <button
          key={valore}
          type="button"
          aria-pressed={attivo === valore}
          onClick={() => onCambia(attivo === valore ? null : valore)}
        >
          <Chip scura={attivo === valore}>{etichetta}</Chip>
        </button>
      ))}
    </div>
  );
}

/** Messaggio quando il filtro non lascia nulla da mostrare. */
export function ElencoVuoto() {
  return <p className="text-body text-grey-testi">Nessun elemento in questa categoria.</p>;
}
