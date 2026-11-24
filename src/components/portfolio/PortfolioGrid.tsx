"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/PageTransition";
import { Chip, Media } from "@/components/ui";
import type { Progetto } from "@/content/portfolio";

type Formato = "larga" | "alta" | "piena";
type Riga = { tipo: "larga-alta" | "piena" | "alta-larga"; progetti: Progetto[] };

/** Schema di Figma che si ripete: coppia larga+alta, intera, coppia alta+larga, intera. */
const SCHEMA: Riga["tipo"][] = ["larga-alta", "piena", "alta-larga", "piena"];

function componiRighe(lista: Progetto[]): Riga[] {
  const righe: Riga[] = [];
  for (let i = 0, passo = 0; i < lista.length; passo++) {
    const tipo = SCHEMA[passo % SCHEMA.length];
    const quanti = tipo === "piena" ? 1 : 2;
    const progetti = lista.slice(i, i + quanti);
    // Se per una coppia resta un solo progetto, lo mostra a tutta larghezza.
    righe.push({ tipo: progetti.length === 1 ? "piena" : tipo, progetti });
    i += quanti;
  }
  return righe;
}

const ASPETTO: Record<Formato, string> = {
  larga: "aspect-[774/530]",
  alta: "aspect-[546/728]",
  piena: "aspect-[1344/726]",
};

const SIZES: Record<Formato, string> = {
  larga: "(min-width: 768px) 54vw, 100vw",
  alta: "(min-width: 768px) 38vw, 100vw",
  piena: "100vw",
};

function Scheda({ progetto, formato, priority }: { progetto: Progetto; formato: Formato; priority: boolean }) {
  return (
    <article>
      <TransitionLink href={`/portfolio/${progetto.slug}`} className="group block">
        <Media
          src={progetto.copertina}
          alt={progetto.titolo}
          sizes={SIZES[formato]}
          priority={priority}
          zoomOnHover
          className={ASPETTO[formato]}
        />
        <p className="mt-3 text-body text-grey-testi">{progetto.cliente}</p>
        <h2 className="mt-1 text-[24px] leading-[36px] font-semibold">{progetto.titolo}</h2>
      </TransitionLink>
      <ul className="mt-[5px] flex flex-wrap gap-2">
        {progetto.categorie.map((categoria) => (
          <li key={categoria}>
            <Chip>{categoria}</Chip>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PortfolioGrid({ progetti, categorie }: { progetti: Progetto[]; categorie: string[] }) {
  const [attiva, setAttiva] = useState<string | null>(null);
  // L'elenco si anima solo dopo un clic su un filtro, non all'arrivo sulla pagina.
  const [filtrato, setFiltrato] = useState(false);

  const visibili = attiva ? progetti.filter((progetto) => progetto.categorie.includes(attiva)) : progetti;
  const righe = componiRighe(visibili);

  return (
    <>
      <div role="group" aria-label="Filtra per categoria" className="mt-6 flex flex-wrap gap-6 px-4 md:mt-[17px] md:px-12">
        {categorie.map((categoria) => (
          <button
            key={categoria}
            type="button"
            aria-pressed={attiva === categoria}
            onClick={() => {
              setFiltrato(true);
              setAttiva((corrente) => (corrente === categoria ? null : categoria));
            }}
          >
            <Chip scura={attiva === categoria}>{categoria}</Chip>
          </button>
        ))}
      </div>

      <div
        key={attiva ?? "tutti"}
        className={`mt-16 mb-20 flex flex-col gap-12 px-4 md:mt-[100px] md:mb-[110px] md:px-12 ${
          filtrato ? "animate-fade-up" : ""
        }`}
      >
        {righe.map((riga, r) =>
          riga.tipo === "piena" ? (
            <Scheda key={riga.progetti[0].slug} progetto={riga.progetti[0]} formato="piena" priority={r === 0} />
          ) : (
            <div
              key={riga.progetti[0].slug}
              className={`grid items-start gap-x-6 gap-y-12 ${
                riga.tipo === "alta-larga" ? "md:grid-cols-[546fr_774fr]" : "md:grid-cols-[774fr_546fr]"
              }`}
            >
              {riga.progetti.map((progetto, k) => (
                <Scheda
                  key={progetto.slug}
                  progetto={progetto}
                  formato={(riga.tipo === "larga-alta") === (k === 0) ? "larga" : "alta"}
                  priority={r === 0}
                />
              ))}
            </div>
          ),
        )}
        {visibili.length === 0 && <p className="text-body text-grey-testi">Nessun progetto in questa categoria.</p>}
      </div>
    </>
  );
}
