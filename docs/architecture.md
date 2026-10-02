# Architecture & Conventions Techniques — Site Vitrine WhatsApp (Template)

Ce document complète le `cahier-des-charges.md` (qui fixe le *quoi* et le *pourquoi*) en précisant le *comment* : structure de dossiers, conventions de nommage, et règles pour ajouter du code sans casser la cohérence du template. Tout agent codeur (Cline, Antigravity, Claude Code) doit lire ce document avant toute modification.

---

## 1. Stack

- **Framework :** Vue 3, Composition API, exclusivement `<script setup>`
- **Bundler :** Vite
- **CSS :** Tailwind CSS v4 (configuré via `@tailwindcss/vite`, tokens définis en CSS avec `@theme`, pas de `tailwind.config.js`)
- **Routage :** Vue Router 4, historique HTML5 (`createWebHistory`)
- **État global :** Pinia

Rappel : cette stack est figée (primitive P7 du cahier des charges). Aucune substitution sans validation explicite des mentors.

---

## 2. Structure des dossiers

```
mon-site-vitrine/
├── public/
│   ├── favicon.svg
│   └── images/                  # Visuels produits, catégories, OG image
├── src/
│   ├── data/                    # Source de vérité du contenu (JSON)
│   │   ├── products.json
│   │   ├── categories.json
│   │   ├── testimonials.json
│   │   └── settings.json
│   ├── components/
│   │   ├── ui/                  # Composants génériques réutilisables partout (réservé, à peupler au besoin)
│   │   ├── layout/               # Structure globale : AppHeader, AppFooter, CartDrawer
│   │   ├── home/                 # Sections propres à la page d'accueil : HeroSection, CategoryGrid,
│   │   │                         #   FeaturedProducts, TestimonialSlider, ContactSection
│   │   └── product/              # Liés aux produits : ProductCard, AddToCartButton
│   ├── composables/               # Logique réutilisable : useWhatsApp.js
│   ├── stores/                     # État global Pinia : cart.js
│   ├── pages/                       # Une page = une route : Home, ProductList, ProductDetail, Contact
│   ├── router/                       # index.js (déclaration des routes + meta SEO)
│   ├── utils/                         # Fonctions utilitaires sans état : seo.js
│   ├── style.css                       # Import Tailwind + tokens @theme (couleurs, polices)
│   ├── App.vue                          # Coquille globale (Header/Footer/CartDrawer + router-view)
│   └── main.js                           # Point d'entrée, montage Pinia + Router
├── index.html                              # Meta SEO par défaut, favicon, fonts, theme-color
└── vite.config.js                           # Plugins Vue + Tailwind, alias @
```

**Règle d'emplacement des composants :** la portée du composant détermine son dossier.
- Utilisé uniquement sur la Home → `home/`
- Lié à l'affichage ou à l'action d'un produit → `product/`
- Structurel, présent sur toutes les pages → `layout/`
- Générique, sans dépendance métier, potentiellement réutilisable ailleurs (bouton, badge, input) → `ui/`

---

## 3. Conventions de nommage

| Type | Convention | Exemple |
|---|---|---|
| Composants Vue | PascalCase | `ProductCard.vue`, `AddToCartButton.vue` |
| Composables | camelCase, préfixe `use` | `useWhatsApp.js` |
| Stores Pinia | camelCase, export `useXStore` | `useCartStore` (fichier `cart.js`) |
| Pages | PascalCase, suffixe implicite de route | `ProductDetail.vue` |
| Slugs de données (JSON) | kebab-case | `"slug": "produit-un"` |
| Classes CSS custom | évitées — utility-first Tailwind uniquement | — |
| Tokens de couleur | `--color-<nom>` dans `@theme`, exposés comme classes Tailwind (`bg-brand`, `text-ink`) | — |

**Règle stricte sur les couleurs :** aucune couleur ne doit être écrite en dur (`#RRGGBB`, `bg-[#...]`) dans un composant. Toute couleur passe par un token défini dans `src/style.css`. C'est un critère de revue (niveau 4 du cahier des charges).

