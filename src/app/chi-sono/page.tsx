import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = { title: "Chi sono" };

export default function ChiSono() {
  return (
    <PageTitle>
      Qui inserire il titolo della pagina chi sono dove si ripercorre la vita e la carriera di
      Luca Josi
    </PageTitle>
  );
}
