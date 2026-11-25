import { ArticoliFisarmonica } from "@/components/home/ArticoliFisarmonica";
import { Carosello } from "@/components/home/Carosello";
import { Clienti } from "@/components/home/Clienti";
import { TestoSezione } from "@/components/home/TestoSezione";
import { TransitionLink } from "@/components/PageTransition";
import { Scheda } from "@/components/Scheda";
import { SezioneNewsletter } from "@/components/SezioneNewsletter";
import { classePulsante, Etichetta, TestoPulsante } from "@/components/ui";
import { articoli } from "@/content/articoli";
import {
  clienti,
  fotoCarosello,
  testoArticoli,
  testoChiSono,
  testoPubblicazioni,
  titoloApertura,
  titoloClienti,
  titoloPortfolio,
} from "@/content/home";
import { etichettaDi, libri } from "@/content/libri";
import { progetti } from "@/content/portfolio";

/** Distanza tra le sezioni in Figma (circa 150px). */
const SEZIONE = "mt-24 md:mt-[150px]";

export default function Home() {
  return (
    <>
      {/* Apertura: riquadro grigio chiaro alto quanto lo schermo (per ora senza foto o video)
          con il titolo in basso; mai più basso di 560px, perché il titolo ci stia. */}
      <section className="flex h-svh min-h-[560px] items-end bg-grey-chiaro">
        <h1 data-reveal="heading" className="px-4 pb-6 text-h1 uppercase md:px-12 md:pb-[31px]">
          {titoloApertura}
        </h1>
      </section>

      <TestoSezione
        etichetta="Chi sono"
        pulsante={{ href: "/chi-sono", testo: "Scopri chi sono" }}
        className={SEZIONE}
      >
        {testoChiSono}
      </TestoSezione>

      <div className="mt-12 md:mt-[50px]">
        <Carosello foto={fotoCarosello} />
      </div>

      <Clienti titolo={titoloClienti} file={clienti} className={SEZIONE} />

      {/* Portfolio: testo nella prima colonna, poi 5 progetti su tre colonne (Figma: 432×576). */}
      <section
        aria-labelledby="titolo-portfolio"
        className={`grid gap-x-6 gap-y-12 px-4 md:grid-cols-3 md:gap-y-[50px] md:px-12 ${SEZIONE}`}
      >
        <div>
          <Etichetta>Portfolio</Etichetta>
          <h2 id="titolo-portfolio" data-colore-scorrimento className="mt-5 text-h4">
            {titoloPortfolio}
          </h2>
          <TransitionLink href="/portfolio" className={`mt-[22px] ${classePulsante}`}>
            <TestoPulsante>Scopri tutti i progetti</TestoPulsante>
          </TransitionLink>
        </div>
        {progetti.slice(0, 5).map((progetto) => (
          <Scheda
            key={progetto.slug}
            href={`/portfolio/${progetto.slug}`}
            immagine={progetto.copertina ?? progetto.hero}
            sopratitolo={progetto.cliente}
            titolo={progetto.titolo}
            etichette={[]}
            aspetto="aspect-[432/576]"
            sizes="(min-width: 768px) 30vw, 100vw"
            pulsante="Scopri di più"
          />
        ))}
      </section>

      <TestoSezione
        etichetta="Pubblicazioni"
        pulsante={{ href: "/libri", testo: "Scopri le pubblicazioni" }}
        className={SEZIONE}
      >
        {testoPubblicazioni}
      </TestoSezione>
      <div className="mt-12 grid gap-12 px-4 md:mt-[60px] md:grid-cols-2 md:gap-6 md:px-12">
        {libri.slice(0, 2).map((libro) => (
          <Scheda
            key={libro.slug}
            href={`/libri/${libro.slug}`}
            immagine={libro.copertina}
            sopratitolo={libro.editore}
            titolo={libro.titolo}
            etichette={[etichettaDi(libro)]}
            aspetto="aspect-[660/486]"
            sizes="(min-width: 768px) 46vw, 100vw"
            pulsante="Scopri di più"
          />
        ))}
      </div>

      <TestoSezione
        etichetta="Articoli"
        pulsante={{ href: "/articoli", testo: "Scopri tutti gli articoli" }}
        className={SEZIONE}
      >
        {testoArticoli}
      </TestoSezione>
      <div className="mt-12 px-4 md:mt-[52px] md:px-12">
        <ArticoliFisarmonica articoli={articoli.slice(0, 5)} />
      </div>

      <SezioneNewsletter intestazione="affiancata" className="mt-24 md:mt-[152px]" />
    </>
  );
}
