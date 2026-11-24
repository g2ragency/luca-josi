import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Dettaglio } from "@/components/Dettaglio";
import { LibroHero } from "@/components/libri/LibroHero";
import { viciniDi } from "@/content/comune";
import { etichettaTipo, libri, trovaLibro } from "@/content/libri";

type Props = { params: Promise<{ slug: string }> };

// Esistono solo i libri del file dei contenuti: gli altri indirizzi danno 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return libri.map((libro) => ({ slug: libro.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const libro = trovaLibro((await params).slug);
  return { title: libro ? `${libro.titolo} — ${libro.editore}` : "Libro" };
}

export default async function Libro({ params }: Props) {
  const { slug } = await params;
  const libro = trovaLibro(slug);
  if (!libro) notFound();
  const { precedente, successivo } = viciniDi(libri, slug);

  return (
    <Dettaglio
      sopratitolo={libro.editore}
      titolo={libro.titolo}
      etichette={[etichettaTipo(libro.tipo)]}
      hero={<LibroHero copertina={libro.copertina} sfondo={libro.sfondo} titolo={libro.titolo} />}
      descrizioneTitolo={libro.descrizioneTitolo}
      descrizione={libro.descrizione}
      galleria={libro.galleria}
      voce="Libro"
      precedente={{ href: `/libri/${precedente.slug}`, titolo: precedente.titolo }}
      successivo={{ href: `/libri/${successivo.slug}`, titolo: successivo.titolo }}
    />
  );
}
