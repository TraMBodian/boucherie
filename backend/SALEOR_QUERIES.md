# Saleor GraphQL Queries & Mutations

Cette collection contient les requêtes GraphQL principales pour intégrer Saleor avec le front-end Next.js.

## 1️⃣ Récupérer les produits

### Query: Lister tous les produits

```graphql
query GetProducts($first: Int = 10) {
  products(first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        slug
        description
        category {
          name
          slug
        }
        thumbnail {
          url
          alt
        }
        variants {
          id
          name
          sku
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
          stocks {
            quantity
            warehouse {
              name
            }
          }
        }
      }
    }
  }
}
```

### Query: Récupérer un produit par slug

```graphql
query GetProductBySlug($slug: String!) {
  productBySlug(slug: $slug) {
    id
    name
    slug
    description
    category {
      name
    }
    thumbnail {
      url
    }
    media {
      url
      alt
    }
    variants {
      id
      name
      sku
      attributes {
        attribute {
          name
        }
        values {
          name
        }
      }
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
      stocks {
        quantity
        warehouse {
          name
        }
      }
    }
  }
}
```

## 2️⃣ Créer un client & une commande

### Mutation: Créer un client (Guest Checkout)

```graphql
mutation CreateOrder($input: DraftOrderCreateInput!) {
  draftOrderCreate(input: $input) {
    order {
      id
      token
      userEmail
      billingAddress {
        firstName
        lastName
        addressLine1
        city
        postalCode
        country {
          code
        }
      }
    }
    errors {
      field
      message
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "userEmail": "client@example.com",
    "lines": [
      {
        "variantId": "UHJvZHVjdFZhcmlhbnQ6MQ==",
        "quantity": 2
      }
    ],
    "billingAddress": {
      "firstName": "Jean",
      "lastName": "Dupont",
      "addressLine1": "123 Rue de la Paix",
      "city": "Paris",
      "postalCode": "75000",
      "country": "FR"
    }
  }
}
```

### Mutation: Ajouter une adresse de livraison

```graphql
mutation SetOrderShippingAddress($orderId: ID!, $shippingAddress: AddressInput!) {
  draftOrderUpdate(id: $orderId, input: { shippingAddress: $shippingAddress }) {
    order {
      id
      shippingAddress {
        firstName
        lastName
        addressLine1
        city
        postalCode
      }
    }
  }
}
```

### Mutation: Finaliser une commande (Checkout)

```graphql
mutation CompleteCheckout($orderId: ID!) {
  draftOrderComplete(id: $orderId) {
    order {
      id
      number
      created
      userEmail
      total {
        gross {
          amount
          currency
        }
      }
      status
    }
    errors {
      field
      message
    }
  }
}
```

## 3️⃣ Paiement

### Mutation: Créer une transaction de paiement (Stripe)

```graphql
mutation CreatePayment($orderId: ID!, $input: PaymentInput!) {
  paymentCreate(input: $input) {
    payment {
      id
      gateway
      total {
        amount
        currency
      }
      chargeStatus
    }
    errors {
      field
      message
    }
  }
}
```

## 4️⃣ Panier Client

### Mutation: Ajouter un produit au panier

```graphql
mutation AddToCheckout($checkoutId: ID!, $lines: [CheckoutLineInput!]!) {
  checkoutLinesAdd(id: $checkoutId, lines: $lines) {
    checkout {
      id
      lines {
        id
        quantity
        variant {
          name
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
      total {
        gross {
          amount
          currency
        }
      }
    }
    errors {
      field
      message
    }
  }
}
```

### Query: Récupérer le checkout actuel

```graphql
query GetCheckout($id: ID!) {
  checkout(id: $id) {
    id
    token
    lines {
      id
      quantity
      variant {
        id
        name
        sku
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
    }
    billingAddress {
      firstName
      lastName
      addressLine1
      city
      postalCode
    }
    shippingAddress {
      firstName
      lastName
      addressLine1
      city
      postalCode
    }
    shippingMethods {
      id
      name
      price {
        amount
        currency
      }
    }
    total {
      gross {
        amount
        currency
      }
      tax {
        amount
        currency
      }
    }
  }
}
```

## 5️⃣ Commandes client (Historique)

### Query: Lister les commandes du client

```graphql
query GetCustomerOrders($first: Int = 10) {
  me {
    id
    email
    orders(first: $first) {
      edges {
        node {
          id
          number
          created
          status
          total {
            gross {
              amount
              currency
            }
          }
          lines {
            id
            quantity
            variant {
              name
              sku
            }
          }
        }
      }
    }
  }
}
```

### Query: Récupérer une commande par ID

```graphql
query GetOrder($id: ID!) {
  order(id: $id) {
    id
    number
    created
    userEmail
    status
    statusDisplay
    total {
      gross {
        amount
        currency
      }
    }
    lines {
      id
      quantity
      variant {
        name
        sku
      }
    }
    events {
      id
      type
      date
      message
    }
  }
}
```

## 🔐 Authentification

### Mutation: Créer un token d'authentification

```graphql
mutation CreateToken($email: String!, $password: String!) {
  tokenCreate(email: $email, password: $password) {
    token
    user {
      id
      email
      firstName
      lastName
    }
    errors {
      field
      message
    }
  }
}
```

## 📚 Tests

Pour tester ces requêtes :

1. Aller sur http://localhost:8000/graphql/
2. Copier/coller une requête
3. Exécuter avec les variables appropriées

Ou utiliser **Postman** avec le type de requête "GraphQL".
