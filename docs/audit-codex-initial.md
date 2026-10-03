# Audit initial du cœur — Codex

Date : 2026-10-02  
Périmètre : `src/`, `index.html`, `vite.config.js`, avec vérification de la structure et des assets du dépôt. Revue statique uniquement : aucun navigateur ni build/test exécuté. Les sévérités décrivent l’urgence recommandée : **bloquant** = gate à traiter avant reprise, **à corriger** = défaut ou risque concret, **mineur** = dette/amélioration.

## Niveau 1 — Conformité aux primitives

### Résultat par primitive

| Primitive | Constat à la lecture | Résultat |
|---|---|---|
| P1 — Aucun paiement en ligne | Aucune intégration ni référence de paiement trouvée dans le périmètre audité. | Conforme |
| P2 — Commande via WhatsApp | Les commandes directes et le panier produisent des URL `https://wa.me/` avec texte prérempli; les autres liens d’achat visibles ouvrent WhatsApp. | Conforme |
| P3 — Sans backend, données en JSON | Les produits, catégories, témoignages et réglages sont dans `src/data/*.json`; aucun appel API serveur n’est présent. | Conforme |
| P4 — Aucun back-office | Aucun espace d’administration n’est présent. | Conforme |
| P5 — Pas de compte visiteur | Aucune inscription, connexion ou profil. | Conforme |
| P6 — Mobile-first | Les vues utilisent des grilles adaptatives et un menu mobile. Cependant, l’accessibilité et l’usage au clavier du menu et du panier demandent une vérification/correction (voir niveaux 3 et 4). | Conforme avec réserve fonctionnelle |
| P7 — Vue 3, Vite, Tailwind v4, Pinia | Confirmé par les imports et `vite.config.js:1-13`; les plugins Vue et Tailwind sont configurés. | Conforme |
| P8 — Panier local | `src/stores/cart.js:7-14,65-76` lit/écrit `localStorage`, sans synchronisation serveur. Les entrées restaurées ne sont pas validées (voir niveau 3). | Conforme avec risque de robustesse |
| P9 — Français par défaut | Le document HTML porte `lang="fr"`; les textes d’interface examinés sont français, hormis le composant Vite inutilisé identifié plus bas. | Conforme dans l’application active |
| P10 — Netlify ou Vercel | Aucun hébergement alternatif ou configuration de serveur n’est déclaré. Le déploiement n’est pas encore configuré (backlog, épique 4), ce qui n’est pas une violation à ce stade. | Conforme / non déployé |

**Aucune violation certaine des primitives P1–P10 n’a été trouvée dans le parcours actif.** Le contenu catalogue reste factice, ce qui relève de l’épique 3; certains visuels absents rendent toutefois les cartes et fiches incomplètes.

### Points relevés

- **`src/components/HelloWorld.vue:1-95` — bloquant.** Composant Vite de démonstration, non référencé par l’application (`src/App.vue:1-16` ne monte que les composants du site). Il expose des textes anglais et des liens de démonstration Vite/Vue. Recommandation : le retirer dans une tâche de nettoyage distincte après validation, ou le remplacer s’il doit devenir une vraie fonctionnalité. Ne pas le traiter comme une personnalisation de contenu.
- **`src/components/home/CategoryGrid.vue:5-10` et `src/pages/ProductList.vue:40-45` — à corriger.** Cliquer sur une catégorie mène à `/produits`, mais l’état `activeCategory` de la page est initialisé à `all` et ne lit aucun paramètre de route; le clic ne filtre donc pas la liste sur la catégorie choisie. Recommandation : convenir d’un état de filtre partageable (par exemple query string), puis relier la grille et la page liste à ce même état.
- **`src/data/settings.json:5` — mineur (contenu démo).** Le numéro WhatsApp `22990000000` est manifestement un numéro de démonstration. Le code respecte P2 mais les liens ne représentent pas un vrai canal client. Recommandation : remplacer au moment de remplir les données de démo, avant publication.

