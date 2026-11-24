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
 * Prepara i titoli con `data-reveal="heading"` dentro `root`: li divide in parole
 * e le nasconde sotto la riga. `play()` le fa salire una dopo l'altra.
 */
export function prepareHeadingReveal(root: ParentNode | null) {
  const headings = root
    ? Array.from(root.querySelectorAll<HTMLElement>('[data-reveal="heading"]'))
    : [];
  const splits = headings.map((el) =>
    SplitText.create(el, { type: "lines,words", mask: "lines" }),
  );
  const words = splits.flatMap((split) => split.words);
  gsap.set(words, { yPercent: 140, rotate: 5 });

  return {
    play() {
      return gsap.to(words, {
        yPercent: 0,
        rotate: 0,
        duration: 0.7,
        stagger: 0.03,
        onComplete: () => splits.forEach((split) => split.revert()),
      });
    },
  };
}

export { gsap, ScrollTrigger };
