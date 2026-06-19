# DÉMARRAGE - API Saleor pour Boucherie

Ce guide te montre comment lancer l'API e-commerce Saleor en local et la connecter au front-end.

## 📋 Checklist

- [ ] Docker & Docker Compose installés
- [ ] Ports disponibles : 8000, 5432, 6379, 9000
- [ ] Terminal positionné dans `backend/`
- [ ] Fichier `docker-compose.yml` présent

## ▶️ Démarrage

### 1. Lancer Saleor

```bash
cd backend/
docker-compose up -d
```

Attendre 30-60 secondes que PostgreSQL et Redis se démarrent.

### 2. Vérifier que Saleor tourne

```bash
docker-compose ps
```

Tu dois voir 4 services en green ✅ :
- saleor-postgres (running)
- saleor-redis (running)
- saleor-api (running)
- saleor-admin (running)

### 3. Accéder aux services

| Service | URL | Rôle |
|---------|-----|------|
| **GraphQL API** | http://localhost:8000/graphql/ | Requêtes/mutations e-commerce |
| **Admin Dashboard** | http://localhost:9000 | Gestion produits, commandes |
| **PostgreSQL** | localhost:5432 | Base de données |
| **Redis** | localhost:6379 | Cache |

### 4. Créer un compte admin

1. Ouvrir http://localhost:9000
2. Cliquer "Créer un compte"
3. Entrer :
   - Email : `admin@boucherie.local`
   - Password : `SecurePassword123!`
4. Accepter les conditions

### 5. Configuration initiale (Admin)

#### A. Créer un channel de vente

1. Admin → Configuration → Channels
2. Créer un channel "France" :
   - Devise : EUR
   - Langue : FR
   - Domaine : localhost:3000
   - Activer le checkout

#### B. Ajouter des modes de livraison

1. Admin → Configuration → Shipping
2. Créer une zone "France métropolitaine"
3. Ajouter 2 méthodes :
   - Livraison express (24-48h) : 9.99€
   - Click & Collect (libre service) : Gratuit

#### C. Ajouter des produits

1. Admin → Catalogue → Produits
2. Créer un produit "Entrecôte de bœuf"
3. Ajouter une variante avec prix et stock
4. Importer les images

#### D. Générer un token API

1. Admin → Configuration → Apps et intégrations
2. Créer une app "Frontend"
3. Copier le token sous "Authentification"
4. Le sauvegarder dans `frontend/.env.local` :
   ```env
   SALEOR_API_TOKEN=your_token_here
   ```

## 🔌 Tester l'API

### Requête simple

Ouvrir http://localhost:8000/graphql/ et coller :

```graphql
query {
  products(first: 5) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
}
```

Cliquer "Play" → Tu dois voir les produits créés.

## 🔗 Connecter le front-end

### 1. Ajouter les variables d'environnement

Dans `frontend/.env.local` :

```env
NEXT_PUBLIC_SALEOR_API_URL=http://localhost:8000/graphql/
NEXT_PUBLIC_SALEOR_ADMIN_URL=http://localhost:9000
SALEOR_API_TOKEN=your_token_here
```

### 2. Installer le client GraphQL

```bash
cd frontend/
npm install graphql-request graphql
```

### 3. Tester la connexion

```bash
npm run dev
```

Ouvrir http://localhost:3000 → Les produits Saleor doivent s'afficher.

## 📚 Fichiers de référence

- `SALEOR_SETUP.md` — Installation & configuration complète
- `SALEOR_QUERIES.md` — Requêtes GraphQL (produits, commandes, paiement)
- `INTEGRATION_FRONTEND.md` — Intégration front-end détaillée

## 🛠️ Commandes utiles

```bash
# Voir les logs de Saleor
docker-compose logs -f saleor

# Redémarrer Saleor
docker-compose restart saleor

# Arrêter tous les services
docker-compose down

# Reset complet (données supprimées)
docker-compose down -v

# Nettoyer les images Docker
docker system prune -a
```

## ⚠️ Troubleshooting

### "Port 8000 already in use"
```bash
# Trouver le processus sur le port
netstat -tulpn | grep 8000
# Tuer le processus
kill -9 <PID>
```

### PostgreSQL ne démarre pas
```bash
# Supprimer les données corrompues
docker-compose down -v
docker-compose up -d
```

### API répond lentement
```bash
# Réinitialiser Redis
docker exec saleor-redis redis-cli FLUSHALL
```

---

**Prêt ? Lance `docker-compose up -d` et continue !** 🚀