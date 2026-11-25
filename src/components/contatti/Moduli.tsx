"use client";

import { useState, type FormEvent } from "react";
import { classePulsante, TestoPulsante } from "@/components/ui";

/**
 * I due moduli della pagina Contatti. L'invio NON è ancora collegato a un servizio
 * (posta per i messaggi, piattaforma per la newsletter): per ora i campi si controllano
 * nel browser e, all'invio, compare un avviso. Quando il servizio è scelto, va sostituita
 * `invia` in ciascun modulo.
 */
const AVVISO_NON_COLLEGATO = "Modulo non ancora collegato: i dati non sono stati inviati.";

function useInvio() {
  const [avviso, setAvviso] = useState<string | null>(null);
  const invia = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setAvviso(AVVISO_NON_COLLEGATO);
  };
  return { avviso, invia };
}

type Campo = { nome: string; etichetta: string; tipo?: string; obbligatorio?: boolean; autoComplete?: string; largo?: boolean };

/** Campi del messaggio (Figma: due colonne da 261px, righe ogni 72px). */
const campiContatto: Campo[] = [
  { nome: "nome", etichetta: "Nome", obbligatorio: true, autoComplete: "given-name" },
  { nome: "cognome", etichetta: "Cognome", obbligatorio: true, autoComplete: "family-name" },
  { nome: "email", etichetta: "E-mail", tipo: "email", obbligatorio: true, autoComplete: "email", largo: true },
  { nome: "azienda", etichetta: "Azienda", autoComplete: "organization" },
  { nome: "telefono", etichetta: "Telefono", tipo: "tel", autoComplete: "tel" },
  { nome: "oggetto", etichetta: "Oggetto", obbligatorio: true, largo: true },
];

/** Testo dei campi: l'etichetta fa da segnaposto sopra la linea, l'asterisco indica l'obbligo. */
function testoEtichetta(campo: Campo) {
  return `${campo.etichetta}${campo.obbligatorio ? "*" : ""}`;
}

export function ModuloContatti() {
  const { avviso, invia } = useInvio();

  return (
    <form onSubmit={invia} className="grid grid-cols-2 gap-x-6 gap-y-[46px]">
      {campiContatto.map((campo) => (
        <label key={campo.nome} className={campo.largo ? "col-span-2" : ""}>
          <span className="sr-only">{testoEtichetta(campo)}</span>
          <input
            name={campo.nome}
            type={campo.tipo ?? "text"}
            required={campo.obbligatorio}
            autoComplete={campo.autoComplete}
            placeholder={testoEtichetta(campo)}
            className="block h-[26px] w-full border-b border-grey bg-transparent pb-[4px] text-button font-normal outline-none placeholder:text-grey-testi focus:border-black"
          />
        </label>
      ))}
      {/* Messaggio: etichetta con la sua linea, poi lo spazio per scrivere fino alla linea sotto. */}
      <label className="col-span-2 block">
        <span className="block h-[26px] border-b border-grey text-button font-normal text-grey-testi">Messaggio</span>
        <textarea
          name="messaggio"
          rows={3}
          className="block h-[72px] w-full resize-none border-b border-grey bg-transparent pt-2 text-button font-normal outline-none focus:border-black"
        />
      </label>
      <div className="col-span-2 -mt-[22px]">
        <button type="submit" className={classePulsante}>
          <TestoPulsante>Invia messaggio</TestoPulsante>
        </button>
        {avviso && (
          <p role="status" className="mt-3 text-button font-normal text-grey-testi">
            {avviso}
          </p>
        )}
      </div>
    </form>
  );
}

/** Iscrizione: due campi e il pulsante nero, su tre colonne da 432px. */
export function ModuloNewsletter() {
  const { avviso, invia } = useInvio();
  const classeCampo =
    "block h-[25px] w-full border-b border-black bg-transparent pb-[3px] text-button outline-none placeholder:text-black";

  return (
    <form onSubmit={invia} className="grid gap-x-6 gap-y-8 md:grid-cols-3">
      <label className="md:mt-5">
        <span className="sr-only">Nome*</span>
        <input name="nome" required autoComplete="given-name" placeholder="Nome*" className={classeCampo} />
      </label>
      <label className="md:mt-5">
        <span className="sr-only">E-mail*</span>
        <input name="email" type="email" required autoComplete="email" placeholder="E-mail*" className={classeCampo} />
      </label>
      <div>
        <button type="submit" className={`w-full text-center ${classePulsante}`}>
          <TestoPulsante>Iscriviti alla newsletter</TestoPulsante>
        </button>
        <p className="mt-[14px] text-button font-normal">
          Cliccando “iscriviti alla newsletter” autorizzi il trattamento dei dati come da Termini e Condizioni
        </p>
        {avviso && (
          <p role="status" className="mt-3 text-button font-normal text-grey-testi">
            {avviso}
          </p>
        )}
      </div>
    </form>
  );
}
