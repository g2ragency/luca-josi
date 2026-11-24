/** Chiave in sessionStorage: se presente, la firma iniziale è già stata vista in questa sessione. */
export const INTRO_SEEN_KEY = "lucajosi:intro-vista";

/**
 * Gira nel <head> prima che la pagina venga disegnata: se l'intro è già stata vista,
 * marca <html> così il CSS nasconde subito la schermata nera (niente lampo al ricaricamento).
 */
export const introSeenScript = `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_SEEN_KEY)}))document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`;
