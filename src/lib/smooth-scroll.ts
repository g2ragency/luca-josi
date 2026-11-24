import Lenis from "lenis";
import { gsap } from "@/lib/gsap";

let lenis: Lenis | null = null;

/**
 * Scorrimento morbido (Lenis), con gli stessi valori del sito di riferimento.
 * Un'unica istanza per tutto il sito, creata al primo uso nel browser e mossa dal
 * ticker di GSAP così animazioni e scroll restano sincronizzati.
 */
export function getLenis() {
  if (typeof window === "undefined") return null;
  if (!lenis) {
    lenis = new Lenis({ lerp: 0.165, wheelMultiplier: 1.25 });
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return lenis;
}
