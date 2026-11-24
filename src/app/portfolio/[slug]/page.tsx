import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Dettaglio } from "@/components/Dettaglio";
import { ProgettoHero } from "@/components/portfolio/ProgettoHero";
import { viciniDi } from "@/content/comune";
import { progetti, trovaProgetto } from "@/content/portfolio";

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
  const { precedente, successivo } = viciniDi(progetti, slug);

  return (
    <Dettaglio
      sopratitolo={progetto.cliente}
      titolo={progetto.titolo}
      etichette={progetto.categorie}
      hero={<ProgettoHero immagine={progetto.hero ?? progetto.copertina} video={progetto.video} titolo={progetto.titolo} />}
      descrizioneTitolo={progetto.descrizioneTitolo}
      descrizione={progetto.descrizione}
      galleria={progetto.galleria}
      voce="Progetto"
      precedente={{ href: `/portfolio/${precedente.slug}`, titolo: precedente.titolo }}
      successivo={{ href: `/portfolio/${successivo.slug}`, titolo: successivo.titolo }}
    />
  );
}
