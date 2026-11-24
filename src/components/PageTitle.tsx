import type { ReactNode } from "react";

/** Titolo grande in cima alle pagine interne (stile h1 di Figma). Entra parola per parola. */
export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1
      data-reveal="heading"
      className="max-w-[1440px] px-4 pt-[120px] text-h1 uppercase md:px-12 md:pt-[161px]"
    >
      {children}
    </h1>
  );
}
