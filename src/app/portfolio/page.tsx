import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = { title: "Portfolio" };

export default function Portfolio() {
  return (
    <PageTitle>
      Qui inserire il titolo descrittivo della sezione portfolio dove si raccolgono tutti i
      diversi lavori
    </PageTitle>
  );
}
