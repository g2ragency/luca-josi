"use client";

import { useState } from "react";
import { Media } from "@/components/ui";

/** Cerchio bianco con triangolo play al centro dell'immagine grande (Figma: 112×112). */
function PlayIcon() {
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" fill="none" aria-hidden="true" className="size-16 md:size-28">
      <circle cx="56" cy="56" r="55" stroke="white" strokeWidth="2" />
      <path d="M45 37.5L77 56L45 74.5V37.5Z" fill="white" />
    </svg>
  );
}

/**
 * Immagine grande in cima al progetto. Se il progetto ha un video, mostra il pulsante play:
 * al clic l'immagine lascia il posto al video, che parte con i controlli del browser.
 */
export function ProgettoHero({ immagine, video, titolo }: { immagine?: string; video?: string; titolo: string }) {
  const [riproduci, setRiproduci] = useState(false);

  if (riproduci && video) {
    return (
      <video
        src={video}
        poster={immagine}
        controls
        autoPlay
        playsInline
        className="size-full rounded-[5px] bg-black object-cover"
      />
    );
  }

  return (
    <>
      <Media src={immagine} alt={titolo} sizes="100vw" priority className="size-full" />
      {video && (
        <button
          type="button"
          onClick={() => setRiproduci(true)}
          aria-label={`Guarda il video: ${titolo}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <PlayIcon />
        </button>
      )}
    </>
  );
}
