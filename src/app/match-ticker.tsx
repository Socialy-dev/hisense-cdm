"use client";

import { useEffect, useState } from "react";

/**
 * Match Ticker — Coupe du Monde 2026
 * Calendrier phase de groupes hardcodé (vérifié Al Jazeera + WorldCupWiki).
 * Toutes les heures en UTC. Affichage en heure locale du visiteur.
 *
 * 72 matchs phase de groupes (12 groupes de 4 équipes × 6 matchs).
 * Tournoi : 11 juin → 19 juillet 2026.
 * Phase de groupes : 11 → 27 juin.
 */

export type Match = {
  utc: string; // ISO 8601 UTC
  home: { name: string; flag: string };
  away: { name: string; flag: string };
  group: string; // "A", "B", ... "L"
  venue: string;
  city: string;
};

export const MATCHES: Match[] = [
  // === 11 JUIN (JOURNÉE 1) ===
  {
    utc: "2026-06-11T19:00:00Z",
    home: { name: "Mexique", flag: "🇲🇽" },
    away: { name: "Afrique du Sud", flag: "🇿🇦" },
    group: "A",
    venue: "Estadio Azteca",
    city: "Mexico City",
  },
  {
    utc: "2026-06-12T02:00:00Z",
    home: { name: "Corée du Sud", flag: "🇰🇷" },
    away: { name: "Tchéquie", flag: "🇨🇿" },
    group: "A",
    venue: "Estadio Akron",
    city: "Zapopan",
  },
  // === 12 JUIN ===
  {
    utc: "2026-06-12T19:00:00Z",
    home: { name: "Canada", flag: "🇨🇦" },
    away: { name: "Bosnie-Herzégovine", flag: "🇧🇦" },
    group: "B",
    venue: "BMO Field",
    city: "Toronto",
  },
  {
    utc: "2026-06-13T01:00:00Z",
    home: { name: "USA", flag: "🇺🇸" },
    away: { name: "Paraguay", flag: "🇵🇾" },
    group: "D",
    venue: "SoFi Stadium",
    city: "Inglewood",
  },
  // === 13 JUIN ===
  {
    utc: "2026-06-13T19:00:00Z",
    home: { name: "Qatar", flag: "🇶🇦" },
    away: { name: "Suisse", flag: "🇨🇭" },
    group: "B",
    venue: "Levi's Stadium",
    city: "Santa Clara",
  },
  {
    utc: "2026-06-13T22:00:00Z",
    home: { name: "Brésil", flag: "🇧🇷" },
    away: { name: "Maroc", flag: "🇲🇦" },
    group: "C",
    venue: "MetLife Stadium",
    city: "East Rutherford",
  },
  {
    utc: "2026-06-14T01:00:00Z",
    home: { name: "Haïti", flag: "🇭🇹" },
    away: { name: "Écosse", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    group: "C",
    venue: "Gillette Stadium",
    city: "Foxborough",
  },
  {
    utc: "2026-06-14T04:00:00Z",
    home: { name: "Australie", flag: "🇦🇺" },
    away: { name: "Türkiye", flag: "🇹🇷" },
    group: "D",
    venue: "BC Place",
    city: "Vancouver",
  },
  // === 14 JUIN ===
  {
    utc: "2026-06-14T17:00:00Z",
    home: { name: "Allemagne", flag: "🇩🇪" },
    away: { name: "Curaçao", flag: "🇨🇼" },
    group: "E",
    venue: "NRG Stadium",
    city: "Houston",
  },
  {
    utc: "2026-06-14T20:00:00Z",
    home: { name: "Pays-Bas", flag: "🇳🇱" },
    away: { name: "Japon", flag: "🇯🇵" },
    group: "F",
    venue: "AT&T Stadium",
    city: "Arlington",
  },
  {
    utc: "2026-06-14T23:00:00Z",
    home: { name: "Côte d'Ivoire", flag: "🇨🇮" },
    away: { name: "Équateur", flag: "🇪🇨" },
    group: "E",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
  },
  {
    utc: "2026-06-15T02:00:00Z",
    home: { name: "Suède", flag: "🇸🇪" },
    away: { name: "Tunisie", flag: "🇹🇳" },
    group: "F",
    venue: "Estadio BBVA",
    city: "Monterrey",
  },
  // === 15 JUIN ===
  {
    utc: "2026-06-15T16:00:00Z",
    home: { name: "Espagne", flag: "🇪🇸" },
    away: { name: "Cap-Vert", flag: "🇨🇻" },
    group: "H",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },
  {
    utc: "2026-06-15T19:00:00Z",
    home: { name: "Belgique", flag: "🇧🇪" },
    away: { name: "Égypte", flag: "🇪🇬" },
    group: "G",
    venue: "Lumen Field",
    city: "Seattle",
  },
  {
    utc: "2026-06-15T22:00:00Z",
    home: { name: "Arabie Saoudite", flag: "🇸🇦" },
    away: { name: "Uruguay", flag: "🇺🇾" },
    group: "H",
    venue: "Hard Rock Stadium",
    city: "Miami Gardens",
  },
  {
    utc: "2026-06-16T01:00:00Z",
    home: { name: "Iran", flag: "🇮🇷" },
    away: { name: "Nouvelle-Zélande", flag: "🇳🇿" },
    group: "G",
    venue: "SoFi Stadium",
    city: "Inglewood",
  },
  // === 16 JUIN ===
  {
    utc: "2026-06-16T19:00:00Z",
    home: { name: "France", flag: "🇫🇷" },
    away: { name: "Sénégal", flag: "🇸🇳" },
    group: "I",
    venue: "MetLife Stadium",
    city: "East Rutherford",
  },
  {
    utc: "2026-06-16T22:00:00Z",
    home: { name: "Irak", flag: "🇮🇶" },
    away: { name: "Norvège", flag: "🇳🇴" },
    group: "I",
    venue: "Gillette Stadium",
    city: "Foxborough",
  },
  {
    utc: "2026-06-17T01:00:00Z",
    home: { name: "Argentine", flag: "🇦🇷" },
    away: { name: "Algérie", flag: "🇩🇿" },
    group: "J",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
  },
  // === 17 JUIN ===
  {
    utc: "2026-06-17T04:00:00Z",
    home: { name: "Autriche", flag: "🇦🇹" },
    away: { name: "Jordanie", flag: "🇯🇴" },
    group: "J",
    venue: "Levi's Stadium",
    city: "Santa Clara",
  },
  {
    utc: "2026-06-17T17:00:00Z",
    home: { name: "Portugal", flag: "🇵🇹" },
    away: { name: "RD Congo", flag: "🇨🇩" },
    group: "K",
    venue: "NRG Stadium",
    city: "Houston",
  },
  {
    utc: "2026-06-17T20:00:00Z",
    home: { name: "Angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    away: { name: "Croatie", flag: "🇭🇷" },
    group: "L",
    venue: "AT&T Stadium",
    city: "Arlington",
  },
  {
    utc: "2026-06-17T23:00:00Z",
    home: { name: "Ghana", flag: "🇬🇭" },
    away: { name: "Panama", flag: "🇵🇦" },
    group: "L",
    venue: "BMO Field",
    city: "Toronto",
  },
  {
    utc: "2026-06-18T02:00:00Z",
    home: { name: "Ouzbékistan", flag: "🇺🇿" },
    away: { name: "Colombie", flag: "🇨🇴" },
    group: "K",
    venue: "Estadio Azteca",
    city: "Mexico City",
  },
  // === 18 JUIN (JOURNÉE 2) ===
  {
    utc: "2026-06-18T16:00:00Z",
    home: { name: "Tchéquie", flag: "🇨🇿" },
    away: { name: "Afrique du Sud", flag: "🇿🇦" },
    group: "A",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },
  {
    utc: "2026-06-18T19:00:00Z",
    home: { name: "Suisse", flag: "🇨🇭" },
    away: { name: "Bosnie-Herzégovine", flag: "🇧🇦" },
    group: "B",
    venue: "SoFi Stadium",
    city: "Inglewood",
  },
  {
    utc: "2026-06-18T22:00:00Z",
    home: { name: "Canada", flag: "🇨🇦" },
    away: { name: "Qatar", flag: "🇶🇦" },
    group: "B",
    venue: "BC Place",
    city: "Vancouver",
  },
  {
    utc: "2026-06-19T01:00:00Z",
    home: { name: "Mexique", flag: "🇲🇽" },
    away: { name: "Corée du Sud", flag: "🇰🇷" },
    group: "A",
    venue: "Estadio Akron",
    city: "Zapopan",
  },
  // === 19 JUIN ===
  {
    utc: "2026-06-19T19:00:00Z",
    home: { name: "USA", flag: "🇺🇸" },
    away: { name: "Australie", flag: "🇦🇺" },
    group: "D",
    venue: "Lumen Field",
    city: "Seattle",
  },
  {
    utc: "2026-06-19T22:00:00Z",
    home: { name: "Écosse", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    away: { name: "Maroc", flag: "🇲🇦" },
    group: "C",
    venue: "Gillette Stadium",
    city: "Foxborough",
  },
  {
    utc: "2026-06-20T01:00:00Z",
    home: { name: "Brésil", flag: "🇧🇷" },
    away: { name: "Haïti", flag: "🇭🇹" },
    group: "C",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
  },
  {
    utc: "2026-06-20T04:00:00Z",
    home: { name: "Türkiye", flag: "🇹🇷" },
    away: { name: "Paraguay", flag: "🇵🇾" },
    group: "D",
    venue: "Levi's Stadium",
    city: "Santa Clara",
  },
  // === 20 JUIN ===
  {
    utc: "2026-06-20T17:00:00Z",
    home: { name: "Pays-Bas", flag: "🇳🇱" },
    away: { name: "Suède", flag: "🇸🇪" },
    group: "F",
    venue: "NRG Stadium",
    city: "Houston",
  },
  {
    utc: "2026-06-20T20:00:00Z",
    home: { name: "Allemagne", flag: "🇩🇪" },
    away: { name: "Côte d'Ivoire", flag: "🇨🇮" },
    group: "E",
    venue: "BMO Field",
    city: "Toronto",
  },
  {
    utc: "2026-06-21T00:00:00Z",
    home: { name: "Équateur", flag: "🇪🇨" },
    away: { name: "Curaçao", flag: "🇨🇼" },
    group: "E",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
  },
  {
    utc: "2026-06-21T04:00:00Z",
    home: { name: "Tunisie", flag: "🇹🇳" },
    away: { name: "Japon", flag: "🇯🇵" },
    group: "F",
    venue: "Estadio BBVA",
    city: "Monterrey",
  },
  // === 21 JUIN ===
  {
    utc: "2026-06-21T16:00:00Z",
    home: { name: "Espagne", flag: "🇪🇸" },
    away: { name: "Arabie Saoudite", flag: "🇸🇦" },
    group: "H",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },
  {
    utc: "2026-06-21T19:00:00Z",
    home: { name: "Belgique", flag: "🇧🇪" },
    away: { name: "Iran", flag: "🇮🇷" },
    group: "G",
    venue: "SoFi Stadium",
    city: "Inglewood",
  },
  {
    utc: "2026-06-21T22:00:00Z",
    home: { name: "Uruguay", flag: "🇺🇾" },
    away: { name: "Cap-Vert", flag: "🇨🇻" },
    group: "H",
    venue: "Hard Rock Stadium",
    city: "Miami Gardens",
  },
  {
    utc: "2026-06-22T01:00:00Z",
    home: { name: "Nouvelle-Zélande", flag: "🇳🇿" },
    away: { name: "Égypte", flag: "🇪🇬" },
    group: "G",
    venue: "BC Place",
    city: "Vancouver",
  },
  // === 22 JUIN ===
  {
    utc: "2026-06-22T17:00:00Z",
    home: { name: "Argentine", flag: "🇦🇷" },
    away: { name: "Autriche", flag: "🇦🇹" },
    group: "J",
    venue: "AT&T Stadium",
    city: "Arlington",
  },
  {
    utc: "2026-06-22T21:00:00Z",
    home: { name: "France", flag: "🇫🇷" },
    away: { name: "Irak", flag: "🇮🇶" },
    group: "I",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
  },
  {
    utc: "2026-06-23T00:00:00Z",
    home: { name: "Norvège", flag: "🇳🇴" },
    away: { name: "Sénégal", flag: "🇸🇳" },
    group: "I",
    venue: "MetLife Stadium",
    city: "East Rutherford",
  },
  {
    utc: "2026-06-23T03:00:00Z",
    home: { name: "Jordanie", flag: "🇯🇴" },
    away: { name: "Algérie", flag: "🇩🇿" },
    group: "J",
    venue: "Levi's Stadium",
    city: "Santa Clara",
  },
  // === 23 JUIN ===
  {
    utc: "2026-06-23T17:00:00Z",
    home: { name: "Portugal", flag: "🇵🇹" },
    away: { name: "Ouzbékistan", flag: "🇺🇿" },
    group: "K",
    venue: "NRG Stadium",
    city: "Houston",
  },
  {
    utc: "2026-06-23T20:00:00Z",
    home: { name: "Angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    away: { name: "Ghana", flag: "🇬🇭" },
    group: "L",
    venue: "Gillette Stadium",
    city: "Foxborough",
  },
  {
    utc: "2026-06-23T23:00:00Z",
    home: { name: "Panama", flag: "🇵🇦" },
    away: { name: "Croatie", flag: "🇭🇷" },
    group: "L",
    venue: "BMO Field",
    city: "Toronto",
  },
  {
    utc: "2026-06-24T02:00:00Z",
    home: { name: "Colombie", flag: "🇨🇴" },
    away: { name: "RD Congo", flag: "🇨🇩" },
    group: "K",
    venue: "Estadio Akron",
    city: "Zapopan",
  },
  // === 24 JUIN (JOURNÉE 3) ===
  {
    utc: "2026-06-24T19:00:00Z",
    home: { name: "Suisse", flag: "🇨🇭" },
    away: { name: "Canada", flag: "🇨🇦" },
    group: "B",
    venue: "BC Place",
    city: "Vancouver",
  },
  {
    utc: "2026-06-24T19:00:00Z",
    home: { name: "Bosnie-Herzégovine", flag: "🇧🇦" },
    away: { name: "Qatar", flag: "🇶🇦" },
    group: "B",
    venue: "Lumen Field",
    city: "Seattle",
  },
  {
    utc: "2026-06-24T22:00:00Z",
    home: { name: "Écosse", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
    away: { name: "Brésil", flag: "🇧🇷" },
    group: "C",
    venue: "Hard Rock Stadium",
    city: "Miami Gardens",
  },
  {
    utc: "2026-06-24T22:00:00Z",
    home: { name: "Maroc", flag: "🇲🇦" },
    away: { name: "Haïti", flag: "🇭🇹" },
    group: "C",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },
  {
    utc: "2026-06-25T01:00:00Z",
    home: { name: "Tchéquie", flag: "🇨🇿" },
    away: { name: "Mexique", flag: "🇲🇽" },
    group: "A",
    venue: "Estadio Azteca",
    city: "Mexico City",
  },
  {
    utc: "2026-06-25T01:00:00Z",
    home: { name: "Afrique du Sud", flag: "🇿🇦" },
    away: { name: "Corée du Sud", flag: "🇰🇷" },
    group: "A",
    venue: "Estadio BBVA",
    city: "Monterrey",
  },
  // === 25 JUIN ===
  {
    utc: "2026-06-25T20:00:00Z",
    home: { name: "Équateur", flag: "🇪🇨" },
    away: { name: "Allemagne", flag: "🇩🇪" },
    group: "E",
    venue: "MetLife Stadium",
    city: "East Rutherford",
  },
  {
    utc: "2026-06-25T20:00:00Z",
    home: { name: "Curaçao", flag: "🇨🇼" },
    away: { name: "Côte d'Ivoire", flag: "🇨🇮" },
    group: "E",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
  },
  {
    utc: "2026-06-25T23:00:00Z",
    home: { name: "Japon", flag: "🇯🇵" },
    away: { name: "Suède", flag: "🇸🇪" },
    group: "F",
    venue: "AT&T Stadium",
    city: "Arlington",
  },
  {
    utc: "2026-06-25T23:00:00Z",
    home: { name: "Tunisie", flag: "🇹🇳" },
    away: { name: "Pays-Bas", flag: "🇳🇱" },
    group: "F",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
  },
  {
    utc: "2026-06-26T02:00:00Z",
    home: { name: "Türkiye", flag: "🇹🇷" },
    away: { name: "USA", flag: "🇺🇸" },
    group: "D",
    venue: "SoFi Stadium",
    city: "Inglewood",
  },
  {
    utc: "2026-06-26T02:00:00Z",
    home: { name: "Paraguay", flag: "🇵🇾" },
    away: { name: "Australie", flag: "🇦🇺" },
    group: "D",
    venue: "Levi's Stadium",
    city: "Santa Clara",
  },
  // === 26 JUIN ===
  {
    utc: "2026-06-26T19:00:00Z",
    home: { name: "Norvège", flag: "🇳🇴" },
    away: { name: "France", flag: "🇫🇷" },
    group: "I",
    venue: "Gillette Stadium",
    city: "Foxborough",
  },
  {
    utc: "2026-06-26T19:00:00Z",
    home: { name: "Sénégal", flag: "🇸🇳" },
    away: { name: "Irak", flag: "🇮🇶" },
    group: "I",
    venue: "BMO Field",
    city: "Toronto",
  },
  {
    utc: "2026-06-27T00:00:00Z",
    home: { name: "Cap-Vert", flag: "🇨🇻" },
    away: { name: "Arabie Saoudite", flag: "🇸🇦" },
    group: "H",
    venue: "NRG Stadium",
    city: "Houston",
  },
  {
    utc: "2026-06-27T00:00:00Z",
    home: { name: "Uruguay", flag: "🇺🇾" },
    away: { name: "Espagne", flag: "🇪🇸" },
    group: "H",
    venue: "Estadio Akron",
    city: "Zapopan",
  },
  {
    utc: "2026-06-27T03:00:00Z",
    home: { name: "Égypte", flag: "🇪🇬" },
    away: { name: "Iran", flag: "🇮🇷" },
    group: "G",
    venue: "Lumen Field",
    city: "Seattle",
  },
  {
    utc: "2026-06-27T03:00:00Z",
    home: { name: "Nouvelle-Zélande", flag: "🇳🇿" },
    away: { name: "Belgique", flag: "🇧🇪" },
    group: "G",
    venue: "BC Place",
    city: "Vancouver",
  },
  // === 27 JUIN ===
  {
    utc: "2026-06-27T21:00:00Z",
    home: { name: "Panama", flag: "🇵🇦" },
    away: { name: "Angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    group: "L",
    venue: "MetLife Stadium",
    city: "East Rutherford",
  },
  {
    utc: "2026-06-27T21:00:00Z",
    home: { name: "Croatie", flag: "🇭🇷" },
    away: { name: "Ghana", flag: "🇬🇭" },
    group: "L",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
  },
  {
    utc: "2026-06-27T23:30:00Z",
    home: { name: "Colombie", flag: "🇨🇴" },
    away: { name: "Portugal", flag: "🇵🇹" },
    group: "K",
    venue: "Hard Rock Stadium",
    city: "Miami Gardens",
  },
  {
    utc: "2026-06-27T23:30:00Z",
    home: { name: "RD Congo", flag: "🇨🇩" },
    away: { name: "Ouzbékistan", flag: "🇺🇿" },
    group: "K",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
  },
  {
    utc: "2026-06-28T02:00:00Z",
    home: { name: "Algérie", flag: "🇩🇿" },
    away: { name: "Autriche", flag: "🇦🇹" },
    group: "J",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
  },
  {
    utc: "2026-06-28T02:00:00Z",
    home: { name: "Jordanie", flag: "🇯🇴" },
    away: { name: "Argentine", flag: "🇦🇷" },
    group: "J",
    venue: "AT&T Stadium",
    city: "Arlington",
  },
];

// Durée approximative d'un match : 2h (90 min + arrêts + temps additionnel)
export const MATCH_DURATION_MS = 2 * 60 * 60 * 1000;

export function getCurrentState(now: Date): {
  match: Match | null;
  isLive: boolean;
  isOpening: boolean;
  isPostGroupStage: boolean;
} {
  // Match en cours ?
  const liveMatch = MATCHES.find((m) => {
    const start = new Date(m.utc).getTime();
    const end = start + MATCH_DURATION_MS;
    return now.getTime() >= start && now.getTime() < end;
  });
  if (liveMatch) {
    return {
      match: liveMatch,
      isLive: true,
      isOpening: false,
      isPostGroupStage: false,
    };
  }
  // Prochain match futur
  const nextMatch = MATCHES.find(
    (m) => new Date(m.utc).getTime() > now.getTime(),
  );
  if (nextMatch) {
    const isOpening = nextMatch === MATCHES[0];
    return {
      match: nextMatch,
      isLive: false,
      isOpening,
      isPostGroupStage: false,
    };
  }
  // Tous les matchs phase de groupes sont passés
  return {
    match: null,
    isLive: false,
    isOpening: false,
    isPostGroupStage: true,
  };
}

export function formatCountdown(
  targetMs: number,
  nowMs: number,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} {
  const diff = targetMs - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isPast: false };
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

export function MatchTicker() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) {
    // SSR / hydration : render statique du premier match pour matcher initial paint
    return (
      <BannerLayout
        label="MATCH D'OUVERTURE"
        match={MATCHES[0]}
        rightLabel="11 JUIN · 21:00"
        rightSub=""
        accent="opening"
      />
    );
  }

  const { match, isLive, isOpening, isPostGroupStage } = getCurrentState(now);

  // Tournoi terminé / phase finale
  if (isPostGroupStage || !match) {
    return (
      <BannerLayout
        label="PHASE À ÉLIMINATION DIRECTE"
        custom={
          <div className="flex items-center gap-4 text-[#faf9f5] text-[32px] tracking-[0.1945px] uppercase whitespace-nowrap">
            🏆 1/8 de finale dès le 29 juin
          </div>
        }
        rightLabel="Suivez sur fifa.com"
        rightSub=""
        accent="finals"
      />
    );
  }

  const matchDate = new Date(match.utc);
  const formattedDate = dateFmt.format(matchDate);
  const [dateStr, timeStr] = formattedDate.split(" à ");
  const rightLabel = dateStr.toUpperCase() + (timeStr ? ` · ${timeStr}` : "");

  if (isLive) {
    const endMs = matchDate.getTime() + MATCH_DURATION_MS;
    const elapsedMin = Math.floor(
      (now.getTime() - matchDate.getTime()) / (1000 * 60),
    );
    return (
      <BannerLayout
        label="EN DIRECT"
        match={match}
        rightLabel="MATCH EN COURS"
        rightSub={`${elapsedMin}e minute · ${match.venue}`}
        accent="live"
      />
    );
  }

  // Match à venir → countdown
  const cd = formatCountdown(matchDate.getTime(), now.getTime());
  const countdownStr =
    cd.days > 0
      ? `${cd.days}j ${String(cd.hours).padStart(2, "0")}h ${String(cd.minutes).padStart(2, "0")}m`
      : `${String(cd.hours).padStart(2, "0")}h ${String(cd.minutes).padStart(2, "0")}m ${String(cd.seconds).padStart(2, "0")}s`;

  return (
    <BannerLayout
      label={
        isOpening ? "MATCH D'OUVERTURE" : "PROCHAIN MATCH À VIVRE ENSEMBLE"
      }
      match={match}
      rightLabel={rightLabel}
      rightSub={`Dans ${countdownStr}`}
      accent={isOpening ? "opening" : "default"}
    />
  );
}

// ====================== UI Layout (matches the existing Figma banner) ======================

function BannerLayout({
  label,
  match,
  custom,
  rightLabel,
  rightSub,
  accent,
}: {
  label: string;
  match?: Match;
  custom?: React.ReactNode;
  rightLabel: string;
  rightSub: string;
  accent: "default" | "opening" | "live" | "finals";
}) {
  const labelColor =
    accent === "live"
      ? "text-[#ff4d4d]"
      : accent === "opening"
        ? "text-[#43e5dc]"
        : accent === "finals"
          ? "text-[#ffd76b]"
          : "text-[#b0aea5]";

  return (
    <div
      className="absolute bg-[#0e1a1f] border-[1.216px] border-[rgba(0,179,172,0.2)] border-solid h-[116.7px] left-0 min-h-[116.7px] overflow-clip rounded-[24.313px] top-[739.1px] w-[1556px]"
      data-node-id="1:108"
      data-name="Background+Border"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-full px-[44.979px] gap-[29.175px]">
        {/* Left label */}
        <div className="flex items-center gap-3">
          {accent === "live" && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d4d] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff4d4d]" />
            </span>
          )}
          <div
            className={`font-inter font-semibold text-[14.587px] tracking-[2.1881px] uppercase whitespace-nowrap ${labelColor}`}
          >
            {label}
          </div>
        </div>

        {/* Center — Match teams */}
        {custom ? (
          <div className="flex items-center justify-center">{custom}</div>
        ) : match ? (
          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <span className="text-[34px] leading-none">
                {match.home.flag}
              </span>
              <span className="font-inter font-medium text-[#faf9f5] text-[32px] tracking-[0.1945px] uppercase">
                {match.home.name}
              </span>
            </div>
            <span className="font-inter font-normal text-[#00b3ac] text-[29.175px] tracking-[0.1945px]">
              —
            </span>
            <div className="flex items-center gap-3">
              <span className="font-inter font-medium text-[#faf9f5] text-[32px] tracking-[0.1945px] uppercase">
                {match.away.name}
              </span>
              <span className="text-[34px] leading-none">
                {match.away.flag}
              </span>
            </div>
          </div>
        ) : null}

        {/* Right — Date + countdown */}
        <div className="flex flex-col items-end gap-1">
          <div className="font-inter font-normal text-[#00b3ac] text-[19.45px] text-right whitespace-nowrap leading-[24px]">
            {rightLabel}
          </div>
          {rightSub && (
            <div className="font-inter font-normal text-[rgba(250,249,245,0.55)] text-[13px] tracking-[0.5px] text-right whitespace-nowrap tabular-nums">
              {rightSub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
