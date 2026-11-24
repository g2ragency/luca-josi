import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = { title: "Contatti" };

// La pagina contatti non è ancora disegnata in Figma: per ora c'è solo il titolo.
export default function Contatti() {
  return <PageTitle>Contatti</PageTitle>;
}
