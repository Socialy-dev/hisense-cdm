# Hisense — Landing Coupe du Monde 2026

Reconstruction pixel-perfect d'une maquette Figma en Next.js 14 + TypeScript + Tailwind, avec quiz interactif et lecteur vidéo YouTube inline.

## 🔗 Dev local

```bash
cd ~/Projects/hisense-cdm
npm run dev
# → http://localhost:3001
```

## État actuel (session 18 mai)

Toutes les sections du Figma sont en place + 2 ajouts interactifs :

- **Hero** + KV Coupe du Monde + "Innovating Brighter Life"
- **Grid 4 cards** (MPP / Stadium Experience / 2 PLACES / 300€ remboursés)
- **Bandeau** USA — JAPON 16 JUIN
- **Newsletter** turquoise
- **Bannière TV salon** ("Le stade comme si vous y étiez")
- **Grid 3 produits** (TV MiniLED, Frigo, Laser TV)
- **🎯 Quiz interactif** (4 questions → profil P/C/T → produit recommandé → email → confirmation)
- **🎥 Vidéo inline** YouTube `U6xmkiknDJM` (thumbnail HD = première frame, autoplay au clic)
- **Footer** Hisense (rendu comme image dans la maquette Figma)

## Stack

- **Next.js 14.2.35** (App Router, port 3001)
- **TypeScript 5** strict
- **Tailwind CSS 3.4** (arbitrary classes pour fidélité Figma)
- **next/font/google** :
  - `Inter Tight` (titres / body landing — métriques proches de Hisense Alfabet propriétaire)
  - `Barlow Condensed` (titres du quiz)
  - `DM Sans` (body du quiz)

## Architecture

```
src/app/
├── layout.tsx          # Fontes Inter Tight + Barlow + DM Sans
├── globals.css         # Reset + overflow-x: hidden
├── page.tsx            # Landing complète (659 lignes), auto-générée depuis code Figma canonique
├── scale-wrapper.tsx   # Auto-scale 1920px → viewport (client component)
├── quiz-content.tsx    # Quiz interactif 4 questions + scoring + email (client component)
└── video-player.tsx    # <InlineVideoSection> : thumbnail YouTube + iframe inline au clic

public/
├── images/             # 14 assets PNG téléchargés depuis Figma
└── svg/                # 10 assets SVG (flèches, ellipses, play icon, sponsor icon)
```

## Méthode pixel-perfect

1. Code Figma canonique extrait via `mcp__figma__get_design_context` sur node `1:3` (frame "1920w light")
2. Script Python (`/tmp/hisense-shots/transform.py`) transforme URLs Figma signées → chemins locaux + fonte propriétaire → Inter Tight
3. Classes Tailwind invalides du Figma export fixées (`col-1` → `col-start-1`, `grid-cols-[repeat(3,...)]` → `grid-cols-3`, underscores parasites supprimés)
4. **`ScaleWrapper`** : la page reste design 1920px mais s'auto-scale au viewport via `transform: scale(viewport/1920)`. Aucun scroll horizontal jamais.

## Quiz — scoring

Chaque option des 4 questions attribue des points à 3 profils :

| Profil             | Tagline                                   | Produit recommandé       |
| ------------------ | ----------------------------------------- | ------------------------ |
| **P** Passionné 🏟️ | "Au cœur du match, pas juste le regarder" | Laser TV 4K · L9Q        |
| **C** Convivial 🥂 | "Sans partage, aucun intérêt"             | Réfrigérateur FreshFit   |
| **T** Tacticien 🔍 | "Rien ne vous échappe"                    | TV RGB MiniLED 4K · 116" |

Le profil dominant en score gagne. Flow : intro → 4 questions → résultat + email → confirmation 🎉.

## Vidéo

- ID YouTube : `U6xmkiknDJM`
- Thumbnail : `https://i.ytimg.com/vi/U6xmkiknDJM/maxresdefault.jpg` (chargé directement en `<img>`, pas via `next/image`)
- Au clic : iframe `youtube.com/embed/...?autoplay=1&rel=0&modestbranding=1` qui remplace inline le thumbnail + play button dans la même section

## Source Figma

```
https://www.figma.com/design/aiaQP5UL78dMpB79w63UAs/Homepage-Hisense-CdM
fileKey: aiaQP5UL78dMpB79w63UAs
nodeId:  1:3  (frame "1920w light")
```

## Commandes courantes

```bash
npm run dev        # dev server sur :3001
npm run build      # build prod
npm run start      # serveur prod sur :3001
npx tsc --noEmit   # check TS
```

## Deploy

Le projet est Vercel-ready :

```bash
npx vercel       # preview
npx vercel --prod
```

Ou via GitHub : init un repo, push, importer dans Vercel.

## Important pour la prochaine session

- Le dev server doit être lancé avec `npm run dev` (port 3001)
- Si le port 3001 est pris, change-le dans `package.json` (`scripts.dev`)
- Toutes les modifs UI passent par `src/app/page.tsx` (statique) ou les composants client (`quiz-content.tsx`, `video-player.tsx`, `scale-wrapper.tsx`)
- Ne PAS toucher aux `data-node-id` (utiles pour retrouver le node Figma correspondant)
