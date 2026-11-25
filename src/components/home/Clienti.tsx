import Image from "next/image";
import { Scorrevole } from "@/components/Scorrevole";
import { Etichetta } from "@/components/ui";
import type { Cliente } from "@/content/home";

/** Riquadro grigio chiaro con il logo al centro (Figma: 318×156, 24px di distanza). */
function Riquadro({ cliente }: { cliente: Cliente }) {
  return (
    <div className="pr-4 md:pr-6">
      <div className="flex h-[108px] w-[220px] items-center justify-center rounded-[5px] bg-grey-chiaro md:h-[156px] md:w-[318px]">
        {cliente.logo ? (
          <Image
            src={cliente.logo.src}
            alt={cliente.nome}
            width={cliente.logo.larghezza}
            height={cliente.logo.altezza}
            className="h-auto max-w-[60%] opacity-60 md:max-w-none"
          />
        ) : (
          <span aria-hidden="true" className="text-[26px] font-semibold text-grey-testi md:text-h4">
            {cliente.nome}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * "Clienti e collaborazioni": titolo nella colonna destra e due file di loghi che scorrono
 * da sole in versi opposti (stessa logica della fila della newsletter).
 */
export function Clienti({ titolo, file, className = "" }: { titolo: string; file: Cliente[][]; className?: string }) {
  return (
    <section aria-labelledby="titolo-clienti" className={className}>
      <div className="grid gap-4 px-4 md:grid-cols-2 md:gap-6 md:px-12">
        <Etichetta className="md:mt-[10px]">Clienti e collaborazioni</Etichetta>
        <h2 id="titolo-clienti" data-colore-scorrimento className="max-w-[660px] text-h4">
          {titolo}
        </h2>
      </div>
      <div className="mt-12 flex flex-col gap-4 md:mt-[49px] md:gap-6">
        {file.map((fila, i) => (
          <Scorrevole key={i} inverso={i % 2 === 1} elementi={fila.map((cliente, k) => <Riquadro key={k} cliente={cliente} />)} />
        ))}
      </div>
    </section>
  );
}
