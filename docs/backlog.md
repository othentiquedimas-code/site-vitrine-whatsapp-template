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

- ✅ Audit complet par Codex (`docs/audit-codex-initial.md`) : 0 bloquant annoncé (avec une incohérence interne à signaler à Codex : `HelloWorld.vue` qualifié de bloquant dans le détail du rapport), 24 à corriger, 25 mineurs
- ✅ Revue mentors et triage fait — voir Épique 1bis ci-dessous pour les corrections retenues, reste réparti dans les épiques concernées

## Épique 1bis — Corrections prioritaires avant reprise *(Cline, mission groupée)*

- ✅ **Filtre de catégories cassé** : `CategoryGrid.vue` renvoie vers `/produits` sans transmettre la catégorie choisie ; `ProductList.vue` initialise toujours `activeCategory` à `all`. Définir un état de filtre partagé (ex. query string) et relier les deux composants. → Corrigé — filtre porté par la query string `?categorie=<slug>` (détail en note de session).
- ✅ **Nettoyage des résidus du template Vite par défaut** : `src/components/HelloWorld.vue`, `src/assets/vite.svg`, `src/assets/vue.svg`, `src/assets/hero.png`, `public/icons.svg`, `public/favicon1.svg` — confirmés non référencés par l'application active, à supprimer. → Les 6 fichiers supprimés après vérification finale (aucune référence survivante).
- ✅ **Ajout de `rel="noopener noreferrer"`** sur tous les liens `target="_blank"` du projet (header, footer, hero, contact, cartes produit, détail produit, panier). → 12 liens actifs traités (grep exhaustif `src/`) ; les 6 liens de `HelloWorld.vue` ont disparu avec la suppression du fichier.

## Décisions actées par les mentors *(ne pas rouvrir sans validation)*

- **Panier non vidé après envoi WhatsApp** : comportement actuel conservé tel quel. Si le client annule ou modifie sa commande dans la conversation WhatsApp, le panier reste disponible. Le bouton "Vider le panier" existant couvre le cas où l'utilisateur veut repartir à zéro.
- **Pas de metas Open Graph dynamiques par produit** : WhatsApp ne lit pas le JavaScript, donc un lien de produit partagé affichera toujours l'aperçu de la Home quoi qu'il arrive. Le gain (SEO Google uniquement) est jugé marginal pour ce type de site. Non traité pour l'instant.

## Épique 2 — Charte graphique du cas de démonstration

- 🔲 Choisir et valider la palette finale (processus en 5 étapes, cahier des charges section 3)
- 🔲 Valider la typographie finale
- 🔲 Vérifier les contrastes et l'accessibilité une fois la palette figée

## Épique 3 — Contenu du cas de démonstration (commerce générique, sans thème)

- 🔲 Identité de marque neutre (nom, slogan, sous-titre) dans `settings.json` — remplacer le numéro WhatsApp factice `22990000000`
- 🔲 Catalogue démo (produits + catégories) représentatif mais générique
- 🔲 Témoignages démo
- 🔲 Visuels démo dans `public/images/` (produits, catégories, image Open Graph `og-image.jpg`)
- 🔲 **Définir et documenter un schéma de données catalogue** (champs obligatoires : `id`, `slug`, `price`, `category`, `images` non vide) — remonté par l'audit Codex, à faire en même temps que le remplissage du vrai contenu
- 🔲 **Renforcer la robustesse du store panier** (`stores/cart.js`) : valider/normaliser les entrées lues depuis `localStorage` (type, doublons, quantités négatives/non numériques, références produits périmées) — remonté par l'audit Codex

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
- 2026-10-02 — Cline a traité l'Épique 1bis (3 commits dédiés + 1 commit docs). **Filtre de catégories** : le filtre est désormais porté par la query string `/produits?categorie=<slug>`, source de vérité unique dans `ProductList.vue` (`activeCategory` calculé depuis `route.query.categorie`, avec repli sur `all` pour toute valeur absente ou inconnue) ; `CategoryGrid.vue` construit le lien avec le slug cliqué, et `setCategory()` synchronise l'URL via `router.replace` quand l'utilisateur change de filtre sur place. Conséquence : le filtre est partageable, rejouable au `F5` et compatible boutons précédent/suivant. **Résidus Vite** : les 6 fichiers listés supprimés (vérification grep finale : ils n'étaient référencés que par `HelloWorld.vue`). **`rel="noopener noreferrer"`** : 12 liens `target="_blank"` du parcours actif traités (grep `src/` exhaustif, pas seulement la liste de l'audit). `npm run build` : exit code 0, `✓ built in 645ms`, CSS 20.42 kB (contre 22.09 kB avant nettoyage). Tests manuels restants (non couverts ici, pas de navigateur) : clic catégorie → liste filtrée, absence d'erreur console — à dérouler à l'Épique 5.
