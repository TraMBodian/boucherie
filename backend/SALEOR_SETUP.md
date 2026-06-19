# Saleor e-commerce API - Installation & Configuration

## Architecture

Saleor est une plateforme e-commerce GraphQL moderne et headless.

```
┌─────────────────────────────────────────┐
│   Front-end Next.js (localhost:3000)    │
│   - Affiche les produits                │
│   - Gère le panier et le checkout       │
└──────────────────┬──────────────────────┘
                   │ API GraphQL
                   ▼
┌─────────────────────────────────────────┐
│ Saleor API (localhost:8000/graphql/)    │
│ - Produits, catégories, attributs       │
│ - Commandes, clients                    │
│ - Paiements, livraison                  │
│ - Admin dashboard                       │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│  PostgreSQL (localhost:5432)            │
│  - Base de données Saleor               │
└─────────────────────────────────────────┘
```

## Démarrage rapide (Docker)

### 1. Créer le docker-compose.yml

Voir le fichier `docker-compose.yml` dans ce dossier.

### 2. Lancer Saleor

```bash
docker-compose up -d
```

### 3. Accéder à Saleor

- **Storefront API** : http://localhost:8000/graphql/
- **Admin Dashboard** : http://localhost:8000/admin/ (créer un compte)
- **API Token** : Configuration dans le dashboard admin

## Configuration initiale

### 1. Créer un compte admin

Dans l'admin dashboard :
1. Aller sur http://localhost:8000/admin/
2. Créer un compte superuser

### 2. Créer un channel de vente

1. Aller sur **Channels** dans l'admin
2. Créer un channel "France" ou "Default"
3. Configurer la devise (EUR), la langue, les modes de livraison

### 3. Ajouter des produits

```bash
# Via l'admin dashboard ou via GraphQL mutations
```

### 4. Générer un token d'authentification

Dans l'admin :
1. Settings → Apps & integrations
2. Créer une App pour le front-end
3. Copier le token d'accès

## Intégration Front-end

Le front-end Next.js accède à Saleor via l'API GraphQL.

### Exemple de requête (Products)

```graphql
query GetProducts {
  products(first: 10) {
    edges {
      node {
        id
        name
        slug
        description
        variants {
          id
          name
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
        thumbnail {
          url
        }
      }
    }
  }
}
```

## Commandes en temps réel

Saleor supporte les **webhooks** pour notifier le front-end / l'admin quand une commande est créée :

1. Settings → Webhooks
2. Créer un webhook pour `order.created`
3. Pointer vers ton serveur de notifications

## Prochaines étapes

1. Démarrer Saleor avec docker-compose
2. Configurer les canaux de vente
3. Ajouter les produits et les modes de livraison
4. Créer un token d'authentification pour le front-end
5. Remplacer les mocks Next.js par des appels GraphQL réels vers Saleor
