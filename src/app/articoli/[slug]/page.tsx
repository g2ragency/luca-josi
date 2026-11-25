import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntestazioneDettaglio, NavVicini } from "@/components/Dettaglio";
import { Media } from "@/components/ui";
import { articoli, trovaArticolo, type Blocco } from "@/content/articoli";
import { viciniDi } from "@/content/comune";

type Props = { params: Promise<{ slug: string }> };

// Esistono solo gli articoli del file dei contenuti: gli altri indirizzi danno 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return articoli.map((articolo) => ({ slug: articolo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articolo = trovaArticolo((await params).slug);
  return { title: articolo?.titolo ?? "Articolo", description: articolo?.estratto };
}

/** Testo nella colonna centrale (Figma: 888px), foto a tutta larghezza con didascalia. */
function BloccoArticolo({ blocco }: { blocco: Blocco }) {
  if (blocco.tipo === "testo") {
    return (
      <div className="mx-auto max-w-[888px] space-y-7 px-4 text-body text-grey-testi md:px-0">
        {blocco.paragrafi.map((paragrafo, i) => (
          <p key={i}>{paragrafo}</p>
        ))}
      </div>
    );
  }
  return (
    <figure className="px-4 md:px-12">
      <Media src={blocco.src} alt={blocco.alt} sizes="100vw" className="aspect-[1342/504]" />
      {blocco.didascalia && (
        <figcaption className="mt-[11px] text-body text-grey-testi">{blocco.didascalia}</figcaption>
      )}
    </figure>
  );
}

export default async function Articolo({ params }: Props) {
  const { slug } = await params;
  const articolo = trovaArticolo(slug);
  if (!articolo) notFound();
  const { precedente, successivo } = viciniDi(articoli, slug);

  return (
    <article>
      <IntestazioneDettaglio sopratitolo={articolo.categoria} titolo={articolo.titolo} />

      <div className="mt-12 flex flex-col gap-12 md:mt-[90px] md:gap-[62px]">
        {articolo.corpo.map((blocco, i) => (
          <BloccoArticolo key={i} blocco={blocco} />
        ))}
      </div>

      <NavVicini
        etichetta="Altri articoli"
        margine="md:mt-[90px]"
        precedente={{ href: `/articoli/${precedente.slug}`, titolo: precedente.titolo, testo: "Articolo precedente" }}
        successivo={{ href: `/articoli/${successivo.slug}`, titolo: successivo.titolo, testo: "Articolo successivo" }}
      />
    </article>
  );
}
