"use client";

import { ArticoliLista } from "@/components/articoli/ArticoliLista";
import { ElencoVuoto, Filtri, useFiltro } from "@/components/Filtri";
import type { Articolo } from "@/content/articoli";

/** Filtri per categoria e lista degli articoli (ricreata a ogni cambio di filtro). */
export function ArticoliElenco({ articoli, categorie }: { articoli: Articolo[]; categorie: string[] }) {
  const filtro = useFiltro(articoli, (articolo, categoria) => articolo.categoria === categoria);

  return (
    <>
      <Filtri
        opzioni={categorie.map((categoria) => ({ valore: categoria, etichetta: categoria }))}
        attivo={filtro.attivo}
        onCambia={filtro.cambia}
      />
      {filtro.visibili.length > 0 ? (
        <ArticoliLista key={filtro.chiave} articoli={filtro.visibili} animazione={filtro.animazione} />
      ) : (
        <div className="mt-16 mb-20 px-4 md:mt-[100px] md:px-12">
          <ElencoVuoto />
        </div>
      )}
    </>
  );
}
