# Hisense — Landing Coupe du Monde 2026

Reconstruction pixel-perfect d'une maquette Figma client en Next.js 14 + TypeScript + Tailwind, avec quiz interactif fonctionnel, lecteur vidéo YouTube inline, et **bandeau prochain match dynamique avec countdown live vers le tournoi**.

## 🔗 Liens importants

- **GitHub** : https://github.com/Socialy-dev/hisense-cdm (public, owner `Socialy-dev`)
- **Vercel preview** : déployée automatiquement à chaque push sur `main`
- **Source Figma** : https://www.figma.com/design/aiaQP5UL78dMpB79w63UAs/Homepage-Hisense-CdM (fileKey `aiaQP5UL78dMpB79w63UAs`, node `1:3`, frame "1920w light")
- **Dev local** : `cd ~/Projects/hisense-cdm && npm run dev` → http://localhost:3001

## État au 18 mai 2026

Toutes les sections du Figma sont en place + 3 modules interactifs livrés :

### Sections de la landing (du haut vers le bas)

1. **Header nav Hisense** + Hero KV Coupe du Monde + "Innovating Brighter Life"
2. **Grid 4 cards** : MPP / Stadium Experience central / 2 places à gagner / 300€ remboursés
3. **🎯 Bandeau MatchTicker dynamique** ← NOUVEAU. Countdown live vers le prochain match CdM 2026
4. **Newsletter** turquoise
5. **Bannière TV salon** ("Le stade comme si vous y étiez")
6. **Grid 3 produits** (TV MiniLED, Frigo combiné, Laser TV)
7. **🎯 Quiz interactif** (4 questions → profil P/C/T → produit recommandé → email → confirmation 🎉)
8. **🎥 Vidéo YouTube inline** (`U6xmkiknDJM`, thumbnail HD au repos, autoplay au clic)
9. **Footer Hisense** (rendu comme image dans la maquette Figma)

## Stack

- **Next.js 14.2.35** (App Router, port 3001)
- **TypeScript 5** strict
- **Tailwind CSS 3.4** (arbitrary classes pour fidélité Figma)
- **next/font/google** :
  - `Inter Tight` (landing, métriques proches de Hisense Alfabet propriétaire)
  - `Barlow Condensed` (titres du quiz)
  - `DM Sans` (body du quiz)

## Architecture

```
src/app/
├── layout.tsx          # Fontes Inter Tight + Barlow + DM Sans + viewport meta
├── globals.css         # Reset + overflow-x: hidden (no horizontal scroll)
├── page.tsx            # Landing statique (auto-générée depuis code Figma canonique)
├── scale-wrapper.tsx   # Client component : auto-scale 1920px → viewport + overlay mobile <768px
├── quiz-content.tsx    # Client component : Quiz 4 questions + scoring P/C/T + email
├── video-player.tsx    # Client component : <InlineVideoSection> avec iframe YouTube inline
└── match-ticker.tsx    # Client component : 72 matchs hardcodés + countdown live

public/
├── images/             # 14 PNG téléchargés depuis Figma (KV, produits, footer Hisense...)
└── svg/                # 10 SVG (flèches, ellipses, play, sponsor)
```

## Modules interactifs détaillés

### 🎯 MatchTicker (bandeau dynamique)

Calendrier phase de groupes CdM 2026 hardcodé (vérifié Al Jazeera + WorldCupWiki) — **72 matchs** du 11 au 27 juin 2026, tous les 12 groupes A→L couverts.

**4 états dynamiques** :

| État                                | Quand                        | Visuel                        |
| ----------------------------------- | ---------------------------- | ----------------------------- |
| **MATCH D'OUVERTURE**               | Avant le 11 juin 19h UTC     | Label teal bright `#43e5dc`   |
| **PROCHAIN MATCH À VIVRE ENSEMBLE** | Entre 2 matchs               | Label gris standard           |
| **🔴 EN DIRECT**                    | Pendant un match (0-120 min) | Label rouge + dot rouge pulse |
| **PHASE À ÉLIMINATION DIRECTE**     | Après le 27 juin             | Label or, message 1/8 finale  |

**UX** :

- Countdown live qui s'update chaque seconde
- Format intelligent : `12j 04h 32m` quand >24h, `04h 32m 18s` quand <24h
- `tabular-nums` pour éviter le sautillage visuel
- Auto-skip au prochain match quand un match dépasse kickoff+2h
- Affichage date en heure locale du visiteur via `Intl.DateTimeFormat('fr-FR')`

**Note** : pas d'API externe. Tout est statique → ultra fiable pour démo client.

### 🎯 Quiz Stadium Experience

Flow : intro → 4 questions → résultat profil + produit + email → confirmation 🎉

**3 profils** (calculés par scoring P/C/T sur les réponses) :

| Profil             | Tagline                                   | Produit recommandé       |
| ------------------ | ----------------------------------------- | ------------------------ |
| **P** Passionné 🏟️ | "Au cœur du match, pas juste le regarder" | Laser TV 4K · L9Q        |
| **C** Convivial 🥂 | "Sans partage, aucun intérêt"             | Réfrigérateur FreshFit   |
| **T** Tacticien 🔍 | "Rien ne vous échappe"                    | TV RGB MiniLED 4K · 116" |

### 🎥 Vidéo inline

