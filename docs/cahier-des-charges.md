# Cahier des charges — Site Vitrine WhatsApp (Template)

**Dépôt prévu :** `site-vitrine-whatsapp-template` (compte GitHub `authentiquedimas-code`)
**Statut :** validé par les mentors (Dimas + Claude)

**Rôles de pilotage :**
- **Mentors / décideurs :** Dimas et Claude — toute décision structurante passe par eux (gates manuels)
- **Implémentation :** Cline (principal), Antigravity ou Claude Code (remplaçants en cas de tokens épuisés — mêmes droits et devoirs)
- **Revue de code :** Codex
- **Maquettes :** Google Stitch, à partir de prompts coécrits par les mentors

---

## 1. Vision & objectifs

**Vision.** Fournir un template de site vitrine, réutilisable d'un client à l'autre, qui permet à un petit commerce de présenter ses produits en ligne de façon élégante et professionnelle, sans les coûts, la complexité ni les contraintes réglementaires d'une boutique e-commerce classique (paiement en ligne, gestion des stocks en temps réel, compte client). La prise de commande se fait par un canal que le client final connaît déjà et utilise au quotidien : WhatsApp.

**Problème résolu.** Beaucoup de petits commerçants (mode, artisanat, beauté, alimentation...) veulent une présence en ligne crédible mais n'ont ni les moyens ni le besoin d'un vrai système e-commerce. Beaucoup gèrent déjà leurs ventes par messages WhatsApp. Ce template leur donne une vitrine professionnelle qui s'intègre à cette habitude plutôt que de la remplacer.

**Objectifs du template (pas du site final) :**
- Être **duplicable** rapidement pour un nouveau client, en modifiant uniquement un ensemble de points de personnalisation identifiés (section 3), jamais le code logique.
- Rester **sans backend** : toutes les données (produits, catégories, témoignages, réglages) vivent dans des fichiers JSON versionnés avec le code, éditées directement par le développeur (Dimas), pas par le client final.
- Garantir une **expérience mobile-first**, la majorité des visiteurs arrivant depuis un lien WhatsApp ou réseau social sur téléphone.
- Garder une **charte graphique premium et minimaliste** par défaut, facilement ajustable (tokens de couleur/typo centralisés) sans réécrire les composants.
- Permettre une **commande groupée** (panier) envoyée en un seul message WhatsApp structuré, en plus de la commande directe produit par produit.

**Ce que la vision exclut explicitement** (détaillé en section 8) : pas de paiement en ligne, pas de compte client, pas de gestion de stock automatisée, pas de back-office pour le client final — c'est Dimas qui édite le catalogue à chaque mission.

**Public cible (exemples, non limitatif) :** mode, artisanat, beauté, alimentation — tout petit commerce qui gère déjà ses ventes par messages.

---

## 2. Primitives non négociables

Ces règles s'appliquent à **toute** déclinaison du template, pour **tout** client. Un agent qui les enfreint produit un livrable non conforme, quel que soit par ailleurs la qualité du code.

