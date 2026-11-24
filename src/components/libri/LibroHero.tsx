import type { CSSProperties } from "react";
import { Media } from "@/components/ui";

/**
 * Immagine grande in cima al libro: la copertina al centro, su uno sfondo pieno
 * (Figma: copertina 497×676 dentro il riquadro 1344×758). Senza `sfondo` resta grigio chiaro.
 */
export function LibroHero({ copertina, sfondo, titolo }: { copertina?: string; sfondo?: string; titolo: string }) {
  const stile: CSSProperties | undefined = sfondo ? { backgroundColor: sfondo } : undefined;

  return (
    <div className="flex size-full items-center justify-center overflow-hidden rounded-[5px] bg-grey/50" style={stile}>
      <Media
        src={copertina}
        alt={`Copertina di ${titolo}`}
        sizes="(min-width: 768px) 35vw, 60vw"
        priority
        className="aspect-[497/676] h-[89.2%] shadow-[0_24px_60px_-12px_rgb(0_0_0/0.35)]"
      />
    </div>
  );
}
