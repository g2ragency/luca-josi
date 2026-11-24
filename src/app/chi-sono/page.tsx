import type { Metadata } from "next";
import { Percorso } from "@/components/chi-sono/Percorso";
import { Ricordi } from "@/components/chi-sono/Ricordi";
import { Valori } from "@/components/chi-sono/Valori";
import { PageTitle } from "@/components/PageTitle";
import { introduzione } from "@/content/chi-sono";

export const metadata: Metadata = { title: "Chi sono" };

export default function ChiSono() {
  return (
    <>
      <PageTitle>
        Qui inserire il titolo della pagina chi sono dove si ripercorre la vita e la carriera di
        Luca Josi
      </PageTitle>

      <Percorso />

      <div className="mt-16 md:mt-[72px]">
        <Ricordi />
      </div>

      <p className="mt-20 max-w-[1098px] px-4 text-[clamp(2rem,3.75vw,3.375rem)] leading-[1.11] font-semibold md:mt-[99px] md:px-12">
        {introduzione}
      </p>

      <Valori />

      {/* Segnaposto della foto grande (in Figma: "Foto rappresentativa Luca"). */}
      <div className="mx-4 mt-16 mb-20 flex aspect-[1344/726] items-center justify-center rounded-[5px] bg-grey/87 text-h5 md:mx-12 md:mt-[100px] md:mb-[110px]">
        Foto rappresentativa Luca
      </div>
    </>
  );
}