- **P1 — Pas de paiement en ligne.** Aucune intégration de passerelle de paiement (Stripe, PayPal, Mobile Money API, etc.). La transaction se négocie et se conclut hors du site, via WhatsApp.
- **P2 — Commande via WhatsApp uniquement.** Toute action d'achat (produit seul ou panier) aboutit à un lien `wa.me` avec message pré-rempli. Pas de formulaire de commande qui enverrait les données ailleurs.
- **P3 — Sans backend, données en fichiers JSON versionnés.** Produits, catégories, témoignages et réglages vivent dans `src/data/*.json`, dans le dépôt Git. Pas de base de données, pas d'API serveur, pas de CMS headless.
- **P4 — Pas de back-office ni d'espace d'administration pour le client final.** Le client ne se connecte jamais pour modifier son propre contenu. C'est Dimas (ou l'agent, sous sa supervision) qui édite les JSON à chaque mise à jour de catalogue.
- **P5 — Pas de compte utilisateur côté visiteur.** Aucune inscription, connexion, ni profil pour les visiteurs du site. Navigation et commande anonymes.
- **P6 — Mobile-first.** Toute fonctionnalité est pensée et testée d'abord pour mobile, le desktop étant une amélioration progressive.
- **P7 — Stack figée : Vue 3 + Vite + Tailwind CSS v4 + Pinia.** Pas de changement de framework, de bundler, ou de librairie CSS d'un client à l'autre, sauf décision explicite des mentors. **Règle dure.**
- **P8 — Le panier reste local au navigateur.** Pas de synchronisation serveur. Stocké en `localStorage`, propre à chaque visiteur, sert uniquement à préparer le message WhatsApp groupé.
- **P9 — Français par défaut.** Le site est livré en français. Une traduction éventuelle pour un client spécifique est un point de **personnalisation** futur (section 3), jamais une internationalisation du code sans demande explicite.
- **P10 — Hébergement toujours Netlify ou Vercel.** Cohérent avec P3 : jamais de serveur applicatif classique (VPS, PHP/Node hébergé, etc.) à déployer ou maintenir.

---

## 3. Points de personnalisation

| # | Élément | Où ça vit | Ce que l'agent a le droit de changer |
|---|---|---|---|
| C1 | Identité de marque | `src/data/settings.json` | `brandName`, `slogan`, `subtitle`, `email`, `whatsapp`, `socials` |
| C2 | Catalogue | `src/data/products.json`, `src/data/categories.json` | Ajout/suppression/édition de produits et catégories, structure des champs inchangée |
| C3 | Témoignages | `src/data/testimonials.json` | Contenu uniquement, structure inchangée |
| C4 | Charte de couleurs | `src/style.css` (bloc `@theme`, tokens `--color-*`) | Valeurs hexadécimales des tokens uniquement — jamais de couleur codée en dur ailleurs |
| C5 | Typographie | `index.html` (import Google Fonts) + `src/style.css` (`--font-serif`, `--font-sans`) | Choix des polices, structure deux-polices (titres / corps) respectée |
| C6 | Logo / favicon | `public/favicon.svg` + éventuel logo image | Remplacement du fichier, pas de la logique d'affichage |
| C7 | Images produits/catégories | `public/images/` | Ajout des vrais visuels, chemins référencés dans les JSON |
| C8 | SEO par page | `src/router/index.js` (`meta.title` / `meta.description`) | Textes uniquement |

**Règle d'or :** si une personnalisation demandée par un client nécessite de modifier un fichier `.vue` dans `src/components/` ou `src/pages/` (donc la logique ou la structure), ce n'est **plus** une personnalisation — c'est une évolution fonctionnelle, à signaler aux mentors avant d'être codée (voir section 7).

