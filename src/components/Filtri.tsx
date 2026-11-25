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

/** X bianca da 10px, entra con una leggera dissolvenza. */
function IconaChiudi() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0 animate-fade-in">
      <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Etichette cliccabili sotto il titolo della pagina: quella scelta diventa nera con una X
 * a destra; un clic sulla stessa etichetta toglie il filtro.
 */
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
          className="cursor-pointer"
        >
          <Chip scura={attivo === valore}>
            {etichetta}
            {/* Sulla categoria scelta: la X a destra ricorda che un altro clic la toglie. */}
            {attivo === valore && <IconaChiudi />}
          </Chip>
        </button>
      ))}
    </div>
  );
}

/** Messaggio quando il filtro non lascia nulla da mostrare. */
export function ElencoVuoto() {
  return <p className="text-body text-grey-testi">Nessun elemento in questa categoria.</p>;
}
