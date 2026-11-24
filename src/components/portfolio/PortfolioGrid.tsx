"use client";

import { ElencoVuoto, Filtri, useFiltro } from "@/components/Filtri";
import { Scheda } from "@/components/Scheda";
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

function SchedaProgetto({ progetto, formato, priority }: { progetto: Progetto; formato: Formato; priority: boolean }) {
  return (
    <Scheda
      href={`/portfolio/${progetto.slug}`}
      immagine={progetto.copertina}
      sopratitolo={progetto.cliente}
      titolo={progetto.titolo}
      etichette={progetto.categorie}
      aspetto={ASPETTO[formato]}
      sizes={SIZES[formato]}
      priority={priority}
    />
  );
}

export function PortfolioGrid({ progetti, categorie }: { progetti: Progetto[]; categorie: string[] }) {
  const filtro = useFiltro(progetti, (progetto, categoria) => progetto.categorie.includes(categoria));
  const righe = componiRighe(filtro.visibili);

  return (
    <>
      <Filtri
        opzioni={categorie.map((categoria) => ({ valore: categoria, etichetta: categoria }))}
        attivo={filtro.attivo}
        onCambia={filtro.cambia}
      />

      <div
        key={filtro.chiave}
        className={`mt-16 mb-20 flex flex-col gap-12 px-4 md:mt-[100px] md:mb-[110px] md:px-12 ${filtro.animazione}`}
      >
        {righe.map((riga, r) =>
          riga.tipo === "piena" ? (
            <SchedaProgetto key={riga.progetti[0].slug} progetto={riga.progetti[0]} formato="piena" priority={r === 0} />
          ) : (
            <div
              key={riga.progetti[0].slug}
              className={`grid items-start gap-x-6 gap-y-12 ${
                riga.tipo === "alta-larga" ? "md:grid-cols-[546fr_774fr]" : "md:grid-cols-[774fr_546fr]"
              }`}
            >
              {riga.progetti.map((progetto, k) => (
                <SchedaProgetto
                  key={progetto.slug}
                  progetto={progetto}
                  formato={(riga.tipo === "larga-alta") === (k === 0) ? "larga" : "alta"}
                  priority={r === 0}
                />
              ))}
            </div>
          ),
        )}
        {filtro.visibili.length === 0 && <ElencoVuoto />}
      </div>
    </>
  );
}
