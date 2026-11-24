import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = { title: "Articoli" };

export default function Articoli() {
  return (
    <PageTitle>
      Qui inserire la descrizione per la sezione relativa alle news, articoli, pensieri e
      approfondimenti
    </PageTitle>
  );
}
