import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);
  // Curva morbida usata per tutte le animazioni del sito: parte lenta, accelera e frena a lungo.
  CustomEase.create("osmo", "0.625, 0.05, 0, 1");
  gsap.defaults({ ease: "osmo", duration: 0.6 });
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Prepara i titoli h1 con `data-reveal="heading"` dentro `root`: li divide in parole e le
 * nasconde "coricate" all'indietro sotto la riga. `play()` le ribalta in piedi una dopo
 * l'altra, in 3D, come le palette di un tabellone, con una frenata lunga. La durata totale
 * non dipende dalla lunghezza del titolo.
 */
export function prepareHeadingReveal(root: ParentNode | null) {
  const headings = root
    ? Array.from(root.querySelectorAll<HTMLElement>('[data-reveal="heading"]'))
    : [];
  const splits = headings.map((el) => SplitText.create(el, { type: "words" }));
  const words = splits.flatMap((split) => split.words);
  // Pagina senza titoli da animare: niente da fare, ed evita gli avvisi di GSAP sulle liste vuote.
  if (words.length === 0) return { play: () => gsap.timeline() };
  gsap.set(words, {
    yPercent: 45,
    rotationX: -100,
    opacity: 0,
    transformOrigin: "50% 100%",
    transformPerspective: 900,
  });

  return {
    play() {
      return gsap.to(words, {
        yPercent: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: { amount: 0.6 },
        onComplete: () => splits.forEach((split) => split.revert()),
      });
    },
  };
}

export { gsap, ScrollTrigger };
