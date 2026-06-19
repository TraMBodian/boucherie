# Frontend Boucherie Moderne

Cette application est un front-end Next.js headless pour la boutique.
Elle est conçue pour se connecter à un back-end e-commerce moderne (Saleor ou autre API headless).

## Installation

1. Aller dans le dossier frontend
2. Installer les dépendances avec `npm install`
3. Démarrer le projet en local avec `npm run dev`

## Architecture

- `app/` contient les pages statiques et dynamiques
- `components/` contient les composants réutilisables
- `lib/` contient les services d'accès aux données

## Prochaines étapes

- Remplacer les données mock par des appels GraphQL vers Saleor
- Mettre en place un panier client via localStorage ou state global
- Ajouter l’authentification client et le checkout connecté