## Niveau 2 — Frontière personnalisation / logique

- **`src/data/products.json:2-5`, `src/data/categories.json:2-4` — à corriger (préparation de la personnalisation).** Les chemins `/images/placeholder.jpg`, `/images/cat-1.jpg` et `/images/cat-2.jpg` sont définis dans les JSON, mais aucun dossier `public/images/` ni fichier image correspondant n’existe. Le dossier absent est prévu par l’architecture et l’épique 3 : ce n’est pas une anomalie structurelle à corriger maintenant, mais ces valeurs rendent le contenu actuel visuellement cassé. Recommandation : fournir les visuels dans la tâche de contenu de l’épique 3 et contrôler les chemins.
- **`src/style.css:8` et `index.html:7` — mineur.** La couleur de thème du navigateur est répétée en hexadécimal hors du bloc `@theme`. La section C4 exige que la palette soit centralisée dans les tokens; `theme-color` est une meta HTML personnalisable mais doit rester cohérente. Recommandation : documenter sa synchronisation avec `--color-cream`, ou définir une stratégie de token/meta adaptée sans recopier une valeur oubliable.
- **`src/components/home/*.vue`, `src/pages/*.vue`, `src/components/layout/*.vue` — mineur.** Le texte générique d’interface est placé directement dans les templates. La section C1 ne rend personnalisables que les champs explicitement énumérés dans `settings.json`; l’audit ne considère donc pas chaque libellé fonctionnel comme une violation. Mais si ces textes étaient censés varier par client, cela nécessiterait une décision de conception : aucune clé de traduction/contenu n’est prévue. Recommandation : garder le périmètre actuel explicite ou soumettre une question aux mentors avant toute demande de localisation.
- **`src/components/layout/AppHeader.vue:30-32,60-63`, `src/pages/Contact.vue:13-16,26-29`, `src/components/home/HeroSection.vue:11-14`, `src/components/home/ContactSection.vue:5-8`, `src/components/layout/AppFooter.vue:9` — mineur.** La construction du lien WhatsApp de contact est répétée, tandis que `useWhatsApp()` centralise uniquement les liens de commande. Les données restent bien en JSON, mais la logique de création d’URL est répartie. Recommandation : envisager une fonction partagée pour les URL de contact, afin d’éviter les divergences sans déplacer les données hors de `settings.json`.
- **`src/components/HelloWorld.vue:3-5,11-95` — à corriger.** Le composant de démonstration conserve des références aux logos Vue/Vite, au sprite public et à `hero.png`; il est hors de la structure métier de l’architecture et ne doit pas être confondu avec une section de page réutilisable. Recommandation : classer ces fichiers comme résidus de template (voir Niveau 4) et décider de leur sort dans une tâche validée séparément.

La frontière principale est respectée : données de catalogue/réglages/témoignages en JSON, palette et polices en tokens CSS, routes et metas dans le router, logique d’achat dans le store/composable/composants. Les metas Open Graph statiques ne sont pas actualisées lors des changements de route; si le SEO par page doit couvrir le partage social, les seuls `title`/`description` du router ne suffisent pas (voir Niveau 3).

## Niveau 3 — Qualité fonctionnelle (lecture statique, non testée dans un navigateur)

