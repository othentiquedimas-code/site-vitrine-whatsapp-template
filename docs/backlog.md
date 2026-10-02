# Backlog — Site Vitrine WhatsApp (Template)

Légende : 🔲 À faire · 🔄 En cours · ✅ Fait

Chaque tâche est pensée pour être traitable dans une seule session d'agent. Un agent qui reprend une tâche 🔄 doit d'abord lire les notes laissées par l'agent précédent avant de continuer.

---

## Épique 0 — Documentation de pilotage *(mentors)*

- ✅ Cahier des charges (8 sections)
- ✅ Document d'architecture & conventions
- ✅ Fichier d'amorçage agents (`AGENTS.md`)
- ✅ Backlog (ce document)
- 🔲 Création du dépôt GitHub `site-vitrine-whatsapp-template` sous `authentiquedimas-code`, dépôt vide initial créé par Dimas, puis initialisé par le premier agent d'implémentation (structure, `.gitignore`, premier commit incluant le code existant + ces 3 documents dans `docs/`)
- 🔲 Création de `QUESTIONS-POUR-MENTORS.md` vide (racine du dépôt), prêt à être rempli par les agents

## Épique 1 — Audit du cœur existant *(Codex, gate avant la suite)*

- 🔲 Auditer l'ensemble du code déjà livré (voir "Déjà livré" dans le cahier des charges section 4) contre les primitives (section 2)
- 🔲 Produire des recommandations écrites : conformité, qualité, dette technique, incohérences
- 🔲 Validation des mentors sur ces recommandations avant que l'implémentation ne reprenne

## Épique 2 — Charte graphique du cas de démonstration

- 🔲 Choisir et valider la palette finale (processus en 5 étapes, cahier des charges section 3) — remplace les essais précédents ("Crème & sauge" rejetée, piste "pastel audacieux" explorée sans conclusion)
- 🔲 Valider la typographie finale (actuellement Fraunces/Inter, à reconfirmer ou changer selon la palette retenue)
- 🔲 Vérifier les contrastes et l'accessibilité une fois la palette figée

## Épique 3 — Contenu du cas de démonstration (commerce générique, sans thème)

- 🔲 Identité de marque neutre (nom, slogan, sous-titre) dans `settings.json`
- 🔲 Catalogue démo (produits + catégories) représentatif mais générique
- 🔲 Témoignages démo
- 🔲 Visuels démo dans `public/images/` (produits, catégories, image Open Graph)
- 🔲 Numéro WhatsApp et email de démonstration (factices mais au bon format)

## Épique 4 — Déploiement

- 🔲 Choisir la plateforme (Netlify ou Vercel) pour la démo
- 🔲 Configurer la redirection SPA (`_redirects` ou `vercel.json` selon la plateforme — voir architecture.md section 8)
- 🔲 Déployer et vérifier en production : navigation directe sur une URL profonde (ex. `/produits/...`) sans 404
- 🔲 Mettre à jour `og:image` avec une URL absolue une fois le domaine connu

## Épique 5 — Qualité, accessibilité, performance

- 🔲 Dérouler la checklist de test manuel (cahier des charges section 7, niveau 3) sur le site complet
- 🔲 Vérifier `alt` sur toutes les images, `aria-label` sur tous les boutons icône
- 🔲 Vérifier le temps de chargement et le poids des images (optimisation si besoin)

## Épique 6 — Guide de duplication pour un futur client

- 🔲 Rédiger un guide pas-à-pas : cloner le dépôt, renommer, modifier `settings.json`, remplacer le catalogue, choisir une nouvelle palette (processus section 3), redéployer
- 🔲 Lister les pièges connus (ex. cache favicon navigateur, redirection SPA à reconfigurer si changement de plateforme)

---

## Notes de session

*(Zone libre — chaque agent ajoute une courte note après sa session : ce qui a été fait, ce qui reste en suspens, tout contexte utile pour le prochain agent ou pour les mentors.)*

- 2026-10-01 — Documents de pilotage (cahier des charges, architecture, AGENTS.md, backlog) rédigés avec les mentors. Dépôt GitHub pas encore créé. Prochaine étape : création du dépôt par Dimas, puis Épique 1 (audit Codex) avant toute reprise de code.