- ID YouTube : `U6xmkiknDJM`
- Thumbnail au repos : `https://i.ytimg.com/vi/U6xmkiknDJM/maxresdefault.jpg`
- Iframe au clic : `https://www.youtube.com/embed/U6xmkiknDJM?autoplay=1&rel=0&modestbranding=1`
- Inline dans la section (pas modal), play button hover scale-110

## Responsive

`<ScaleWrapper>` côté client mesure `window.innerWidth` et applique `transform: scale(min(viewport / 1920, 1))` :

| Viewport        | Comportement                                                 |
| --------------- | ------------------------------------------------------------ |
| ≥1920px         | Page à taille design exacte (scale = 1), centrée             |
| 1024-1919px     | Auto-scale fluide pour remplir la largeur                    |
| 768-1023px      | Auto-scale jusqu'à 40% — lisible                             |
| <768px (mobile) | Overlay 🖥️ "Optimisé pour desktop" + CTA "Voir quand même →" |

- Resize fluide en live (`resize` event listener)
- Re-mesure post-load à 300ms + 1500ms pour fonts/images
- `body { overflow-x: hidden }` → aucun scroll horizontal jamais

## Méthode pixel-perfect appliquée

1. Code Figma canonique extrait via MCP `mcp__figma__get_design_context` sur node `1:3`
2. Transform Python (`/tmp/hisense-shots/transform.py`) : URLs Figma signées → chemins locaux + `font-['Hisense_Alfabet:...']` → `font-inter`
3. Fix classes Tailwind invalides du Figma export : `col-1` → `col-start-1`, `grid-cols-[repeat(3,...)]` → `grid-cols-3`, suppression underscores parasites `_XXXpx`
4. `<ScaleWrapper>` pour responsive sans casser le design 1920px
5. Vérification headless Chrome 1920px vs Figma reference HD (1921×6680)

## Commandes courantes

```bash
npm run dev        # dev server sur :3001
npm run build      # build prod
npm run start      # serveur prod sur :3001
npx tsc --noEmit   # check TypeScript

git push origin main  # push → Vercel auto-deploy
```

## Reprise dans une nouvelle session

```bash
cd ~/Projects/hisense-cdm
npm run dev
# → http://localhost:3001
```

**Fichiers où on modifie quoi** :

- Landing statique (sections Figma) → `src/app/page.tsx`
- Quiz (questions, profils, produits, scoring) → `src/app/quiz-content.tsx`
- Vidéo (changer videoId) → `src/app/video-player.tsx`
- Bandeau match (ajouter matchs, modifier dates) → `src/app/match-ticker.tsx`
- Responsive breakpoints / overlay mobile → `src/app/scale-wrapper.tsx`
- Fontes Google → `src/app/layout.tsx`

**Ne PAS toucher aux `data-node-id`** : ils référencent les nodes Figma originaux, utile pour retrouver un élément dans la maquette.

## Historique commits

```
630cf2e  feat: dynamic MatchTicker with live countdown + 72 group stage matches hardcoded
0395209  feat(responsive): mobile message overlay + smoother scale-to-fit on tablets
6283316  tweak: shrink quiz glass card from 1245x872 to 780x820 (less empty space)
b56845d  chore: revert to standard Next.js build (no static export) for Vercel deploy
0741962  feat: landing Hisense CdM pixel-perfect + quiz interactif + video inline
```

## À faire si on continue (idées)

- [ ] Brancher API api-sports.io (api-football.com) pour les phases finales (huitièmes+) — endpoint Next.js `/api/next-match` avec clé en env var Vercel (`FOOTBALL_API_KEY`), free tier 100 req/jour
- [ ] Récupérer la vraie fonte Hisense Alfabet `.woff2` si le client la fournit (remplacer Inter Tight dans `layout.tsx`)
- [ ] Câbler formulaire newsletter à un backend (Mailchimp / Sendinblue / Supabase)
- [ ] Câbler email quiz à un backend (récupération + envoi mail confirmation produit)
- [ ] Optimiser PNG → WebP (footer-hisense 270KB, banniere-tv-salon 5.2MB, stadium-experience 13MB) — `sharp` ou `squoosh-cli`
- [ ] Custom domain (au lieu du `*.vercel.app`) si le client veut
- [ ] Vraie version mobile responsive (au lieu de l'overlay "voir sur desktop")
- [ ] A11y audit : ratio contraste, navigation clavier sur le quiz, focus visible
- [ ] Tracking analytics (Plausible / Umami / Vercel Analytics) si client demande des stats

## Sources consultées pour le calendrier CdM 2026

- [2026 FIFA World Cup — Wikipedia](https://en.wikipedia.org/wiki/2026_FIFA_World_Cup)
- [Al Jazeera : Full match schedule, groups, format World Cup 2026](https://www.aljazeera.com/sports/2026/5/7/whats-the-full-match-schedule-groups-and-format-for-world-cup-2026)
- [WorldCupWiki schedule](https://worldcupwiki.com/schedule/)
- [FIFA : Mexico City Stadium hosts opening match](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/estadio-azteca-mexico-city-host-opening-match-world-cup-2026)

## Crédits

- Design : maquette Figma client
- Code : Ben Catellier + Claude (Anthropic Opus 4.7)
- Session de livraison : 18 mai 2026 (one-shot)
