import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Dettaglio } from "@/components/Dettaglio";
import { Media } from "@/components/ui";
import { viciniDi } from "@/content/comune";
import { etichettaDi, libri, trovaLibro } from "@/content/libri";

type Props = { params: Promise<{ slug: string }> };

// Esistono solo le pubblicazioni del file dei contenuti: gli altri indirizzi danno 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return libri.map((libro) => ({ slug: libro.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const libro = trovaLibro((await params).slug);
  return { title: libro ? `${libro.titolo} — ${libro.editore}` : "Pubblicazione" };
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
      etichette={[etichettaDi(libro)]}
      hero={
        <Media src={libro.hero ?? libro.copertina} alt={libro.titolo} sizes="100vw" priority className="size-full" />
      }
      descrizioneTitolo={libro.descrizioneTitolo}
      descrizione={libro.descrizione}
      galleria={libro.galleria}
      navigazione="Altre pubblicazioni"
      precedente={{ href: `/libri/${precedente.slug}`, titolo: precedente.titolo, testo: "Pubblicazione precedente" }}
      successivo={{ href: `/libri/${successivo.slug}`, titolo: successivo.titolo, testo: "Pubblicazione successiva" }}
    />
  );
}
