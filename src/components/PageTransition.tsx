"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion, prepareHeadingReveal } from "@/lib/gsap";
import { getLenis } from "@/lib/smooth-scroll";

type TransitionContextValue = { navigate: (href: string) => void };

const TransitionContext = createContext<TransitionContextValue | null>(null);

/** Se la nuova pagina non arriva entro questo tempo, si annulla l'animazione. */
const NAVIGATION_TIMEOUT_MS = 8000;

/**
 * Transizione tra pagine: la pagina che lascia si rimpicciolisce e scivola a sinistra
 * ruotando, mentre la nuova entra da destra raddrizzandosi; poi i titoli salgono parola
 * per parola. La pagina vecchia è una copia statica del DOM, messa sopra finché Next.js
 * non ha montato la nuova.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement>(null);
  const outgoingRef = useRef<HTMLDivElement | null>(null);
  const busyRef = useRef(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const reset = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    outgoingRef.current?.remove();
    outgoingRef.current = null;
    document.documentElement.classList.remove("is-transitioning");
    getLenis()?.start();
    busyRef.current = false;
  }, []);

  // Avvia lo scorrimento morbido anche quando la schermata di caricamento è saltata.
  useEffect(() => {
    getLenis();
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const page = pageRef.current;
      const target = new URL(href, window.location.href);

      if (target.pathname === window.location.pathname) {
        router.push(href);
        return;
      }
      if (busyRef.current) return;
      if (!page || prefersReducedMotion()) {
        router.push(href);
        return;
      }

      busyRef.current = true;
      getLenis()?.stop();

      // Copia della pagina attuale, bloccata nella posizione di scroll corrente.
      const outgoing = document.createElement("div");
      outgoing.setAttribute("aria-hidden", "true");
      outgoing.inert = true;
      Object.assign(outgoing.style, {
        position: "fixed",
        inset: "0",
        height: "100vh",
        overflow: "clip",
        zIndex: "10",
        pointerEvents: "none",
      });
      const snapshot = page.cloneNode(true) as HTMLElement;
      snapshot.removeAttribute("data-page");
      Object.assign(snapshot.style, {
        position: "absolute",
        top: `${-window.scrollY}px`,
        left: "0",
        width: "100%",
      });
      outgoing.appendChild(snapshot);
      document.body.appendChild(outgoing);
      document.documentElement.classList.add("is-transitioning");
      outgoingRef.current = outgoing;

      timeoutRef.current = window.setTimeout(reset, NAVIGATION_TIMEOUT_MS);
      router.push(href, { scroll: false });
    },
    [router, reset],
  );

  // Gira quando Next.js ha montato la nuova pagina, prima che il browser la disegni.
  useLayoutEffect(() => {
    const page = pageRef.current;
    const outgoing = outgoingRef.current;
    if (!page || !outgoing) return;
    window.clearTimeout(timeoutRef.current);

    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    gsap.set(page, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      overflow: "clip",
      zIndex: 20,
      xPercent: 100,
      rotate: 5,
      scale: 0.85,
      transformOrigin: "center bottom",
    });
    const headings = prepareHeadingReveal(page);

    gsap
      .timeline()
      .to(outgoing, { scale: 0.8, autoAlpha: 0.8, transformOrigin: "center bottom", duration: 0.6 }, 0)
      .to(page, { xPercent: 0, rotate: 0, scale: 1, duration: 0.8 }, 0.1)
      .to(outgoing, { xPercent: -50, rotate: -5, duration: 0.8 }, 0.1)
      .call(() => headings.play(), [], 0.5)
      .call(
        () => {
          gsap.set(page, { clearProps: "all" });
          reset();
        },
        [],
        0.9,
      );
  }, [pathname, reset]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <div ref={pageRef} data-page className="relative flex min-h-screen flex-col bg-white">
        {children}
      </div>
    </TransitionContext.Provider>
  );
}

/**
 * Come `<Link>` di Next.js, ma con la transizione animata. I clic con Cmd/Ctrl
 * (nuova scheda) e i link esterni funzionano normalmente.
 */
export function TransitionLink({
  href,
  onNavigate,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const transition = useContext(TransitionContext);

  return (
    <Link
      href={href}
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (!transition) return;
        event.preventDefault();
        transition.navigate(href);
      }}
    />
  );
}
