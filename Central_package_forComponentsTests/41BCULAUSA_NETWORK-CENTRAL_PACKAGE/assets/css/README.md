# CSS — 41BCULAUSA (Primo NDE)

Personnalisation CSS de la vue Primo NDE. Ce dossier suit une architecture
modulaire : un point d'entrée qui ne fait qu'importer, des variables/tokens
centralisés, et un fichier par composant de l'interface.

## Structure

| Fichier | Rôle |
|---|---|
| `custom.css` | **Point d'entrée.** Ne contient que les `@import`, aucune règle. |
| `_variables.css` | **Source unique de vérité** : couleurs, bordures, radius, tailles, typo, `@font-face`. |
| `_general.css` | Règles globales : police, liens, séparateurs, boutons flottants. |
| `_mainmenu.css` | En-tête : logo, hauteur, menu de navigation. |
| `_searchbar.css` | Barre de recherche (accueil) et menu de scope. |
| `_homepage.css` | Page d'accueil RNV : raccourcis, nouvelles lectures, aides, bibliothèques. |
| `_account.css` | Espace utilisateur (compte, paramètres, infos perso). |
| `_briefdisplay.css` | Notice en liste : titre, disponibilité, Open Access. |
| `_resultspage.css` | Page de résultats : barres, conteneur, pagination. |
| `_facets.css` | Filtres latéraux (facettes) et bascules. |
| `_fulldisplay.css` | Vue complète : View It, localisations, requêtes, Rapido, browse. |
| `_collections.css` | Collections thématiques (modes grille et liste). |
| `_footer.css` | Pied de page. |
| `_overlay.css` | Contenus CDK : menus, dialogues, login, formulaires de requête. |
| `_darkmode.css` | **WIP, désactivé.** Mode sombre (repris de la British Library), non importé. |

## Ordre d'import (important)

Dans `custom.css`, l'ordre est significatif à cause de la cascade CSS :

1. `_variables.css` **en premier** (les autres fichiers consomment ses tokens).
2. `_general.css` puis les modules.
3. `_darkmode.css` **en dernier** quand il sera réactivé, pour qu'il surcharge
   tous les autres modules.

## Conventions

### Variables et tokens
- **Toujours réutiliser un token** de `_variables.css` plutôt que de coder une
  valeur en dur. Si une valeur (couleur, bordure, radius, taille) se répète,
  elle doit devenir un token.
- Nommage : `kebab-case`, préfixé par sa catégorie.
  - Couleurs : `--color-*` (ex. `--color-beige-fonce`).
  - Pour une couleur utilisée aussi en transparence, fournir aussi ses
    composantes RGB : `--color-x` **et** `--color-x-rgb`, puis
    `rgba(var(--color-x-rgb), 0.3)`.
  - Bordures : `--border-*`, radius : `--radius-*`, tailles : `--btn-width`…,
    typo : `--font-weight-*`.
- Ne **pas renommer** les variables imposées par Primo / Angular Material
  (`--sys-*`, `--mat-*`, `--mdc-*`) : elles proviennent du thème de base.

### Unités
- Tailles de police en `rem` (accessibilité), pas en `px`.

### Couleurs littérales
- Utiliser `#fff` (pas `white`) pour rester cohérent.
- Vérifier le contraste WCAG AA (≥ 4.5:1 pour le texte) avant d'éclaircir une
  couleur de texte. Voir la note sur `--color-unavailable`.

### Style
- En-tête de bloc en haut de chaque fichier (rôle + périmètre).
- Commentaires `/* … */` courts au-dessus des sections.
- `!important` : souvent nécessaire pour surcharger Angular Material, mais à
  éviter quand la spécificité du sélecteur suffit.
- Indentation : 4 espaces.

## À faire / pistes

- **Mode sombre** : finaliser `_darkmode.css` (corriger la virgule parasite
  l. 140), puis l'importer en dernier dans `custom.css`.
- **Échelle d'espacement** : envisager des tokens `--space-*` pour les paddings
  et marges (`5px`, `16px`, `24px`, `80px`…) si l'on veut pousser le design
  system plus loin.
