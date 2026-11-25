/**
 * Contenuti della pagina Chi sono. I testi segnaposto ("Lorem ipsum", "Qui titolo valore")
 * vengono da Figma e vanno sostituiti con quelli definitivi.
 */

export type TappaPercorso = { periodo: string; azienda: string; ruolo: string };

export const percorso: TappaPercorso[] = [
  {
    periodo: "1991 — 1993",
    azienda: "Movimento Giovanile Socialista",
    ruolo: "Segretario nazionale e membro della Direzione Nazionale PSI",
  },
  { periodo: "1994 — 2014", azienda: "Einstein Multimedia Group", ruolo: "Founder & Chairman" },
  { periodo: "2017 — 2021", azienda: "TIM", ruolo: "Head of Brand, Strategy & Media" },
  { periodo: "2022 — OGGI", azienda: "Meta Europe Production", ruolo: "Founder" },
];

/**
 * Le card che "vengono verso lo schermo". Ognuna ha un anno: mentre la card arriva a fuoco,
 * il contatore in basso scorre fino a quell'anno. `anno: null` = oggi.
 * Ogni card ha il suo brano: nella barra in basso compare quello della card a fuoco.
 * ESEMPIO: da sostituire con le foto, gli anni e i brani veri (aggiungere `immagine` e, per
 * il brano, `artista` e il file audio quando arrivano).
 */
export type Brano = { artista?: string; titolo: string };
export type Ricordo = { anno: number | null; didascalia: string; brano: Brano };

const esempio = (anno: number | null): Ricordo => {
  const etichetta = anno ?? "oggi";
  return { anno, didascalia: `Esempio ${etichetta}`, brano: { titolo: `Nome del brano ${etichetta}` } };
};

export const ricordi: Ricordo[] = [1991, 1993, 1996, 1999, 2003, 2008, 2012, 2017, 2021, null].map(esempio);

/** Testo del brano come compare nella barra: "Artista — Titolo", o solo il titolo. */
export function nomeBrano(brano: Brano) {
  return brano.artista ? `${brano.artista} — ${brano.titolo}` : brano.titolo;
}

export const introduzione =
  "Lorem ipsum dolor sit amet sunto consectetuer adipiscing elit lommodo ligula eget dolor. Aenean massa cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mu rutrum etiam ultricies nisi vel augue. Curabitur est ullamcorper ultricies nisi. Nam eget dui";

export type Valore = { etichetta: string; titolo: string; testo: string };

const testoValore =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat";

export const valori: Valore[] = Array.from({ length: 4 }, () => ({
  etichetta: "Qui titolo valore",
  titolo: "Titolo descrittivo del primo valore",
  testo: testoValore,
}));
