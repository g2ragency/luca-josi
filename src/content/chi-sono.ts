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
 * ESEMPIO: da sostituire con le foto e gli anni veri (aggiungere `immagine` quando arrivano).
 */
export type Ricordo = { anno: number | null; didascalia: string };

export const ricordi: Ricordo[] = [
  { anno: 1991, didascalia: "Esempio 1991" },
  { anno: 1993, didascalia: "Esempio 1993" },
  { anno: 1996, didascalia: "Esempio 1996" },
  { anno: 1999, didascalia: "Esempio 1999" },
  { anno: 2003, didascalia: "Esempio 2003" },
  { anno: 2008, didascalia: "Esempio 2008" },
  { anno: 2012, didascalia: "Esempio 2012" },
  { anno: 2017, didascalia: "Esempio 2017" },
  { anno: 2021, didascalia: "Esempio 2021" },
  { anno: null, didascalia: "Esempio oggi" },
];

/** Brano del lettore nella barra in basso (segnaposto di Figma, audio non ancora collegato). */
export const brano = { artista: "Nome artista", titolo: "Nome del brano" };

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
