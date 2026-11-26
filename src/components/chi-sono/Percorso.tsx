import { Chip } from "@/components/ui";
import { percorso } from "@/content/chi-sono";

/** Le quattro tappe della carriera sotto il titolo di Chi sono. */
export function Percorso() {
  return (
    <ol className="mt-16 grid gap-x-6 gap-y-10 px-4 sm:grid-cols-2 md:mt-[100px] md:px-12 lg:grid-cols-4">
      {percorso.map((tappa) => (
        <li key={tappa.periodo}>
          <Chip scura>{tappa.periodo}</Chip>
          <h2 className="mt-[17px] text-[18px] leading-[28px] font-semibold">{tappa.azienda}</h2>
          <p className="mt-[10px] max-w-[318px] text-button text-grey-testi">{tappa.ruolo}</p>
        </li>
      ))}
    </ol>
  );
}