**Note :** le panier (comportement d'ajout, quantités, message WhatsApp groupé) est une fonctionnalité du cœur, **non personnalisable** par client.

**Processus de choix palette & typographie (à suivre pour chaque nouveau client) :**
1. Identifier le secteur et la cible du client.
2. Générer 2 à 3 propositions de palette sous forme de tableau comparatif (fond, texte, couleur principale, accent, teinte douce) — jamais une seule proposition imposée d'office.
3. Appliquer la palette retenue uniquement via les tokens `@theme` de `src/style.css`, jamais en dur dans les composants.
4. Valider visuellement sur la Home réelle avant de figer la palette.
5. Même logique pour la typographie : un couple serif/sans-serif cohérent, jamais plus de 2 familles.

---

## 4. Périmètre fonctionnel

**Déjà livré (cœur fonctionnel existant) :**
- Structure Vue 3 + Vite + Tailwind v4 + Pinia, routeur avec alias `@`
- Layout : header sticky (menu desktop + burger mobile), footer
- Page d'accueil : hero, grille de catégories, produits vedettes, témoignages, section contact
- Page liste produits avec filtres par catégorie
- Page détail produit : galerie d'images, produits similaires, bouton commande directe
- Page contact : bloc WhatsApp, coordonnées, réseaux sociaux conditionnels
- Panier complet : ajout, quantités, suppression, persistance `localStorage`, panneau latéral, commande groupée en un seul message WhatsApp
- SEO de base : titres et meta descriptions par page, balises Open Graph, favicon

**Reste à construire :**
- Finalisation de la charte graphique (palette et typo encore en discussion sur le projet de démo)
- Remplissage des vrais contenus pour le cas de démonstration (textes, catalogue, images)
- Déploiement effectif sur Netlify ou Vercel, avec gestion des routes (redirection SPA)
- Documentation du template (ce cahier des charges + futurs documents d'architecture, backlog, README d'installation)
- Éventuels ajustements d'accessibilité et de performance (non testés formellement à ce stade)

**Exigence de revue sur l'existant.** Avant toute nouvelle tâche, l'agent de revue (Codex) doit auditer l'intégralité du cœur déjà livré — pas seulement les futurs changements — et produire des recommandations écrites : conformité aux primitives (section 2), qualité du code, dette technique, incohérences éventuelles. Cet audit sert de baseline, validée par les mentors avant que l'implémentation ne reprenne.

---

## 5. Utilisateurs & parcours

**Profils visiteurs :**
- **Visiteur découverte** — arrive via un lien partagé, ne connaît pas encore la marque.
- **Visiteur ciblé** — arrive directement via un lien WhatsApp ou une story pointant vers un produit précis.
- **Client récurrent** — connaît déjà la marque, revient pour les nouveautés ou une nouvelle commande.

**Parcours principal (achat simple) :** Home ou fiche produit directe → parcourt catégories/vedettes → ouvre une fiche produit → clique "Commander sur WhatsApp" → finalise en conversation directe.

**Parcours panier (achat multiple) :** liste produits, filtre par catégorie → ajoute plusieurs produits, ajuste quantités → ouvre le panier → vérifie le total → "Commander sur WhatsApp" → un seul message groupé.

**Parcours contact (avant achat, hésitation) :** page Contact ou bouton WhatsApp du header → question posée en direct avant de se décider.

**Contrainte transverse :** aucune étape ne nécessite jamais de création de compte, d'email de confirmation automatique, ou de paiement en ligne (cohérent avec P1/P2/P5).

**Note de cadrage — après-vente.** Le template ne prévoit aucun parcours après-vente sur le site (pas de suivi de commande, pas d'historique, pas d'espace client). Toute interaction après une commande se poursuit dans le fil WhatsApp déjà ouvert, hors du périmètre du site. Une demande d'"amélioration du suivi client" ne justifie jamais une fonctionnalité sur le site (violerait P2 et P5).

---

## 6. Contraintes techniques

- **Stack :** Vue 3 (Composition API, `<script setup>`), Vite, Tailwind CSS v4, Vue Router 4, Pinia (cf. P7)
- **Navigateurs cibles :** 2 dernières versions de Chrome, Safari, Firefox, Edge — desktop et mobile
- **Résolution de référence :** mobile-first dès 360px, paliers tablette et desktop
- **Performance :** site 100 % statique, chargement initial rapide, images optimisées (WebP si possible), pas de librairie lourde non justifiée
- **Accessibilité :** `alt` sur toutes les images, `aria-label` sur les boutons icône, contrastes suffisants lors du choix de palette
- **Déploiement :** Netlify ou Vercel (P10), redirection SPA configurée (toutes les routes vers `index.html`)
- **Gestion de version :** Git/GitHub, dépôt `site-vitrine-whatsapp-template` sous `authentiquedimas-code`

---

## 7. Critères d'acceptation

Une tâche n'est "terminée" que si elle satisfait les 4 niveaux ci-dessous, dans l'ordre.

**Niveau 1 — Conformité aux primitives (section 2)**
- [ ] Aucune intégration de paiement en ligne ajoutée
- [ ] Toute action d'achat aboutit à un lien `wa.me` avec message pré-rempli, rien d'autre
- [ ] Aucune nouvelle dépendance backend, base de données ou API serveur introduite
- [ ] Aucun espace d'administration ou de connexion ajouté pour le client final
- [ ] Aucun système de compte/connexion visiteur ajouté
- [ ] La stack déclarée (Vue 3 / Vite / Tailwind v4 / Pinia) n'a pas changé
- [ ] Les textes par défaut restent en français
- [ ] Le panier reste 100 % côté client (`localStorage`), sans appel serveur

**Niveau 2 — Respect de la frontière personnalisation / logique (section 3)**
- [ ] Si la tâche est une "personnalisation client", seuls les fichiers listés en section 3 ont été modifiés
- [ ] Si un fichier `.vue` a dû être modifié pour une demande de personnalisation, cela a été signalé comme évolution fonctionnelle et remonté aux mentors avant d'être codé — via une entrée datée dans `QUESTIONS-POUR-MENTORS.md` à la racine du dépôt

**Niveau 3 — Qualité fonctionnelle (test manuel)**
- [ ] Navigation complète : Accueil → Produits → filtre catégorie → fiche produit → retour
- [ ] Ajout au panier depuis une carte ET depuis une fiche produit
- [ ] Modification de quantité, suppression d'une ligne, vidage du panier
- [ ] Le message WhatsApp généré (produit seul et panier groupé) contient les bonnes informations, bien formatées
- [ ] Persistance du panier après rafraîchissement de la page (`F5`)
- [ ] Menu burger mobile : ouverture, fermeture, navigation, fermeture automatique après clic
- [ ] Testé sur au moins une résolution mobile (< 400px) et une résolution desktop
- [ ] Aucune erreur dans la console navigateur (`F12`)
- [ ] Le site démarre sans erreur avec `npm run dev` et se build sans erreur avec `npm run build`

**Niveau 4 — Qualité du code (revue Codex)**
- [ ] Pas de duplication évitable entre composants similaires
- [ ] Nommage cohérent avec l'existant (conventions détaillées dans le futur document d'architecture)
- [ ] Pas de valeur codée en dur qui aurait dû être un token ou une donnée JSON (couleurs, textes, numéro WhatsApp)
- [ ] Commentaires/clarté suffisants pour qu'un autre agent reprenne le fichier sans contexte supplémentaire