- **`src/data/products.json:2-5`, `src/data/categories.json:2-4`, `index.html:17` — à corriger.** Les visuels catalogue et l’image OG référencent des fichiers absents. Les balises `<img>` n’ont pas de visuel de repli. Recommandation : livrer les assets de l’épique 3, puis vérifier les réponses réseau et l’aperçu Open Graph.
- **`src/stores/cart.js:7-14,23-33,35-46` — à corriger.** `loadItems()` ne vérifie que le type tableau; un tableau malformé, des doublons, une quantité nulle/négative/non numérique ou des IDs périmés peuvent fausser compteur, prix et message. Les produits retirés du JSON disparaissent des lignes, mais leurs entrées restent dans `items` et sont persistées. Recommandation : valider/normaliser le schéma lu, fusionner ou rejeter les doublons et purger les références invalides avant calcul/persistance.
- **`src/stores/cart.js:9-10,69-70` — mineur.** Les accès `localStorage` sont protégés par `try/catch`, mais `localStorage` peut être indisponible ou lever dès sa résolution dans certains contextes navigateur. Recommandation : vérifier le comportement dans un contexte privé/stockage interdit et encapsuler l’accès de façon robuste.
- **`src/pages/ProductDetail.vue:18-29,80-86` — à corriger.** Le rendu suppose `product.images` défini et non vide. `activeImage` peut être `undefined`, ce qui donne un `src` invalide si le JSON est incomplet; les images miniatures utilisent l’index comme clé. Recommandation : établir un schéma catalogue (images obligatoires/non vides ou image de repli) et utiliser des clés stables.
- **`src/components/product/ProductCard.vue:3-4`, `src/components/layout/CartDrawer.vue:57` — mineur.** Les cartes et lignes panier lisent directement `images[0]` avec la même hypothèse de tableau non vide. Recommandation : partager la convention de repli ou valider les JSON au chargement.
- **`src/pages/ProductList.vue:8-20,40-45` et `src/components/home/CategoryGrid.vue:5-10` — à corriger.** Le filtre n’est pas reflété dans l’URL et les cartes catégorie ne sélectionnent pas la catégorie (cf. Niveau 1). Le rafraîchissement et les liens partagés ne préservent pas le filtre. Recommandation : gérer le filtre dans la route et vérifier navigation directe, historique précédent/suivant et liens de catégorie.
- **`src/router/index.js:34-44` et `src/utils/seo.js:3-15` — mineur.** Seuls `document.title` et `meta[name=description]` sont modifiés; `og:title` et `og:description` restent ceux de la page d’accueil, et l’image OG reste relative. Les partages d’une fiche peuvent ainsi afficher des métadonnées incohérentes. Recommandation : décider si les metas sociales sont dynamiques; si oui, les aligner sur la route et utiliser une URL absolue en production.
- **`src/router/index.js:6-27` — mineur.** Aucune route de repli/404 n’est déclarée. Une URL inconnue peut afficher une vue vide dans la coquille globale. Recommandation : ajouter une page « introuvable » et vérifier le parcours d’URL invalide, après accord si cela dépasse le périmètre convenu.
- **`src/components/layout/CartDrawer.vue:23-29,112-125` — à corriger.** Le panneau a `role=dialog` et `aria-modal`, mais pas de confinement/restauration du focus ni de fermeture sur navigation par Tab; le watcher de scroll ne nettoie pas explicitement le style lors du démontage. Recommandation : gérer le cycle complet d’un dialogue accessible et restaurer l’état de scroll antérieur.
- **`src/components/layout/AppHeader.vue:17-28,35-43,56-64` — à corriger.** Le burger n’expose pas son état (`aria-expanded`, relation au menu); son libellé « Menu » ne décrit pas l’action ouverte/fermée. Recommandation : ajouter les attributs d’état et tester clavier/lecteur d’écran ainsi que fermeture après navigation.
- **`src/components/layout/AppHeader.vue:30,60`, `src/pages/Contact.vue:13,26,37,39`, `src/components/layout/AppFooter.vue:9`, `src/components/home/HeroSection.vue:11`, `src/components/home/ContactSection.vue:5`, `src/components/product/ProductCard.vue:13`, `src/pages/ProductDetail.vue:43`, `src/components/layout/CartDrawer.vue:89` — mineur.** Les liens ouverts avec `target="_blank"` omettent `rel="noopener noreferrer"`. Recommandation : ajouter la protection sur tous ces liens externes.
- **`src/components/home/CategoryGrid.vue:7`, `src/components/product/ProductCard.vue:4`, `src/pages/ProductDetail.vue:16,28`, `src/components/layout/CartDrawer.vue:57` — mineur.** Les textes alternatifs sont présents, mais les miniatures répètent le nom produit sans indiquer qu’elles changent l’image active; les catégories ne filtrent pas réellement. Recommandation : vérifier l’alternative selon le rôle de chaque image et fournir un état accessible à la miniature sélectionnée.
- **`src/components/layout/CartDrawer.vue:89-97` — mineur.** Après le clic d’envoi WhatsApp, le panier demeure rempli; c’est cohérent avec une commande externalisée mais peut conduire à un renvoi involontaire. Aucune règle de vidage n’est définie. Recommandation : faire trancher ce comportement par les mentors avant de le modifier, car vider le panier pourrait être surprenant si l’utilisateur annule dans WhatsApp.
- **`src/components/home/FeaturedProducts.vue:16` — mineur.** Aucun état vide n’est prévu pour une liste sans produits vedettes; la section affiche alors une grille vide. Recommandation : prévoir un état vide ou masquer la section et vérifier le cas de catalogue minimal.

