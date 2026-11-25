import type { Metadata } from "next";
import { ArticoliElenco } from "@/components/articoli/ArticoliElenco";
import { PageTitle } from "@/components/PageTitle";
import { articoli, categorie } from "@/content/articoli";

export const metadata: Metadata = { title: "Articoli" };

export default function Articoli() {
  return (
    <>
      <PageTitle>
        Qui inserire la descrizione per la sezione relativa alle news, articoli, pensieri e
        approfondimenti
      </PageTitle>
      <ArticoliElenco articoli={articoli} categorie={categorie} />
    </>
  );
}
