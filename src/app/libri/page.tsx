import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = { title: "Libri" };

export default function Libri() {
  return (
    <PageTitle>
      Qui inserire la descrizione per la sezione relativa a tutti i libri e le pubblicazioni di
      Luca Josi
    </PageTitle>
  );
}