La checklist navigateur du niveau 3 (parcours complet, persistance, console, tailles d’écran, build) reste entièrement à exécuter par l’agent d’implémentation ou le validateur disposant d’un navigateur. Cet audit ne prétend pas la valider.

## Niveau 4 — Qualité du code

- **`src/components/HelloWorld.vue:1-95` — à corriger.** Résidu Vite identifié, non référencé par `App.vue`. Recommandation : supprimer/archiver seulement dans une tâche distincte autorisée; garder ce rapport comme preuve de non-utilisation.
- **`src/assets/vite.svg:1`, `src/assets/vue.svg:1` — mineur.** Logos du template Vite/Vue, importés uniquement par `HelloWorld.vue:3-5`; donc inutilisés dans le parcours de l’application. Recommandation : les signaler pour nettoyage validé, sans suppression dans le cadre de cette revue.
- **`src/assets/hero.png` — mineur.** Asset importé uniquement par `HelloWorld.vue:4`; le nom pourrait laisser penser qu’il s’agit du hero actif alors que `HeroSection.vue` n’affiche aucune image. Recommandation : confirmer son origine/usage puis le supprimer ou le renommer dans une tâche dédiée.
- **`public/icons.svg:1` — mineur.** Sprite d’icônes du template initial, utilisé uniquement par le composant `HelloWorld.vue:31-86`; l’application active ne l’importe pas. Résidu supplémentaire à la liste de Cline. Recommandation : signaler pour nettoyage ultérieur.
- **`public/favicon1.svg` — mineur.** Fichier présent mais aucune référence trouvée; `index.html:5` utilise `/favicon.svg`. Observation de Cline confirmée. Recommandation : conserver jusqu’à validation du nettoyage; vérifier si c’est une variante source voulue.
- **`index.html:17` — à corriger.** `/og-image.jpg` est référencé mais absent. Observation de Cline confirmée. Recommandation : fournir le visuel OG; l’architecture prévoit de le ranger sous `public/images/`, auquel cas mettre à jour l’URL correspondante.
- **`public/images/` — conforme au backlog, non anomalie.** Le répertoire attendu par `docs/architecture.md` n’existe pas encore; `docs/backlog.md`, épique 3, prévoit explicitement les visuels. Les références aux chemins absents restent un risque fonctionnel du Niveau 3, mais l’absence du répertoire à ce stade n’est pas un défaut d’architecture à remonter comme anomalie.
- **`src/components/HelloWorld.vue` — observation Cline confirmée.** Aucun import ou référence active depuis `App.vue`, pages ou routes. Son code est toujours présent et attire `src/assets/vite.svg`, `vue.svg`, `hero.png` et `public/icons.svg`; le qualifier de code mort pour le parcours actif est justifié.
- **`src/components/layout/AppHeader.vue:30-32,60-63`, `src/pages/Contact.vue:13-16,26-29`, `src/components/home/HeroSection.vue:11-14`, `src/components/home/ContactSection.vue:5-8`, `src/components/layout/AppFooter.vue:9` — mineur.** Les liens de contact WhatsApp sont dupliqués dans plusieurs composants. Recommandation : centraliser la construction de l’URL; garder le numéro comme donnée JSON.
- **`src/components/layout/CartDrawer.vue:3-22,104-125` — mineur.** Le composant concentre présentation, gestion clavier, verrouillage de scroll et affichage panier dans 126 lignes. Cela reste sous le seuil indicatif d’environ 150 lignes de template de l’architecture, mais les comportements sont peu isolés. Recommandation : ne découper que si la complexité augmente, en isolant d’abord la gestion accessible du dialogue.
- **`src/components/home/TestimonialSlider.vue:1-20` — mineur.** Nommé « Slider » alors qu’il rend une grille statique de trois colonnes sans navigation ni état de carrousel. Recommandation : renommer le composant selon son comportement réel ou réaliser le slider seulement si prévu par les mentors.
- **`src/components/home/CategoryGrid.vue:5-10` et `src/pages/ProductList.vue:8-20` — mineur.** La navigation de catégorie et l’état de filtre ne partagent aucune convention; c’est une source de défaut et un écart de clarté. Voir recommandation Niveau 3.
- **`index.html:7` et `src/style.css:8` — mineur.** Valeur hexadécimale de thème dupliquée hors du système des tokens; voir Niveau 2.
- **`src/data/products.json:2-5`, `src/data/categories.json:2-4` — mineur.** Catalogue de démonstration très générique et images de remplacement manquantes. Conforme au fait que le contenu est une tâche future, mais ne doit pas être pris pour un contenu final publiable.
- **`src/components/product/ProductCard.vue:25`, `src/pages/ProductDetail.vue:80`, `src/stores/cart.js:26` — mineur.** Le type de `product` est seulement `Object`; la forme JSON n’est pas validée ni décrite dans un schéma. Recommandation : documenter le schéma des données et valider les champs obligatoires (notamment `id`, `slug`, `price`, `category`, `images`).

