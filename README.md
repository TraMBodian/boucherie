# Boucherie Moderne - Code de démarrage

Ce dépôt contient désormais une base de code pour un front-end e-commerce moderne et performant.

## Stack choisie

- Front-end : **Next.js + TypeScript + Tailwind CSS**
- Architecture : **Headless storefront**
- Back-end recommandé : **Saleor** (API-first, GraphQL, scalable)

## Démarrage

```bash
cd frontend
npm install
npm run dev
```

## Structure

- `frontend/app/` : pages et routes Next.js
- `frontend/components/` : composants UI réutilisables
- `frontend/lib/` : services et types de données
- `backend/README.md` : recommandations pour le back-end e-commerce

## Prochaines étapes

1. Installer Saleor ou un back-end headless compatible
2. Remplacer les mocks par des appels réels à l’API
3. Implémenter le panier et le checkout
4. Ajouter l’authentification client et le suivi de commande
