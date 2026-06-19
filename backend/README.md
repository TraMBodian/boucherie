# Backend e-commerce recommandé

Cette architecture utilise un front-end headless Next.js et un back-end e-commerce moderne.
La solution recommandée pour le back-end est **Saleor**.

## Pourquoi Saleor

- API-first (GraphQL)
- Excellente performance
- Headless et scalable
- Idéal pour des boutiques premium et des intégrations sur mesure

## Étapes de mise en place

1. Installer Docker et Docker Compose
2. Cloner le dépôt Saleor ou utiliser le starter Saleor Cloud
3. Configurer l’URL du front-end dans l’interface Saleor
4. Connecter le front-end Next.js à l’API Saleor

## Intégration future

- Cartes produits et catalogue via l’API GraphQL
- Création de commande via API
- Webhooks pour notifications de commandes en temps réel
- Authentification client, adresses, historique commandes
