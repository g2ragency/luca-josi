import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/PageTransition";
import { Galleria } from "@/components/portfolio/Galleria";
import { ProgettoHero } from "@/components/portfolio/ProgettoHero";
import { ArrowCircle, Chip } from "@/components/ui";
import { progetti, trovaProgetto, viciniDi } from "@/content/portfolio";

type Props = { params: Promise<{ slug: string }> };

// Esistono solo i progetti del file dei contenuti: gli altri indirizzi danno 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return progetti.map((progetto) => ({ slug: progetto.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const progetto = trovaProgetto((await params).slug);
  return { title: progetto ? `${progetto.titolo} — ${progetto.cliente}` : "Progetto" };
}

export default async function Progetto({ params }: Props) {
  const { slug } = await params;
  const progetto = trovaProgetto(slug);
  if (!progetto) notFound();
  const { precedente, successivo } = viciniDi(slug);

  return (
    <article>
      <header className="px-4 pt-[100px] md:px-12 md:pt-[125px]">
        <p className="text-[24px] leading-[36px] text-grey-testi">{progetto.cliente}</p>
        <h1 data-reveal="heading" className="mt-[7px] text-h1">
          {progetto.titolo}
        </h1>
        <ul className="mt-[11px] flex flex-wrap gap-6">
          {progetto.categorie.map((categoria) => (
            <li key={categoria}>
              <Chip>{categoria}</Chip>
            </li>
          ))}
        </ul>
      </header>

      <ProgettoHero immagine={progetto.hero ?? progetto.copertina} video={progetto.video} titolo={progetto.titolo} />

      <section className="mt-16 grid gap-6 px-4 md:mt-[100px] md:grid-cols-2 md:px-12">
        <h2 className="text-[24px] leading-[36px] font-semibold">{progetto.descrizioneTitolo}</h2>
        <p className="text-body text-grey-testi">{progetto.descrizione}</p>
      </section>

      <Galleria foto={progetto.galleria} />

      <nav
        aria-label="Altri progetti"
        className="mt-16 mb-20 flex items-center justify-between gap-6 px-4 text-[18px] leading-[28px] font-semibold md:mt-[102px] md:mb-[100px] md:px-12"
      >
        <TransitionLink href={`/portfolio/${precedente.slug}`} className="flex items-center gap-3">
          <ArrowCircle direzione="sinistra" />
          <span>
            Progetto precedente<span className="sr-only">: {precedente.titolo}</span>
          </span>
        </TransitionLink>
        <TransitionLink href={`/portfolio/${successivo.slug}`} className="flex items-center gap-3 text-right">
          <span>
            Progetto successivo<span className="sr-only">: {successivo.titolo}</span>
          </span>
          <ArrowCircle />
        </TransitionLink>
      </nav>
    </article>
  );
}
