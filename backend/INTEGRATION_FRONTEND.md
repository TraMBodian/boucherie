# Configuration Saleor pour Front-end Next.js

## Variables d'environnement

Créer un fichier `.env.local` dans le dossier `frontend/` :

```env
# Saleor API URL
NEXT_PUBLIC_SALEOR_API_URL=http://localhost:8000/graphql/

# Saleor Admin URL (optionnel, pour les lien admin)
NEXT_PUBLIC_SALEOR_ADMIN_URL=http://localhost:9000

# API Token (à récupérer depuis l'admin Saleor)
SALEOR_API_TOKEN=your_token_here
```

## Installation du client Saleor

Dans le dossier `frontend/`, installer le SDK officiel Saleor :

```bash
npm install saleor graphql-request
```

## Utilisation

### Client GraphQL basique

Créer `frontend/lib/saleor-client.ts` :

```typescript
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_SALEOR_API_URL || 'http://localhost:8000/graphql/';

export const saleorClient = new GraphQLClient(endpoint, {
  headers: {
    'Authorization': `Bearer ${process.env.SALEOR_API_TOKEN}`,
  },
});
```

### Récupérer les produits depuis Saleor

Remplacer `frontend/lib/saleor.ts` :

```typescript
import { saleorClient } from './saleor-client';
import gql from 'graphql-tag';

const GET_PRODUCTS_QUERY = gql`
  query GetProducts($first: Int = 10) {
    products(first: $first) {
      edges {
        node {
          id
          name
          slug
          description
          thumbnail {
            url
          }
          variants {
            id
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProducts() {
  const data = await saleorClient.request(GET_PRODUCTS_QUERY, {
    first: 10,
  });
  return data.products.edges.map((edge: any) => ({
    id: edge.node.id,
    name: edge.node.name,
    slug: edge.node.slug,
    description: edge.node.description,
    price: edge.node.variants[0]?.pricing?.priceRange?.start?.gross?.amount || 0,
    image: edge.node.thumbnail?.url || '',
    category: 'Catégorie',
  }));
}
```

## Vérification de la connexion

Tester la connexion entre Next.js et Saleor :

```bash
# Dans le dossier frontend/
npm run dev

# Aller sur http://localhost:3000
# Les produits doivent s'afficher depuis Saleor
```

## Prochaines étapes

1. ✅ Saleor API lancée en Docker
2. ✅ Produits visibles dans l'admin
3. ⬜ Intégrer Saleor au front-end Next.js
4. ⬜ Ajouter le panier avec webhooks
5. ⬜ Paiement sécurisé (Stripe/Wave)