### Cohérence avec `docs/architecture.md`

Les dossiers `src/data`, `components/{home,layout,product}`, `composables`, `stores`, `pages`, `router`, `utils`, ainsi que `App.vue`, `main.js`, `style.css`, `index.html` et `vite.config.js` correspondent à l’organisation décrite. `components/ui/` est absent, mais l’architecture le qualifie de répertoire réservé à peupler au besoin : ce n’est pas un écart. `public/favicon.svg` existe et est référencé; `public/images/` manque comme prévu par l’épique 3. Les seuls écarts structurels notables sont les résidus de démarrage (`HelloWorld.vue`, assets Vue/Vite, `public/icons.svg`, `favicon1.svg`). Aucun fichier de déploiement SPA n’est présent; c’est prévu par l’épique 4.

### Vérification des observations de Cline

1. `src/components/HelloWorld.vue` non référencé : **confirmé**; résidu Vite complet et code mort dans l’application active.
2. `src/assets/vite.svg`, `src/assets/vue.svg`, `public/favicon1.svg` inutilisés : **confirmé avec nuance**; les deux logos sont utilisés par le composant mort, mais aucun n’est référencé par le parcours actif. `favicon1.svg` n’a aucune référence; `index.html` utilise `favicon.svg`.
3. `index.html` référence `/og-image.jpg` absent : **confirmé** (`index.html:17`, aucun fichier dans l’inventaire `public/`).
4. `public/images/` absent : **confirmé et attendu**, explicitement prévu à l’épique 3; ce n’est pas une anomalie de structure à ce stade.

### Autres résidus Vite repérés

`public/icons.svg` contient le sprite d’icônes employé exclusivement par `HelloWorld.vue`; `src/assets/hero.png` est également importé uniquement par ce composant. Les liens et textes de démonstration en anglais se trouvent dans ce même fichier. Aucun autre lien au template n’a été identifié dans les composants actifs.

