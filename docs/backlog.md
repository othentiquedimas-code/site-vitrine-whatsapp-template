# Backlog — Site Vitrine WhatsApp (Template)

Légende : 🔲 À faire · 🔄 En cours · ✅ Fait

Chaque tâche est pensée pour être traitable dans une seule session d'agent. Un agent qui reprend une tâche 🔄 doit d'abord lire les notes laissées par l'agent précédent avant de continuer.

---

## Épique 0 — Documentation de pilotage *(mentors)*

- ✅ Cahier des charges (8 sections)
- ✅ Document d'architecture & conventions
- ✅ Fichier d'amorçage agents (`AGENTS.md`)
- ✅ Backlog (ce document)
- ✅ Création et initialisation du dépôt GitHub `site-vitrine-whatsapp-template` sous `othentiquedimas-code`

## Épique 1 — Audit du cœur existant *(Codex, gate avant la suite)*

- ✅ Audit complet par Codex (`docs/audit-codex-initial.md`) : résumé initial annonçant « 0 bloquant » (une incohérence interne avait été relevée : `HelloWorld.vue` y était qualifié de bloquant dans le détail du rapport), 24 à corriger, 25 mineurs. → **Correction (confirmée par la revue ciblée de Codex, section « Revue de l'Épique 1bis » du rapport) : le comptage réel est 1 bloquant, 24 à corriger, 25 mineurs.** Ce point bloquant unique concernait `HelloWorld.vue`, supprimé depuis lors dans l'Épique 1bis — donc **déjà résolu, aucune action requise**. La mention de l'ancien « 0 bloquant » est conservée ici à titre d'historique.
- ✅ Revue mentors et triage fait — voir Épique 1bis ci-dessous pour les corrections retenues, reste réparti dans les épiques concernées

## Épique 1bis — Corrections prioritaires avant reprise *(Cline, mission groupée)*

- ✅ **Filtre de catégories cassé** : `CategoryGrid.vue` renvoie vers `/produits` sans transmettre la catégorie choisie ; `ProductList.vue` initialise toujours `activeCategory` à `all`. Définir un état de filtre partagé (ex. query string) et relier les deux composants. → Corrigé — filtre porté par la query string `?categorie=<slug>` (détail en note de session).
- ✅ **Nettoyage des résidus du template Vite par défaut** : `src/components/HelloWorld.vue`, `src/assets/vite.svg`, `src/assets/vue.svg`, `src/assets/hero.png`, `public/icons.svg`, `public/favicon1.svg` — confirmés non référencés par l'application active, à supprimer. → Les 6 fichiers supprimés après vérification finale (aucune référence survivante).
- ✅ **Ajout de `rel="noopener noreferrer"`** sur tous les liens `target="_blank"` du projet (header, footer, hero, contact, cartes produit, détail produit, panier). → 12 liens actifs traités (grep exhaustif `src/`) ; les 6 liens de `HelloWorld.vue` ont disparu avec la suppression du fichier.

## Décisions actées par les mentors *(ne pas rouvrir sans validation)*

- **Panier non vidé après envoi WhatsApp** : comportement actuel conservé tel quel. Si le client annule ou modifie sa commande dans la conversation WhatsApp, le panier reste disponible. Le bouton "Vider le panier" existant couvre le cas où l'utilisateur veut repartir à zéro.
- **Pas de metas Open Graph dynamiques par produit** : WhatsApp ne lit pas le JavaScript, donc un lien de produit partagé affichera toujours l'aperçu de la Home quoi qu'il arrive. Le gain (SEO Google uniquement) est jugé marginal pour ce type de site. Non traité pour l'instant.

## Épique 2 — Charte graphique du cas de démonstration

- 🔄 Appliquer la nouvelle palette « Encre & or » — **appliquée, en attente de validation visuelle par les mentors** (Dimas, en local). Valeurs actives dans `src/style.css` : `--color-cream: #FAFAF8`, `--color-ink: #1F2430`, `--color-brand: #1F2430`, `--color-brand-dark: #141A26`, `--color-accent: #C9A227`, `--color-sage: #E8E6DE`. Noms de tokens inchangés, aucun fichier `.vue` touché (point C4). `theme-color` de `index.html` synchronisé sur `#FAFAF8`.
- 🔲 Valider la typographie finale
- 🔲 Vérifier les contrastes et l'accessibilité une fois la palette figée

## Épique 3 — Contenu du cas de démonstration (commerce générique, sans thème)

- 🔲 Identité de marque neutre (nom, slogan, sous-titre) dans `settings.json` — remplacer le numéro WhatsApp factice `22990000000`
- 🔲 Catalogue démo (produits + catégories) représentatif mais générique
- 🔲 Témoignages démo
- 🔲 Visuels démo dans `public/images/` (produits, catégories, image Open Graph `og-image.jpg`) — **placeholders temporaires en place** (voir note ci-dessous) ; les vraies photos restent à fournir
- 🔲 **Définir et documenter un schéma de données catalogue** (champs obligatoires : `id`, `slug`, `price`, `category`, `images` non vide) — remonté par l'audit Codex, à faire en même temps que le remplissage du vrai contenu
- 🔲 **Renforcer la robustesse du store panier** (`stores/cart.js`) : valider/normaliser les entrées lues depuis `localStorage` (type, doublons, quantités négatives/non numériques, références produits périmées) — remonté par l'audit Codex

> **Note — placeholders visuels temporaires (étape intermédiaire, pas le contenu final).** Des images de substitution ont été générées pour prévisualiser la mise en page : 4 visuels produits (800×800, format carré des cartes/fiches), 2 visuels catégories (800×600, ratio 4:3 de `CategoryGrid.vue`) et une image Open Graph 1200×630, tous en **JPEG raster** nommés `placeholder-<slug>.jpg` sous `public/images/`, plus `public/og-image.jpg`. Le fond et le texte reprennent les tokens réels de la palette (`--color-sage`, `--color-surface`, `--color-ink`, `--color-accent`). Les chemins ont été mis à jour dans `src/data/products.json` (champ `images`) et `src/data/categories.json` (champ `image`).
> **Ce n'est PAS le contenu final de l'Épique 3** : les visuels définitifs (vraies photos produits, vraie image de marque pour le partage) et le vrai catalogue restent entièrement à faire. Les fichiers `placeholder-*.jpg` sont destinés à être remplacés (ou supprimés) à ce moment-là. Aucun fichier `.vue` n'a été modifié (les images sont exprimées en `object-cover`, donc le ratio d'affichage est inchangé).