---

## 4. Gestion des données

- Les fichiers JSON de `src/data/` sont la **source de vérité unique** du contenu. Les composants les importent directement (`import products from '@/data/products.json'`), pas de duplication de données en dur dans un composant.
- Toute nouvelle donnée doit respecter la structure de champs déjà en place dans le fichier concerné (ne pas ajouter de champ sans concertation si ça affecte plusieurs composants).
- Le panier (`stores/cart.js`) ne stocke que `id` + `quantity` ; il relit toujours `products.json` pour le nom/prix à jour — ne jamais dupliquer ces infos dans le store.

---

## 5. Ajouter une page

1. Créer le fichier dans `src/pages/`.
2. L'enregistrer dans `src/router/index.js`, avec `meta.title` et `meta.description` (sauf cas spécial type fiche produit, où le titre est dérivé dynamiquement — voir le traitement de `product-detail` dans `router/afterEach`).
3. Si la page a besoin d'un composant de section dédié, le placer dans le sous-dossier `components/` approprié, pas directement dans la page si la section est réutilisable ailleurs.

---

## 6. Ajouter ou modifier un composant

- Un composant qui dépasse ~150 lignes de template devrait être découpé en sous-composants.
- Les props sont toujours typées (`defineProps({ product: { type: Object, required: true } })`), jamais implicites.
- Pas de logique métier directement dans le `<template>` au-delà de l'affichage conditionnel simple — toute logique de calcul va dans le `<script setup>` ou un composable.

---

## 7. Style et design tokens

Tous les tokens vivent dans le bloc `@theme` de `src/style.css` :

```css
@theme {
  --font-serif: "...";
  --font-sans: "...";
  --color-cream: #...;
  --color-ink: #...;
  --color-brand: #...;
  --color-brand-dark: #...;
  --color-accent: #...;
  --color-sage: #...;
}
```

Changer la palette ou la typo d'un client ne doit **jamais** toucher à autre chose que ces lignes (cf. cahier des charges, point C4/C5). Les noms de tokens eux-mêmes (`brand`, `accent`, `sage`...) restent stables d'un client à l'autre — seules leurs valeurs changent — pour que les classes Tailwind dans les composants (`bg-brand`, `text-ink`) n'aient jamais besoin d'être réécrites.

---

## 8. Déploiement

- Cible : Netlify ou Vercel (primitive P10).
- Le site étant une SPA avec `createWebHistory`, une règle de redirection est obligatoire pour que toute route (ex. `/produits/mon-produit`) serve `index.html` plutôt qu'une erreur 404 au rafraîchissement. Sur Netlify, cela passe par un fichier `public/_redirects` contenant `/* /index.html 200`. Sur Vercel, par une règle de rewrite dans `vercel.json`. Le choix de la plateforme détermine quel fichier créer.

---

## 9. Git & versionnement

- Dépôt : `site-vitrine-whatsapp-template`, compte GitHub `authentiquedimas-code`.
- Branche principale : `main`.
- Un agent qui initialise le dépôt doit inclure un `.gitignore` standard Node/Vite (`node_modules/`, `dist/`, fichiers d'environnement locaux).
- Convention de commit : à définir avec les mentors si besoin d'un standard (ex. Conventional Commits) — non figé à ce stade, à traiter au cas par cas tant que ce n'est pas explicitement demandé.

---

## 10. Rappel : qui peut modifier quoi

Voir `cahier-des-charges.md`, section 3 (points de personnalisation) pour la liste exhaustive. En résumé : tout ce qui est dans `src/data/`, les tokens de `style.css`, `index.html` (fonts/meta) et les champs `meta` du router est personnalisable librement. Tout le reste (`.vue` de `components/` et `pages/`) est le cœur du template — une modification là nécessite un signalement via `QUESTIONS-POUR-MENTORS.md` et validation des mentors avant d'être codée.
