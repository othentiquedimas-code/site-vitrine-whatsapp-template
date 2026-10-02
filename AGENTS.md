# AGENTS.md — Guide d'amorçage

Ce fichier est le point d'entrée pour tout agent IA travaillant sur ce dépôt — implémentation ou revue. Il doit être lu **intégralement avant toute action**, même si tu reprends une tâche déjà commencée par un autre agent.

---

## 0. Qui fait quoi

| Rôle | Agent(s) | Responsabilité |
|---|---|---|
| Implémentation principale | **Cline** | Écrit le code |
| Implémentation de remplacement | **Antigravity**, **Claude Code** | Mêmes droits et devoirs que Cline, pris en relai quand les tokens de Cline sont épuisés — aucune différence de traitement |
| Revue de code | **Codex** | Relit le travail de l'agent d'implémentation, vérifie la conformité, documente ses recommandations |
| Mentors / décideurs | **Dimas** et **Claude (chat)** | Valident les décisions structurantes, tranchent les cas limites, sont les gates manuels finaux |

Si tu es un agent d'implémentation et que tu prends le relai d'un autre agent en cours de tâche : ne reprends pas de zéro. Lis d'abord l'état actuel du code et le backlog pour savoir exactement où t'arrêter.

---

## 1. Documents à lire, dans cet ordre

1. **`docs/cahier-des-charges.md`** — vision, primitives non négociables (section 2, **zéro tolérance**), points de personnalisation (section 3), critères d'acceptation (section 7), hors périmètre (section 8).
2. **`docs/architecture.md`** — structure de dossiers, conventions de nommage, règles d'ajout de code.
3. **`docs/backlog.md`** — ce qui reste à faire, découpé en tâches.
4. **`QUESTIONS-POUR-MENTORS.md`** (racine du dépôt) — vérifier s'il y a des questions en attente qui bloquent ta tâche. Ne pas avancer sur une tâche bloquée par une question non répondue.

---

## 2. Règles d'or (non négociables)

- **Ne jamais enfreindre une primitive** du cahier des charges (section 2) : pas de paiement en ligne, pas de backend, pas de back-office client, pas de compte visiteur, stack figée (Vue 3 + Vite + Tailwind v4 + Pinia), panier 100 % local, français par défaut, hébergement Netlify/Vercel uniquement.
- **Respecter la frontière personnalisation / logique** (section 3 du cahier des charges). Si une demande implique de modifier un fichier `.vue` de `components/` ou `pages/` pour ce qui semblait être une simple personnalisation client, **arrête-toi**.
- **Si une tâche sort du périmètre défini ou crée une ambiguïté** (nouvelle fonctionnalité non prévue, demande contradictoire avec une primitive, choix de design non tranché) : **ne code pas de supposition**. Ajoute une entrée datée dans `QUESTIONS-POUR-MENTORS.md` à la racine, avec le contexte, la question précise, et si possible les options envisagées. Attends la validation des mentors avant de continuer sur ce point précis (tu peux continuer sur d'autres tâches non bloquées en parallèle).
- **Les couleurs et la typo passent toujours par les tokens** de `src/style.css` (`@theme`). Jamais de valeur codée en dur dans un composant.
- **Le catalogue, les réglages et les témoignages vivent dans `src/data/*.json`**, jamais ailleurs.

---

## 3. Démarrage technique

```bash
npm install
npm run dev
```

Build de production (à vérifier avant de clore une tâche) :

```bash
npm run build
```

---

## 4. Avant de signaler une tâche comme terminée

Dérouler la checklist complète des 4 niveaux du cahier des charges (section 7) :
- [ ] Niveau 1 — conformité aux primitives
- [ ] Niveau 2 — frontière personnalisation/logique respectée (ou signalement fait si dépassement)
- [ ] Niveau 3 — checklist de test manuel entièrement déroulée
- [ ] Niveau 4 — qualité du code (laissé à l'appréciation de Codex en revue, mais l'agent d'implémentation doit s'auto-vérifier en premier)

Mettre à jour `docs/backlog.md` : marquer la tâche traitée, ajouter toute note utile pour la suite (ce qui a été fait, ce qui reste en suspens).

---

## 5. Pour l'agent de revue (Codex)

- Revue systématique des 4 niveaux de critères d'acceptation, pas seulement le niveau 4.
- **Première mission avant tout** : auditer l'intégralité du cœur déjà livré (pas seulement les changements récents) et produire des recommandations écrites — conformité aux primitives, qualité du code, dette technique. Cette revue initiale est un gate que les mentors valident avant que l'implémentation ne reprenne.
- Documenter les recommandations de façon actionnable (fichier/ligne concerné, problème, suggestion), pas en commentaires vagues.
- Ne jamais corriger le code toi-même en tant qu'agent de revue — signaler, pas implémenter (sépare les rôles).

---

## 6. Ce qui n'est jamais à l'initiative d'un agent

Voir `cahier-des-charges.md` section 8 (hors périmètre). En résumé : paiement en ligne, compte client, back-office, gestion de stock, suivi de commande, multi-langue automatique, chat autre que WhatsApp, analytics non demandé, tout backend custom. Si un de ces besoins semble légitime pour un client, c'est un sujet pour `QUESTIONS-POUR-MENTORS.md`, jamais une implémentation spontanée.
