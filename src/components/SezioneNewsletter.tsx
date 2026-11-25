import { FotoScorrevoli } from "@/components/contatti/FotoScorrevoli";
import { ModuloNewsletter } from "@/components/contatti/Moduli";
import { Etichetta } from "@/components/ui";
import { fotoNewsletter, titoloNewsletter } from "@/content/contatti";

/**
 * Sezione newsletter (Contatti e home): titolo, fila di foto che scorre da sola e modulo
 * di iscrizione. Cambia solo l'intestazione, come in Figma:
 * - "sopra" (Contatti): "Newsletter" grigio sopra il titolo, a sinistra;
 * - "affiancata" (home): etichetta con il pallino a sinistra, titolo nella colonna destra.
 * Il titolo si colora scorrendo (data-colore-scorrimento).
 */
export function SezioneNewsletter({
  intestazione,
  className = "",
}: {
  intestazione: "sopra" | "affiancata";
  className?: string;
}) {
  return (
    <section id="newsletter" aria-labelledby="titolo-newsletter" className={`mb-20 md:mb-[104px] ${className}`}>
      {intestazione === "sopra" ? (
        <div className="px-4 md:px-12">
          <p className="text-body text-grey-testi">Newsletter</p>
          <h2 id="titolo-newsletter" data-colore-scorrimento className="mt-[7px] max-w-[560px] text-h4">
            {titoloNewsletter}
          </h2>
        </div>
      ) : (
        <div className="grid gap-4 px-4 md:grid-cols-2 md:gap-6 md:px-12">
          <Etichetta className="md:mt-[10px]">Newsletter</Etichetta>
          <h2 id="titolo-newsletter" data-colore-scorrimento className="max-w-[560px] text-h4">
            {titoloNewsletter}
          </h2>
        </div>
      )}
      <div className={`mt-12 ${intestazione === "sopra" ? "md:mt-[92px]" : "md:mt-[110px]"}`}>
        <FotoScorrevoli foto={fotoNewsletter} />
      </div>
      <div className={`mt-12 px-4 md:px-12 ${intestazione === "sopra" ? "md:mt-[84px]" : "md:mt-[103px]"}`}>
        <ModuloNewsletter />
      </div>
    </section>
  );
}