**Note sur les tests.** Pas de tests automatisés (unitaires/e2e) à ce stade — checklist de test manuel reproductible privilégiée, vu la taille du projet.

**Note sur les échecs niveau 1.** En cas d'échec d'un critère du niveau 1, la procédure de rollback (annulation via Git) est décidée au cas par cas avec les mentors, pas de procédure automatique figée.

---

## 8. Hors périmètre

Ces éléments ne font et ne feront jamais partie du template, sauf décision explicite et documentée des mentors qui amenderait ce cahier des charges. Un agent ne doit jamais les proposer ni les implémenter de sa propre initiative :

- Paiement en ligne, quel que soit le moyen (carte, Mobile Money, virement intégré)
- Compte client / connexion visiteur / espace personnel
- Back-office ou interface d'administration pour le client final
- Gestion de stock en temps réel ou alertes de rupture
- Suivi de commande, historique d'achats, notifications post-achat
- Multi-langue automatique (français par défaut ; traduction possible seulement sur demande explicite, traitée comme un projet à part)
- Chat en ligne autre que WhatsApp (pas de chatbot, pas de live chat intégré)
- Analytics ou tracking avancé non demandé explicitement par le mentor humain
- Backend applicatif, base de données, ou toute API serveur custom

---

## Changelog

Toute modification de ce cahier des charges doit être actée par les deux mentors (Dimas et Claude) et consignée ci-dessous, datée, avant de faire foi pour les agents.

| Date | Modification | Décidé par |
|---|---|---|
| 2026-10-01 | Création et validation initiale des 8 sections | Dimas + Claude |
