import type { Metadata } from "next";
import { LibriGrid } from "@/components/libri/LibriGrid";
import { PageTitle } from "@/components/PageTitle";
import { libri } from "@/content/libri";

export const metadata: Metadata = { title: "Libri" };

export default function Libri() {
  return (
    <>
      <PageTitle>
        Qui inserire la descrizione per la sezione relativa a tutti i libri e le pubblicazioni di
        Luca Josi
      </PageTitle>
      <LibriGrid libri={libri} />
    </>
  );
}
