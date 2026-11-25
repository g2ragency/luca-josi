import type { Metadata } from "next";
import { ModuloContatti } from "@/components/contatti/Moduli";
import { LinkAncora } from "@/components/LinkAncora";
import { PageTitle } from "@/components/PageTitle";
import { SezioneNewsletter } from "@/components/SezioneNewsletter";
import { email, linkedin } from "@/content/contatti";

export const metadata: Metadata = { title: "Contatti" };

export default function Contatti() {
  return (
    <>
      <PageTitle>
        Sezione contatti e social qui inserire un testo descrittivo di introduzione alla pagina
      </PageTitle>

      {/* Tre recapiti su colonne da 204px (Figma: x 48, 276, 504). */}
      <ul className="mt-8 grid grid-cols-2 gap-6 px-4 text-body sm:grid-cols-3 md:mt-[27px] md:grid-cols-6 md:px-12">
        <li>
          <p className="font-semibold">Contatti</p>
          <a href={`mailto:${email}`} className="mt-[2px] block">
            {email}
          </a>
        </li>
        <li>
          <p className="font-semibold">Seguimi</p>
          {linkedin ? (
            <a href={linkedin} target="_blank" rel="noreferrer" className="mt-[2px] block">
              LinkedIn
            </a>
          ) : (
            <p className="mt-[2px]">LinkedIn</p>
          )}
        </li>
        <li>
          <p className="font-semibold">Newsletter</p>
          <LinkAncora id="newsletter" className="mt-[2px] block">
            Iscriviti
          </LinkAncora>
        </li>
      </ul>

      <section
        aria-labelledby="titolo-messaggio"
        className="mt-12 grid gap-10 px-4 md:mt-[67px] md:grid-cols-[774fr_546fr] md:gap-6 md:px-12"
      >
        {/* Segnaposto della foto (in Figma: "Foto rappresentativa Luca"). */}
        <div className="flex aspect-[774/726] items-center justify-center rounded-[5px] bg-grey/87 text-h5">
          Foto rappresentativa Luca
        </div>
        {/* Titolo e modulo allineati in basso con la foto. */}
        <div className="flex flex-col justify-end">
          <h2 id="titolo-messaggio" data-colore-scorrimento className="text-h4">
            Titolo della sezione con il form per inviare messaggio
          </h2>
          <div className="mt-8 md:mt-[47px]">
            <ModuloContatti />
          </div>
        </div>
      </section>

      <SezioneNewsletter intestazione="sopra" className="mt-20 md:mt-[100px]" />
    </>
  );
}
