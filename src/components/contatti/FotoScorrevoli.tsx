import { Scorrevole } from "@/components/Scorrevole";
import { Media } from "@/components/ui";

/** Fila di foto quadrate della newsletter (Figma: 204×204, 24px di distanza) che scorre da sola. */
export function FotoScorrevoli({ foto }: { foto: { src?: string; alt: string }[] }) {
  return (
    <Scorrevole
      elementi={foto.map((f, i) => (
        <div key={i} className="pr-4 md:pr-6">
          <Media src={f.src} alt={f.alt} sizes="204px" parallasse={false} className="size-[150px] md:size-[204px]" />
        </div>
      ))}
    />
  );
}