## Épique 4 — Déploiement

- 🔲 Choisir la plateforme (Netlify ou Vercel) pour la démo
- 🔲 Configurer la redirection SPA (`_redirects` ou `vercel.json` selon la plateforme)
- 🔲 Déployer et vérifier en production : navigation directe sur une URL profonde sans 404
- 🔲 Mettre à jour `og:image` avec une URL absolue une fois le domaine connu

## Épique 5 — Qualité, accessibilité, performance

- 🔲 Dérouler la checklist de test manuel complète (cahier des charges section 7, niveau 3) — pas encore faite, l'audit Codex était uniquement statique
- 🔲 Vérifier `alt` sur toutes les images, `aria-label` sur tous les boutons icône
- 🔲 **Accessibilité du panier (`CartDrawer.vue`)** : confinement et restauration du focus, fermeture au clavier (Tab), nettoyage explicite du style de scroll au démontage — remonté par l'audit Codex
- 🔲 **Accessibilité du menu mobile (`AppHeader.vue`)** : ajouter `aria-expanded` et une relation explicite bouton/menu sur le burger — remonté par l'audit Codex
- 🔲 Vérifier le temps de chargement et le poids des images

## Épique 6 — Guide de duplication pour un futur client

- 🔲 Rédiger un guide pas-à-pas de duplication
- 🔲 Lister les pièges connus

## Tâches mineures (à glisser n'importe quand)