### Recommandation de gate

Ne pas reprendre l’implémentation sans traiter au minimum les défauts à fort impact de l’épique 3 (assets valides) et décider du comportement attendu du filtre catégorie. Valider avec les mentors les recommandations de ce rapport, conformément au gate de l’épique 1. Les résidus de template peuvent être nettoyés dans une tâche distincte; aucune suppression n’a été effectuée pendant cet audit.

## Revue de l'Épique 1bis

Périmètre vérifié : corrections des commits `821319f` à `5633d68`, par lecture du code et recherche dans les fichiers suivis du projet. Aucun code n’a été modifié et aucun test navigateur/build n’a été exécuté pendant cette revue ciblée.

### 1. Filtre de catégories — **validé**

- `src/components/home/CategoryGrid.vue:5` transmet le slug choisi dans `/produits?categorie=<slug>`.
- `src/pages/ProductList.vue:44-55` construit la liste des slugs reconnus depuis `categories.json`; une valeur simple et reconnue applique le filtre correspondant aux produits. Paramètre absent, slug inconnu ou paramètre répété (valeur non string) donne `activeCategory = 'all'` et affiche tous les produits.
- `src/pages/ProductList.vue:66-70` synchronise les boutons de filtre dans l’URL via `router.replace`; choisir « Tout » retire la query. Le comportement est cohérent avec l’état réactif dérivé de `route.query` et ne contredit aucune primitive.
- Précision pour le backlog : `replace` met à jour l’entrée courante; il ne crée pas une entrée par changement de filtre dans l’historique précédent/suivant. Le partage de l’URL et le rafraîchissement restent cohérents. Cette différence avec la note de session du backlog n’empêche pas de valider la correction demandée.

### 2. Suppression des résidus Vite — **validé**

Les six fichiers annoncés sont absents de l’inventaire courant : `src/components/HelloWorld.vue`, `src/assets/vite.svg`, `src/assets/vue.svg`, `src/assets/hero.png`, `public/icons.svg` et `public/favicon1.svg`. La recherche de références dans le code/configuration (`src/`, `public/`, `index.html`, `vite.config.js`, `package.json`, README et documents) ne trouve aucun import ou chemin actif vers ces fichiers. Les seules mentions restantes sont dans les notes d’audit/backlog qui consignent leur suppression; ce sont des références historiques, pas des références cassées. `index.html` conserve le favicon actif `/favicon.svg`.

### 3. `rel="noopener noreferrer"` — **validé**

Le relevé exhaustif du code actif trouve 12 occurrences `target="_blank"` et 12 attributs `rel="noopener noreferrer"`, tous sur les mêmes éléments `<a>` : ProductCard (1), Contact (4), CartDrawer (1), AppHeader (2), AppFooter (1), HeroSection (1), ProductDetail (1) et ContactSection (1). La forme est valide et aucun lien actif `target="_blank"` sans cet attribut n’a été trouvé.

### Cohérence du résumé de l’audit précédent

La remarque des mentors est juste : l’ancien rapport qualifiait `HelloWorld.vue` de **bloquant** au Niveau 1, mais le résumé final annonçait zéro point bloquant. Ces sévérités ne concordent pas. Pour éviter de propager cette incohérence, le comptage détaillé de l’audit initial doit être lu comme **1 bloquant, 24 à corriger et 25 mineurs**; le résumé final précédent était erroné. La suppression de `HelloWorld.vue` dans l’Épique 1bis résout ce point.

### Verdict de clôture

Les trois corrections de l’Épique 1bis sont validées en revue statique et ne présentent pas de violation de primitive ni de référence cassée identifiée. **L’Épique 1bis peut être considérée comme close**; les vérifications manuelles du filtre et de la console restent planifiées à l’Épique 5, et ne constituent pas un défaut constaté dans cette revue ciblée.
