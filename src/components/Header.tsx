import Image from "next/image";
import { TransitionLink } from "@/components/PageTransition";
import { classePulsante, TestoPulsante } from "@/components/ui";

const links = [
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/libri", label: "Pubblicazioni" },
  { href: "/articoli", label: "Articoli" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 grid grid-cols-[1fr_auto_1fr] items-center px-4 pt-[15px] text-button md:px-12">
      <TransitionLink href="/" className="justify-self-start" aria-label="Luca Josi, home">
        <Image src="/brand/logo-luca-josi.svg" alt="Luca Josi" width={130} height={22} priority unoptimized />
      </TransitionLink>

      {/* La versione mobile del menu non è ancora disegnata: per ora sotto i 768px restano logo e Contatti. */}
      <nav aria-label="Principale" className="hidden items-center gap-12 md:flex">
        {links.map((link) => (
          <TransitionLink key={link.href} href={link.href}>
            {link.label}
          </TransitionLink>
        ))}
      </nav>

      <TransitionLink
        href="/contatti"
        className={`col-start-3 justify-self-end ${classePulsante}`}
      >
        <TestoPulsante>Contatti</TestoPulsante>
      </TransitionLink>
    </header>
  );
}