- 🔲 Ajouter une route 404 / page "introuvable" (actuellement aucun repli pour une URL inconnue)
- 🔲 Renommer `TestimonialSlider.vue` (affiche une grille statique, pas un carrousel) — ou construire un vrai slider si souhaité, à valider avec les mentors
- 🔲 Centraliser la construction des liens de contact WhatsApp (actuellement dupliquée dans plusieurs composants : header, footer, hero, contact, section contact) dans `useWhatsApp.js`
- 🔲 Synchroniser la valeur `theme-color` de `index.html` avec le token `--color-cream` de `style.css` (actuellement deux valeurs identiques mais indépendantes)
- 🔲 Prévoir un état vide pour `FeaturedProducts.vue` si aucun produit n'est marqué vedette

---

## Notes de session

*(Zone libre — chaque agent ajoute une courte note après sa session.)*

- 2026-10-01 — Documents de pilotage rédigés avec les mentors. Dépôt pas encore créé.
- 2026-10-02 — Cline a initialisé et poussé le dépôt (commits `ed8a99e`, `481fd0a`), `npm run build` validé. Codex a produit l'audit initial. Mentors ont fait le triage : 3 corrections groupées avant reprise (voir Épique 1bis), deux décisions actées (panier non vidé, pas de metas OG dynamiques), reste réparti dans les épiques 3 et 5. Prochaine étape : Cline traite l'Épique 1bis.
- 2026-10-02 — Cline a traité l'Épique 1bis (3 commits dédiés + 1 commit docs). **Filtre de catégories** : le filtre est désormais porté par la query string `/produits?categorie=<slug>`, source de vérité unique dans `ProductList.vue` (`activeCategory` calculé depuis `route.query.categorie`, avec repli sur `all` pour toute valeur absente ou inconnue) ; `CategoryGrid.vue` construit le lien avec le slug cliqué, et `setCategory()` synchronise l'URL via `router.replace` quand l'utilisateur change de filtre sur place. Conséquence : le filtre est partageable et rejouable au `F5`. Précision (revue Codex) : `setCategory()` utilisant `router.replace`, chaque changement de filtre remplace l'entrée d'historique courante — le bouton « précédent » revient donc à la page d'avant `/produits`, pas au filtre précédent. **Résidus Vite** : les 6 fichiers listés supprimés (vérification grep finale : ils n'étaient référencés que par `HelloWorld.vue`). **`rel="noopener noreferrer"`** : 12 liens `target="_blank"` du parcours actif traités (grep `src/` exhaustif, pas seulement la liste de l'audit). `npm run build` : exit code 0, `✓ built in 645ms`, CSS 20.42 kB (contre 22.09 kB avant nettoyage). Tests manuels restants (non couverts ici, pas de navigateur) : clic catégorie → liste filtrée, absence d'erreur console — à dérouler à l'Épique 5.
- 2026-10-02 — Cline a appliqué la palette « Encre & or » (Épique 2, personnalisation pure — point C4) : valeurs des 6 tokens `@theme` de `src/style.css` remplacées, **noms inchangés**, aucun fichier `.vue` touché, typographie (`--font-serif`/`--font-sans`) intacte. `theme-color` de `index.html` synchronisé sur `#FAFAF8`. Vérifications : `npm run dev` démarre sans erreur (Vite v8.2.1, `ready in 4947 ms`, stderr vide, HTTP 200 sur `/`, nouveau token `#FAFAF8` et `#C9A227` bien présents dans le CSS servi, ancienne valeur `#FBF7F2` disparue) ; `npm run build` exit code 0. Grep des couleurs codées en dur sur `src/components/` et `src/pages/` : **aucune valeur hex/rgb/hsl** trouvée ; seuls subsistent les utilitaires Tailwind natifs `text-white`/`bg-white` (voir recommandation ci-dessous). Codex a validé l'Épique 1bis en revue statique (voir `docs/audit-codex-initial.md`, section « Revue de l'Épique 1bis »).
- **Recommandation (non corrigée — hors périmètre) :** les composants utilisent `text-white` et `bg-white` (Tailwind natif, `#fff`) au lieu de tokens de la palette. Avec `--color-cream: #FAFAF8`, les surfaces `bg-white` se distinguent très légèrement du fond crème. Si les mentors souhaitent une palette 100 % tokenisée, prévoir une tâche de nettoyage dédiée (ajouter par ex. un token `--color-surface` et remplacer les utilitaires concernés : `ProductCard.vue:2`, `TestimonialSlider.vue:6`, `CartDrawer.vue:70`, `Contact.vue:11,22,27`, `ProductList.vue:62`). → **Appliquée le 2026-10-02** (voir dernière note de session : token `--color-surface: #FFFFFF` ajouté et 7 `bg-white` remplacés par `bg-surface`).
- 2026-10-02 — Cline a traité les deux corrections mineures groupées. **(1) Token de surface** : ajout de `--color-surface: #FFFFFF` au bloc `@theme` de `src/style.css` et remplacement de **tous** les `bg-white` du projet (7 occurrences, grep exhaustif) par `bg-surface` — `ProductCard.vue:2`, `TestimonialSlider.vue:6`, `CartDrawer.vue:70`, `Contact.vue:11,22,27`, `ProductList.vue:62`. Aucune occurrence de `bg-white` ne subsiste dans `src/`. Les `text-white` (11 occurrences) ont été vérifiés au cas par cas : tous s'appliquent à du texte sur fond sombre (`bg-brand`, `bg-ink/40`) — usage légitime, aucun remplacement effectué. Vérification d'équivalence dans le CSS généré : `.bg-surface{background-color:var(--color-surface)}` avec `--color-surface:#fff`, contre `.bg-white{background-color:var(--color-white)}` avec `--color-white:#fff` — **même valeur effective, aucun changement visuel**. `npm run build` exit code 0, CSS 20.49 kB. **(2) Comptage de l'audit** : ligne de l'Épique 1 corrigée avec le comptage réel (1 bloquant, 24 à corriger, 25 mineurs), mention historique de l'ancien « 0 bloquant » conservée, et précision que le bloquant unique (`HelloWorld.vue`) est déjà résolu par l'Épique 1bis.
- 2026-10-02 — Cline a généré des **placeholders visuels temporaires** (étape intermédiaire, périmètre personnalisation C2/C7 — **ne clôt pas l'Épique 3**). Outil : Pillow (Python), installé localement pour l'occasion ; aucun outil de génération n'a été ajouté au dépôt (script jetable hors dépôt). Les couleurs ont été **lues directement** dans `src/style.css` (`--color-sage`, `--color-surface`, `--color-ink`, `--color-accent`), donc aucune valeur codée en dur. Livrables : `public/images/placeholder-produit-un|deux|trois|quatre.jpg` (800×800), `public/images/placeholder-categorie-1|2.jpg` (800×600, 4:3), `public/og-image.jpg` (1200×630) — tous en **JPEG raster**, formats conformes aux ratios attendus (`aspect-square`, `aspect-[4/3]`, OG 1.91:1). `src/data/products.json` (champ `images`) et `src/data/categories.json` (champ `image`) mis à jour vers les nouveaux chemins. Vérifications : `npm run build` exit code 0 (images bien copiées dans `dist/images/` et `dist/og-image.jpg`) ; sous `npm run dev`, les 7 nouvelles URL répondent **200 `image/jpeg`** avec des tailles identiques aux fichiers sur disque, stderr vide. **Puisqu'un raster JPEG a été produit, `index.html` reste inchangé** (`og:image` pointe toujours sur `/og-image.jpg`, désormais existant) — aucune action requise côté mentors sur ce point. À noter : sous Vite, une URL d'asset inexistante renvoie `200 text/html` (fallback SPA) et non 404 ; la vérification 404 a donc été faite par comparaison de `Content-Type`/taille avec un chemin volontairement inexistant.
