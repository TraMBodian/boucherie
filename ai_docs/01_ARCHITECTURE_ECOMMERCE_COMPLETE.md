# Architecture E-Commerce Premium — WordPress + WooCommerce

**Document de Conception**  
**Version** : 1.0  
**Date** : 2026-06-19  
**Auteur** : Architecture Expert  
**Pour** : Site e-commerce haute performance & scalabilité

---

## Table des matières

1. [Architecture WordPress + WooCommerce](#1-architecture-wordpress--woocommerce)
2. [Page d'accueil Premium](#2-page-daccueil-premium)
3. [Catalogue Produits](#3-catalogue-produits)
4. [Fiche Produit Premium](#4-fiche-produit-premium)
5. [Panier Avancé](#5-panier-avancé)
6. [Checkout Professionnel](#6-checkout-professionnel)
7. [Espace Client](#7-espace-client)
8. [Back Office Administrateur](#8-back-office-administrateur)
9. [SEO Stratégique](#9-seo-stratégique)
10. [Performance & Optimisation](#10-performance--optimisation)
11. [Extensions WordPress Recommandées](#11-extensions-wordpress-recommandées)
12. [Architecture Technique](#12-architecture-technique)
13. [Roadmap de Développement](#13-roadmap-de-développement)

---

# 1. Architecture WordPress + WooCommerce

## 1.1 Structure globale du site

### Hiérarchie de l'information

```
SITE
├── Pages Statiques
│   ├── Accueil
│   ├── À propos
│   ├── Contact
│   ├── Mentions légales
│   ├── Politique de confidentialité
│   ├── Conditions générales
│   └── FAQ
├── E-commerce
│   ├── Boutique (Shop Page)
│   ├── Catégories
│   ├── Produits
│   ├── Panier
│   ├── Checkout
│   └── Compte client
├── Contenu Marketing
│   ├── Blog
│   ├── Guides produits
│   ├── Conseils
│   └── Interviews
└── API/Services
    ├── API REST WooCommerce
    ├── Recherche Elasticsearch
    └── Paiement & Livraison
```

## 1.2 Types de contenus WordPress

### Post Types Principaux

| Type | Slug | Description | Archive | Single |
|---|---|---|---|---|
| Product | product | Produits WooCommerce | `/boutique/` | `/produit/{slug}` |
| Product Category | product_cat | Catégories produits | `/boutique/{slug}/` | - |
| Product Tag | product_tag | Tags produits | `/tag/{slug}/` | - |
| Post | post | Articles blog | `/blog/` | `/blog/{slug}` |
| Page | page | Pages statiques | - | `/{slug}` |
| Product Brand | product_brand | Marques (custom) | `/marques/{slug}/` | - |

### Taxonomies Essentielles

```
├── product_cat
│   ├── Viande rouge
│   │   ├── Bœuf
│   │   ├── Veau
│   │   └── Gibier
│   ├── Volaille
│   ├── Poisson & fruits de mer
│   └── Charcuterie
├── product_tag
│   ├── Bio
│   ├── Label rouge
│   ├── Promotion
│   └── Nouveau
└── product_brand (custom post type)
    ├── Marques principales
    └── Producteurs
```

## 1.3 Attributs produits

### Attributs structurés

```
Système d'attributs global
├── pa_type_coupe
│   ├── Entrecôte
│   ├── Côte
│   ├── Rumsteck
│   └── Côte de boeuf
├── pa_poids
│   ├── 250g
│   ├── 500g
│   ├── 750g
│   └── 1kg
├── pa_origine
│   ├── France
│   ├── Normandie
│   ├── Bretagne
│   └── Limousin
├── pa_qualite
│   ├── Standard
│   ├── Premium
│   └── Prestige
└── pa_type_elevage
    ├── Conventionnel
    ├── Bio
    └── Label rouge
```

### Métadonnées produit

```
Pour chaque produit :
├── Prix standard & prix promo
├── Stock (géré par WooCommerce)
├── SKU
├── Poids & dimensions (transport)
├── Traçabilité (champs custom)
│   ├── Origine
│   ├── Certification
│   └── Date production
├── Conseils d'utilisation
├── Conditions de conservation
├── Livraison autorisée (livrée/retrait)
└── Statut publication
```

## 1.4 Gestion des produits variables

### Structure des variations

```
Produit simple : T-bone 500g
Produit variable : Entrecôte avec variations
├── Variation 1 : 250g - 25€
├── Variation 2 : 500g - 45€
├── Variation 3 : 750g - 65€
└── Variation 4 : 1kg - 85€

Attributs de variation
├── Poids (distinguant)
├── Origine (non-distinguant)
└── Qualité (optionnel)
```

### Logique d'affichage

- Affichage du **premier prix** en listing
- Indication "À partir de X€" si variations
- Sélection d'attributs sur fiche produit
- **Mise à jour du prix en JS** (sans rechargement)
- Indicateur stock par variation

## 1.5 Gestion des stocks

### Configuration WooCommerce

```
Stock Management = ACTIVÉ
├── Suivi quantités par produit/variation
├── Seuil bas stock = 5 unités
├── Rupture possible = NON
├── Notification rupture = Email admin
└── Réservation automatique = 1h après ajout panier
```

### Workflow stock

```
Produit disponible (Stock > 0)
    ↓
Ajout panier → Stock réservé (1h)
    ↓
Commande payée → Stock déduit (définitif)
    ↓
Commande remboursée → Stock restauré
```

## 1.6 Gestion des promotions

### Types de promotion

```
1. Prix promotionnel simple
   └─ Prix barré + nouveau prix

2. Pourcentage de réduction
   └─ -10%, -20%, -30%, etc.

3. Coupons promo (Codes)
   ├─ Montant fixe
   ├─ Pourcentage
   └─ Limites (nombre utilisation, catégories, montant min)

4. Lot promotionnel
   └─ "Achetez 3, payez 2"

5. Offres flash (durée limitée)
   └─ Visibilité haute, compte à rebours

6. Programme fidélité
   └─ Points de remise
```

### Règles d'application

- **Promotion simple** : appliquée automatiquement
- **Coupon** : code manuel ou auto-appliqué (URL)
- **Lot** : calculé à la mise à jour du panier
- **Flash** : affichage countdown + alerte stock bas

## 1.7 Wishlist / Favoris

### Données

```
Utilisateur → Wishlist
├─ ID produit
├─ Date ajout
├─ Notation personnelle (optionnelle)
└─ Partage possible (URL secrète)

Stockage
├─ Base de données (si utilisateur connecté)
├─ Cookies (utilisateur anonyme, 30 jours)
└─ LocalStorage (JavaScript, backup côté client)
```

### Fonctionnalités

- Ajouter/retirer de la wishlist (cœur animé)
- Voir sa wishlist (page dédiée)
- Partager sa wishlist (email, réseaux)
- Notification prix bas
- Notification disponibilité

## 1.8 Comparateur de produits

### Fonctionnement

```
Utilisateur sélectionne produits à comparer
├─ Interface graphique : coches sur fiches
├─ Limite : max 4-5 produits (lisibilité)
├─ Session ou persistant (cookies)
└─ URL partageable

Affichage du comparateur
├─ Tableau horizontal ou vertical
├─ Colonnes : produits
├─ Lignes : attributs (prix, poids, avis, etc.)
├─ Code couleur (éléments distinctifs)
└─ CTA "Ajouter au panier" par produit
```

### Attributs à comparer

- Prix
- Poids/format
- Origine
- Qualité
- Certification
- Avis (note moyenne)
- Stock
- Livraison

## 1.9 Produits récemment consultés

### Logique de suivi

```
Tracking JavaScript
├─ PageView produit → enregistrement
├─ Historique limité : 10 produits
├─ Durée mémorisation : 30 jours
└─ Stockage : Cookies + LocalStorage

Affichage
├─ Barre latérale (Right sidebar)
├─ Widget responsive (mobile)
├─ Affichage grille
└─ CTA "Ajouter au panier"
```

## 1.10 Produits recommandés

### Moteur de recommandation

```
Stratégies de recommandation

1. BASÉ SUR LES VENTES
   └─ "Meilleures ventes" globales

2. BASÉ SUR LA CATÉGORIE
   └─ "Produits similaires" dans même catégorie

3. BASÉ SUR LES AVIS
   └─ "Mieux notés" dans la catégorie

4. BASÉ SUR LES ACHATS
   └─ "Les clients qui ont acheté ça ont aussi acheté..."
   └─ (personnalisé par produit)

5. BASÉ SUR LE PROFIL
   └─ Recommandations utilisateur connecté
   └─ Historique d'achat + wishlist

6. BASÉ SUR LA POPULARITÉ
   └─ Tendance : "Actuellement en vogue"
```

### Affichage des recommandations

- Fiche produit : section "Produits similaires"
- Panier : "Complétez votre commande"
- Après paiement : "Poursuivez vos achats"
- Email post-achat : recommandations personnalisées
- Accueil : "Nos bestsellers"

---

# 2. Page d'accueil Premium

## 2.1 Structure globale

### Layout (Desktop)

```
┌─────────────────────────────────────────┐
│ HEADER (sticky)                         │
│ ├─ Logo                                 │
│ ├─ Mega Menu                            │
│ ├─ Barre recherche                      │
│ ├─ Connexion / Compte                   │
│ └─ Panier                               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ BANNEAU D'ANNONCE (promo, alerte)       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ HERO SECTION (fullwidth)                │
│ ├─ Image/Vidéo hero                     │
│ ├─ Titre principal                      │
│ ├─ Sous-titre                           │
│ ├─ CTA primaire (vers catalogue)        │
│ └─ CTA secondaire (découvrir)           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ BLOCS DE RÉASSURANCE (4 colonnes)       │
│ ├─ Livraison rapide                     │
│ ├─ Qualité garantie                     │
│ ├─ Service client 24/7                  │
│ └─ Retour facile                        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ CATÉGORIES PRINCIPALES (6-8 items)      │
│ └─ Grille avec images + CTA             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ PRODUITS VEDETTES (6 items)             │
│ ├─ Badge "À la une"                     │
│ └─ Slider ou grille responsive          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ SECTION PROMOTIONS (Offres flash)       │
│ ├─ Produits en promotion                │
│ ├─ Countdown (fins dans X heures)       │
│ └─ Stock limité affiché                 │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ MEILLEURES VENTES (4 items)             │
│ └─ Avec note moyenne                    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ NOUVEAUTÉS (4 items)                    │
│ └─ Badge "Nouveau"                      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ MARQUES PARTENAIRES (logo scroll)       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ TÉMOIGNAGES CLIENTS (carousel)          │
│ ├─ Photo profil                         │
│ ├─ Avis textuel                         │
│ ├─ Note (5 étoiles)                     │
│ └─ Nom client                           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ AVANTAGES DE LA PLATEFORME              │
│ ├─ Sélection & qualité                  │
│ ├─ Conseils experts                     │
│ └─ Engagement social                    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ NEWSLETTER (CTA + formulaire)           │
│ └─ Email + consentement RGPD            │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ FOOTER                                  │
│ ├─ Liens utiles                         │
│ ├─ Infos entreprise                     │
│ ├─ Réseaux sociaux                      │
│ └─ Copyright                            │
└─────────────────────────────────────────┘
```

## 2.2 Détail des sections

### Header avancé

**Sticky** = Oui (reste visible au scroll)

**Éléments**
- Logo cliquable (retour accueil)
- Mega Menu (catégories principales déroulantes)
- Barre recherche intelligente (autocomplete)
- Icône connexion / Compte utilisateur
- Icône panier (nombre d'articles)
- Mobile : burger menu

**Mega Menu Structure**
```
Catégories
├─ Viande rouge (avec sous-menu + images)
├─ Volaille
├─ Poisson & fruits de mer
├─ Charcuterie
├─ Promotions
├─ Blog
└─ À propos
```

### Barre de recherche intelligente

**Fonctionnalités**
- Autocomplétion en temps réel (Elasticsearch)
- Suggestions de produits (3-5 résultats)
- Suggestions de catégories
- Recherche historique (utilisateur connecté)
- Recherche vocale (si navigateur compatible)
- Filtres rapides (prix, note)

### Hero Section

**Affichage**
- Hauteur : 400-500px (responsive)
- Image fullwidth ou vidéo
- Texte overlay semi-transparent
- CTA principal : "Découvrir la boutique"
- CTA secondaire : "Nos promotions"

**Contenu recommandé**
- Produits en promotion
- Collection saisonnière
- Marque/collectif en avant

### Blocs de réassurance (4 colonnes)

| Bloc | Icône | Titre | Description |
|---|---|---|---|
| 1 | 🚚 | Livraison rapide | Livraison en 24-48h |
| 2 | ✓ | Qualité garantie | Produits frais & traçables |
| 3 | 📞 | Service client | Réponse en <2h |
| 4 | 🔄 | Retour facile | 30 jours satisfait |

### Catégories principales (6-8 items)

**Format**
- Grille 3 colonnes (desktop), 2 (tablet), 1 (mobile)
- Image + titre + CTA "Voir"
- Effet hover (zoom léger + shadow)

**Contenu**
- Catégories principales du catalogue
- Image haute résolution (1200x800px)
- Titre court et explicite

### Produits vedettes

**Sélection**
- Produits manuels (éditoriaux)
- Ou "Meilleures ventes du mois"
- Max 6 produits (grille 3x2)

**Card produit (miniature)**
```
┌─────────────────────────┐
│ Image produit           │ (aspect ratio 1:1)
├─────────────────────────┤
│ ⭐⭐⭐⭐⭐ (n avis)       │
│ Titre produit           │
│ Prix : 45€              │
│ Bouton "Ajouter panier" │
│ ♥ "Ajouter wishlist"    │
└─────────────────────────┘
```

### Section promotions (Offres flash)

**Affichage**
- Slider ou grille 4 items
- Countdown timer visible
- Stock restant affiché
- Badge "Promo -30%"

### Meilleures ventes

**Données**
- Produits avec + commandes (dernier mois)
- Note moyenne visible
- Nombre avis visible

### Nouveautés

**Données**
- Produits publiés (dernier mois)
- Badge "Nouveau" visible

### Marques partenaires

**Affichage**
- Logo scroll horizontal
- Effet hover (augmentation légère)
- Clic → page marque

### Témoignages clients (Carousel)

**Éléments par avis**
- Photo profil 60x60px
- Citation textuelle (max 120 caractères)
- Note 5 étoiles
- Nom du client
- Autoplay avec navigation (prev/next)

### Avantages de la plateforme

**3 blocs thématiques**
1. Sélection & qualité (traçabilité, certifications)
2. Conseils experts (blog, recettes, guides)
3. Engagement social/environnemental

### Newsletter

**CTA**
- Titre "Recevez nos bons plans"
- Sous-titre "10% de réduction dès votre 1ère commande"
- Formulaire : Email + Checkbox consentement RGPD
- Bouton "M'inscrire"

### Footer complet

**Colonnes**
```
Colonne 1 : Infos entreprise
├─ À propos
├─ Contact
├─ Mentions légales
└─ Politique de confidentialité

Colonne 2 : Aide client
├─ FAQ
├─ Livraison
├─ Retours
└─ Paiement

Colonne 3 : Mon compte
├─ Connexion
├─ Inscription
├─ Historique
└─ Wishlist

Colonne 4 : Réseaux sociaux
├─ Facebook
├─ Instagram
├─ Twitter
└─ LinkedIn

Bas footer
├─ Copyright
├─ Paiements acceptés (logos)
└─ Certifications (SSL, etc.)
```

## 2.3 Données nécessaires

**Contenu static**
- Textes (hero, sections)
- Images hero
- Logos marques

**Contenu dynamique**
- Produits vedettes (query custom)
- Meilleures ventes (statistiques)
- Témoignages (custom post type)
- Promotions en cours (via WooCommerce)

---

# 3. Catalogue Produits

## 3.1 Page catalogue (Shop Page)

### Layout

```
┌────────────────────────────────────────┐
│ HEADER CATALOGUE                       │
│ ├─ Titre page                          │
│ ├─ Chemin de navigation (breadcrumbs)  │
│ └─ Nombre produits                     │
└────────────────────────────────────────┘
┌──────────────────┐ ┌──────────────────┐
│ SIDEBAR LEFT     │ │ CONTENU PRINCIPAL│
│ (Filtres)        │ │                  │
│                  │ │ ┌──────────────┐ │
│ ✓ Catégories     │ │ │ Barre outils │ │
│ ✓ Prix           │ │ ├──────────────┤ │
│ ✓ Marque         │ │ │ Tri / Affichage │
│ ✓ Attributs      │ │ ├──────────────┤ │
│ ✓ Note           │ │ │ Grille produits │
│ ✓ Stock          │ │ │ (12 items)   │ │
│ ✓ Promo          │ │ │              │ │
│ Appliquer filtres│ │ ├──────────────┤ │
│ Réinitialiser    │ │ │ Pagination   │ │
│                  │ │ └──────────────┘ │
└──────────────────┘ └──────────────────┘
```

### Barre de filtres

**Filtres disponibles**

| Filtre | Options | Type |
|---|---|---|
| Catégorie | Bœuf, Veau, Agneau, etc. | Checkbox |
| Prix | Range 0-100€ | Slider |
| Marque | Liste complète | Checkbox |
| Disponibilité | En stock / Rupture | Checkbox |
| Note | 5⭐, 4⭐+, 3⭐+, etc. | Star rating |
| Attributs | Type coupe, Poids, Origine, Qualité | Checkbox/Select |
| Promotion | Produits en promo | Checkbox |

**Comportement**
- Mise à jour en temps réel (AJAX)
- URL querystring mise à jour (`?category=beef&price=0-50`)
- Clic "Appliquer" (desktop) ou auto-apply (mobile)
- "Réinitialiser filtres" visible si filtres actifs
- Nombre produits mis à jour dynamiquement

### Barre d'outils

**Éléments**
```
Affichage | Tri
├─ Vue grille (défaut)    ├─ Pertinence
├─ Vue liste              ├─ Popularité
└─ 12/24/48 par page      ├─ Avis clients
                          ├─ Prix ↑
                          ├─ Prix ↓
                          └─ Plus récent
```

### Grille produits

**Affichage par défaut**
- 4 colonnes (desktop 1920px)
- 3 colonnes (desktop 1280px)
- 2 colonnes (tablet)
- 1 colonne (mobile)
- 12 produits par page (par défaut, configurable)

**Card produit (Grille)**
```
┌─────────────────────────────────┐
│ Image (1:1)                     │
│ Badge promo/nouveau             │
├─────────────────────────────────┤
│ Titre (max 2 lignes)            │
│ ⭐⭐⭐⭐⭐ (150 avis)             │
│ Prix barré : 50€ | Prix : 45€   │
│ "Ajouter au panier"             │
│ ♥ Wishlist | 👁 Comparer        │
└─────────────────────────────────┘
```

### Vue liste

```
Produit 1
├─ Image (100x100)    | Titre long
├─ ⭐⭐⭐⭐⭐ (150)     | Description courte (2 lignes)
├─ Prix 45€           | Bouton "Ajouter panier"
└─ ♥ Wishlist         | 👁 Comparer
```

### Pagination

**Options**
- Pagination numérotée (1, 2, 3...)
- Navigation "Précédent / Suivant"
- Ou "Charger plus" (infinite scroll)
- Information "Affichage 1-12 sur 150"

## 3.2 Performance du catalogue

### Optimisation requêtes

```SQL
-- Requête produits optimisée
SELECT 
  p.ID, p.post_title, p.post_name,
  pm.meta_value as _price,
  pm2.meta_value as _stock,
  (SELECT GROUP_CONCAT(t.name) FROM wp_terms t 
   JOIN wp_term_relationships tr ON t.term_id = tr.term_taxonomy_id
   WHERE tr.object_id = p.ID AND t.taxonomy = 'product_cat') as categories
FROM wp_posts p
LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = '_price'
LEFT JOIN wp_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_stock'
WHERE p.post_type = 'product' AND p.post_status = 'publish'
LIMIT 12 OFFSET 0
```

### Cache stratégies

- **Cache page** : 1 heure (changements filtres invalident)
- **Cache requête** : 30 minutes
- **Cache objet** : Memcached (Redis)
- **CDN** : Images optimisées (WebP, avif)

### Chargement progressif

- Images en `lazy-loading` (Intersection Observer)
- Données de pagination en AJAX
- Avis clients chargés à la demande

## 3.3 SEO catalogue

### URLs structurées

```
Catalogue: /boutique/
Catégorie: /boutique/{category-slug}/
Produit: /boutique/{category-slug}/{product-slug}/
Filtrés: /boutique/?filter_price=0-50&filter_brand=xyz
```

### Schema.org pour grille

```json
{
  "@context": "schema.org",
  "@type": "CollectionPage",
  "name": "Viandes fraîches",
  "description": "...",
  "url": "https://domain.com/boutique/",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": { "Product" }
      }
    ]
  }
}
```

---

# 4. Fiche Produit Premium

## 4.1 Layout de la fiche

### Desktop (2 colonnes)

```
┌────────────────────────┬──────────────────────┐
│ COLONNE GAUCHE         │ COLONNE DROITE       │
│ (Images)               │ (Infos produit)      │
│                        │                      │
│ ┌──────────────────┐   │ Titre                │
│ │ Image principale │   │ ⭐⭐⭐⭐⭐ (150)      │
│ │ (600x600)        │   │ Prix : 45€           │
│ │                  │   │                      │
│ │ [Zoom]           │   │ Sélecteurs           │
│ └──────────────────┘   │ ├─ Type coupe ▼      │
│                        │ ├─ Poids ▼           │
│ Galerie miniatures     │ └─ Quantité          │
│ [img][img][img]...     │                      │
│                        │ Stock : 12 unités ✓  │
│                        │                      │
│                        │ Bouton "Ajouter"     │
│                        │ Bouton "Acheter"     │
│                        │                      │
│                        │ ♥ Wishlist           │
│                        │ 👁 Comparer          │
│                        │ 🔗 Partager          │
│                        │                      │
│                        │ ┌──────────────────┐ │
│                        │ │ Livraison rapide │ │
│                        │ │ Garantie qualité │ │
│                        │ │ Retour 30j       │ │
│                        │ └──────────────────┘ │
└────────────────────────┴──────────────────────┘
```

### Contenu bas page

```
┌──────────────────────────────────────┐
│ TABS / ACCORDÉON                     │
├──────────────────────────────────────┤
│ [Description] [Spécifications]       │
│ [Conseils] [Avis] [Q&R]              │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ PRODUITS RECOMMANDÉS (4 items)       │
├──────────────────────────────────────┤
│ "Complétez votre commande"           │
│ [Prod1] [Prod2] [Prod3] [Prod4]      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ PRODUITS SIMILAIRES (4 items)        │
├──────────────────────────────────────┤
│ "Vous aimerez aussi..."              │
│ [Prod1] [Prod2] [Prod3] [Prod4]      │
└──────────────────────────────────────┘
```

## 4.2 Galerie produit

### Images

**Résolution**
- Image principale : 1200x1200px (WebP + JPEG)
- Miniatures : 200x200px
- Zoom : 2000x2000px (optionnel)

**Galerie**
- Min 1 image, max 10
- Ordre configurable
- Alt text pour SEO

### Vidéo produit

**Format**
- MP4 ou WebM
- Durée max 30s (autoplay muted)
- Résolution min 1080p
- Affichage : avant/après diaporama

### Zoom produit

**Technologie**
- Zoom jQuery (hover desktop) ou Lightbox
- Tactile-friendly (pinch zoom mobile)
- Loupe suivant souris (desktop)

## 4.3 Variations produit

### Sélecteurs

**Types de sélecteur**
```
Dropdown (Select) : Type coupe
  [-- Sélectionnez --▼]
  
Boutons radiaux : Poids
  [250g] [500g] [750g] [1kg]

Couleur (Swatches) : Couleur
  [■ Rouge] [■ Bleu] [■ Vert]
```

### Logique de mise à jour

```JavaScript
Utilisateur change variation
  ↓
AJAX requête → récupère données variation
  ├─ Nouveau prix (si différent)
  ├─ Stock mis à jour
  ├─ Images réactualisées
  └─ SKU affiché
  
Affichage sans rechargement page
```

### Gestion stock par variation

- Affichage stock global ou par variation
- Texte "Seulement 3 unités restantes" si < 5
- Désactiver sélecteur si rupture de stock
- Message "Rupture de stock" visible

## 4.4 Prix et promotions

### Affichage prix

```
Prix normal : 50€
├─ Aucun badge

Prix promotionnel : 45€
├─ Prix barré : 50€
├─ Prix promo : 45€ (en rouge)
└─ Badge : "-10%"

Variations de prix
├─ Affichage du prix minimum : "À partir de 25€"
└─ Sélection → prix final affiché
```

### Badges promo

| Badge | Condition | Durée |
|---|---|---|
| Nouveau | Produit < 30j | Automatique |
| Promotion | Prix promo actif | Variable |
| Flash | Offre limitée | Countdown |
| Liquidation | Stock bas | < 5 unités |

## 4.5 Boutons d'action

### "Ajouter au panier"

**Comportement**
- Clic → animation (produit glisse vers panier)
- Notification toast "Produit ajouté ✓"
- Mise à jour compteur panier
- Continue shopping (reste sur page)

### "Acheter maintenant"

**Comportement**
- Clic → redirection checkout
- Rempli avec le produit sélectionné
- Quantité : celle saisie

### "Wishlist" (♥)

**Comportement**
- Non-connecté : "Veuillez vous connecter"
- Connecté : Ajout instantané, cœur rouge
- Clic → retrait de la wishlist

### "Comparer" (👁)

**Comportement**
- Ajoute produit au comparateur
- Affiche nombre produits comparés
- Lien accès page comparateur

### "Partager" (🔗)

**Options**
- Email
- Facebook
- Twitter
- Pinterest
- Copier lien

## 4.6 Sections d'information

### Tabs / Accordéon

```
Tab 1 : Description
├─ Texte long
├─ Listes à puces
└─ Formatage riche (HTML)

Tab 2 : Spécifications techniques
├─ Tableau attributs
├─ Poids, dimensions, etc.
└─ Certifications

Tab 3 : Conseils d'utilisation
├─ Cuisson recommandée
├─ Conservation
└─ Portions

Tab 4 : Avis clients
├─ Filtrage par note
├─ Tri chronologique
├─ Formulaire dépôt avis (connecté)
└─ Pagination avis (10 par page)

Tab 5 : Questions / Réponses
├─ Formulaire poser question (connecté)
├─ Réponses du vendeur
└─ Pagination Q&R
```

## 4.7 Avis clients

### Affichage avis

**Synthèse**
```
⭐⭐⭐⭐⭐ 4.5/5 (150 avis)
└─ Barre progression
   ├─ 5⭐ ███████░░ 75%
   ├─ 4⭐ ██░░░░░░░ 15%
   ├─ 3⭐ ░░░░░░░░░░ 5%
   ├─ 2⭐ ░░░░░░░░░░ 3%
   └─ 1⭐ ░░░░░░░░░░ 2%
```

**Chaque avis**
```
⭐⭐⭐⭐ Marc D. - 15 juin 2026
"Très satisfait de cet achat, produit conforme,
fraîcheur impeccable. Je recommande !"

✓ Achat vérifié | Utile (12) | Non utile (1)
```

### Modération des avis

- Avis après achat vérifié obligatoire
- Modération admin (approuver/rejeter spam)
- Filtrage mots clés non-autorisés
- Avis < 2⭐ nécessitent approbation prioritaire

## 4.8 SEO fiche produit

### Balises essentielles

```HTML
<title>Entrecôte de Bœuf 500g - Frais & Traçable | Boucherie</title>
<meta name="description" content="Découvrez notre entrecôte 500g, viande premium garantie fraîche. Livraison 24-48h. ✓ Traçabilité complète">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
<meta property="og:price:amount" content="45.00">
<meta property="og:price:currency" content="EUR">
```

### Schema.org Product

```json
{
  "@context": "schema.org/",
  "@type": "Product",
  "name": "Entrecôte de Bœuf 500g",
  "description": "...",
  "image": ["https://...image1.jpg", ...],
  "brand": {"@type": "Brand", "name": "..."},
  "offers": {
    "@type": "Offer",
    "url": "https://...product",
    "priceCurrency": "EUR",
    "price": "45.00",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {"@type": "Organization", "name": "..."}
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "150"
  }
}
```

### URL structure

```
/boutique/viande-rouge/entrecote-boeuf-500g/
```

- SEO-friendly slug
- Hiérarchie catégorie visible
- Permalink immutable

### Internal linking

- "Produits similaires" (même catégorie)
- "Produits complémentaires"
- Breadcrumbs (catégories)
- Related posts blog (si pertinent)

---

# 5. Panier Avancé

## 5.1 Interface du panier

### Vue panier (page dédiée)

```
┌─────────────────────────────────┐
│ MON PANIER                      │
├─────────────────────────────────┤
│ Article 1 | Quantité | Prix     │
│ Entrecôte 500g | 2 | 90€        │
│ [Modifier: 1 ▼] [Supprimer ✕]   │
├─────────────────────────────────┤
│ Article 2 | Quantité | Prix     │
│ Rumsteck 750g | 1 | 65€         │
│ [Modifier: 2 ▼] [Supprimer ✕]   │
├─────────────────────────────────┤
│ RÉSUMÉ DE COMMANDE              │
│ Sous-total : 155€               │
│ Livraison : 8€                  │
│ Code promo : [________]         │
│ Réduction : -10€                │
├─────────────────────────────────┤
│ TOTAL : 153€                    │
│                                 │
│ [Continuer shopping] [Commander]│
└─────────────────────────────────┘
```

### Widget mini-panier (Sidebar)

```
┌──────────────────┐
│ Panier (3 items) │
│ 153€             │
├──────────────────┤
│ Entrecôte x2     │
│ 90€              │
├──────────────────┤
│ Rumsteck x1      │
│ 65€              │
├──────────────────┤
│ [Voir panier]    │
│ [Commander]      │
└──────────────────┘
```

## 5.2 Modification du panier

### Quantité

**Modificateur**
```
[-] [1] [+]  Ou  Input numérique "Quantité: 1"
```

**Validation**
- Min : 1
- Max : stock disponible
- Mise à jour auto (AJAX)
- Recalcul total instantané

### Suppression article

- Bouton "Supprimer" ou icon ✕
- Confirmation : "Êtes-vous sûr ?"
- Retrait instantané du panier

## 5.3 Codes promo

### Saisie coupon

**Interface**
```
Code promo : [___________] [Appliquer]
```

**Validation**
```
Code inexistant
  → Erreur : "Code invalide ou expiré"
  
Code valide
  → ✓ Réduction appliquée
  → Affichage montant économisé
  → Option supprimer coupon (✕)
```

### Types de coupon

| Type | Exemple | Calcul |
|---|---|---|
| Montant fixe | 10€ | Total - 10€ |
| Pourcentage | -10% | Total × 0.9 |
| Livraison gratuite | Livraison 0€ | Frais - Frais |
| Lot (min 3) | -20% si 3+ items | Conditionnel |

### Limites coupon

```
Max utilisations : 100
Utilisé : 45 fois
Reste : 55

Montant minimum : 50€
Catégories valides : Bœuf, Veau
Utilisateurs : Premiers achetats seulement
Valide jusqu'au : 30 juin 2026
```

## 5.4 Estimation livraison

### Calcul dynamique

**Saisie adresse**
```
Code postal : [___________]
Sélectionner : [Livraison à domicile ▼]
               [Click & Collect]
```

**Affichage frais**
```
Livraison standard (3-5j) : 8€
Livraison express (24-48h) : 15€
Retrait boutique (gratuit) : 0€
```

### Calcul règles

```
Panier < 50€ → Frais 8€
50€ ≤ Panier < 100€ → Frais 5€
Panier ≥ 100€ → Gratuit
```

## 5.5 Produits recommandés (Panier)

**Section** : "Complétez votre commande"

**Produits**
- Non présents au panier
- Compatibles avec items actuels
- 4 items affichés
- "Ajouter au panier" direct

**Exemple**
```
Achat : Entrecôte
Recommandé : Sauce béarnaise, Sel de Guérande, Épices
```

## 5.6 Règles métier du panier

| Règle | Valeur | Condition |
|---|---|---|
| Quantité min article | 1 | Toujours |
| Stock réservé après ajout | 1 heure | Panier actif |
| Abandon panier | 24h | Auto-suppression |
| Coupon stackable | Non | Un seul coupon |
| Modification promo | Oui | Avant commande |
| Recalcul livraison | Auto | Changement adresse |

---

# 6. Checkout Professionnel

## 6.1 Architecture checkout

### Étapes (One-page)

```
┌─────────────────────────────┐
│ ÉTAPE 1 : IDENTIFICATION    │
│ ├─ Connecté ? Oui / Non     │
│ ├─ Créer compte / Invité     │
│ └─ Email de contact         │
├─────────────────────────────┤
│ ÉTAPE 2 : ADRESSE           │
│ ├─ Adresse livraison        │
│ ├─ Adresse facturation      │
│ └─ Sauvegarder pour après   │
├─────────────────────────────┤
│ ÉTAPE 3 : LIVRAISON         │
│ ├─ Mode livraison           │
│ │  [Domicile] [Click&Co]    │
│ ├─ Délai / Créneau          │
│ └─ Frais calculés           │
├─────────────────────────────┤
│ ÉTAPE 4 : PAIEMENT          │
│ ├─ Sélectionner mode        │
│ │  [Carte] [PayPal] [Virement]
│ ├─ Remplir coordonnées      │
│ └─ 3D Secure si nécessaire  │
├─────────────────────────────┤
│ ÉTAPE 5 : CONFIRMATION      │
│ ├─ Récapitulatif commande   │
│ ├─ CGV acceptées            │
│ └─ Bouton "Confirmer"       │
└─────────────────────────────┘

RÉSUMÉ PANIER (Sticky right)
├─ Articles
├─ Sous-total
├─ Frais livraison
├─ Réduction
└─ TOTAL
```

## 6.2 Identification

### Utilisateur non-connecté

**Options**
```
[✓] Se connecter
[✓] Créer un compte
[✓] Commander en invité
```

**Connexion**
```
Email : [__________]
Mot de passe : [__________]
[Oublié mon mot de passe]

[Se connecter]
```

**Inscription rapide**
```
Email : [__________]
Mot de passe : [__________]
Confirmer : [__________]
Consentir RGPD : [✓]

[S'inscrire]
```

**Commande invité**
```
Email (contact) : [__________]
[Continuer en invité]
```

## 6.3 Adresses

### Adresse de livraison

**Formulaire**
```
Genre : [-- Sélectionnez --▼]
Prénom : [__________]
Nom : [__________]
Entreprise : [__________] (optionnel)
Adresse : [__________]
Complément : [__________] (optionnel)
Code postal : [__________]
Ville : [__________]
Pays : [France▼]
Téléphone : [__________]

[✓] Utiliser comme adresse facturation
[✓] Sauvegarder cette adresse
```

**Validation**
- Email valide (regex + vérification)
- Code postal existant
- Format téléphone

**Adresses existantes** (si connecté)
```
[✓] Adresse précédente : 123 rue X, 75000
[  ] Ajouter nouvelle adresse
```

### Adresse facturation

- Identique livraison (coché par défaut)
- Ou saisie/sélection manuelle

## 6.4 Livraison

### Modes de livraison

**Option 1 : Livraison à domicile**
```
[✓] Livraison standard (3-5j) : 8€
[  ] Livraison express (24-48h) : 15€
[  ] Livraison J+1 (24h) : 22€
```

**Option 2 : Click & Collect**
```
[  ] Retrait en boutique

Sélectionnez créneau :
[10-12h samedi 22/6] [14-16h samedi 22/6]
[09-11h lundi 24/6]  [16-18h lundi 24/6]

Gratuit - Retrait à partir de ...
```

**Affichage frais**
- Recalcul automatique selon mode sélectionné
- Affichage nouveau total

## 6.5 Modes de paiement

### Intégrations paiement

**Prévus selon contexte Africain/Afrique de l'Ouest**

| Mode | Technologie | Frais | Délai |
|---|---|---|---|
| **Carte bancaire** | Stripe / PayPal | 1.5% | Instantané |
| **Wave** (Sénégal) | Wave API | 0% (interne) | Instantané |
| **Orange Money** (Orange) | OM API | 1% | Instantané |
| **Free Money** | Free API | 1% | Instantané |
| **PayPal** | PayPal Commerce | 2% | Instantané |
| **Virement bancaire** | Manuel | 0% | 24-48h |

### Sélection paiement

```
Choisir un mode de paiement :

[✓] Carte bancaire
    Numéro : [__ __ __ __] [__ __ __ __]
    Expir. : [__/__]  CVV : [___]

[  ] Wave (Sénégal)
[  ] Orange Money
[  ] Free Money
[  ] PayPal
[  ] Virement bancaire
```

### Sécurité 3D Secure

- Activation automatique si montant > seuil
- Redirection bank 3D Secure
- Retour page confirmation

## 6.6 Validation formulaire

### Règles validation

```
Email : Format valide + vérification uniqueness
Prénom/Nom : Min 2 caractères
Code postal : Existant dans base zones livraison
Téléphone : Format valide (regex pays)
Numéro carte : Checksum Luhn
CVV : 3-4 chiffres
```

### Messages d'erreur

```
✕ Email invalide ou déjà utilisé
✕ Code postal non desservi
✕ Téléphone invalide
✕ Veuillez sélectionner un mode de livraison
```

## 6.7 Récapitulatif & confirmation

### Avant paiement

```
┌─────────────────────────────┐
│ VÉRIFIEZ VOS INFORMATIONS   │
├─────────────────────────────┤
│ ✓ Identification            │
│   Email : client@example.com│
│                             │
│ ✓ Livraison                 │
│   123 rue X, 75000          │
│   Livraison express 24-48h  │
│                             │
│ ✓ Paiement                  │
│   Carte bancaire            │
│   ••••••••••••4242          │
│                             │
│ ✓ J'accepte les CGV         │
│ [✓] Sauvegarder mes données │
│                             │
│ [Annuler] [Confirmer]       │
└─────────────────────────────┘
```

### Après confirmation

**Page succès**
```
✓ COMMANDE CONFIRMÉE !
N° commande : #CMD-2026-001234
Email de confirmation envoyé à client@example.com

Statut : En attente de paiement
Livraison prévue : Mercredi 24 juin

[Voir ma commande] [Continuer shopping]
```

**Email confirmation**
- Récapitulatif commande
- Instructions paiement
- Numéro suivi
- Lien account

---

# 7. Espace Client

## 7.1 Tableau de bord

### Vue d'ensemble

```
┌──────────────────────────────────┐
│ BONJOUR JEAN                     │
├──────────────────────────────────┤
│ Commandes en cours : 1           │
│ Commandes complétées : 23        │
│ Points de fidélité : 345 pts     │
│ Wishlist : 5 produits            │
├──────────────────────────────────┤
│ DERNIERS ACHATS                  │
│ CMD-2026-001234                  │
│ └─ 3 articles | 153€ | En cours  │
│ CMD-2026-001233                  │
│ └─ 2 articles | 98€ | Livré      │
├──────────────────────────────────┤
│ ACTIONS RAPIDES                  │
│ [Historique complet]             │
│ [Mes adresses]                   │
│ [Wishlist]                       │
│ [Retours]                        │
└──────────────────────────────────┘
```

## 7.2 Historique commandes

### Tableau commandes

| N° Commande | Date | Montant | Statut | Actions |
|---|---|---|---|---|
| #CMD-001234 | 20/06/2026 | 153€ | En cours | [Voir] [Suivi] |
| #CMD-001233 | 18/06/2026 | 98€ | Livré | [Voir] [Facture] |
| #CMD-001232 | 15/06/2026 | 210€ | Livré | [Voir] [Facture] |

### Détail commande

```
Commande #CMD-001234
Date : 20 juin 2026

Articles
├─ Entrecôte 500g x2 : 90€
└─ Rumsteck 750g x1 : 65€

Montants
├─ Sous-total : 155€
├─ Livraison : 8€
├─ Réduction : -10€
└─ Total : 153€

Adresse livraison
└─ 123 rue X, 75000 Paris

Statut
└─ En attente de paiement

[Annuler commande] [Modifier]
```

## 7.3 Suivi commande

### Timeline suivi

```
✓ COMMANDE PASSÉE - 20/06 14:30
  Votre commande est confirmée

→ EN ATTENTE DE PAIEMENT - 20/06
  Paiement en cours de vérification

→ EN PRÉPARATION - 21/06 09:00
  L'équipe prépare votre colis

→ EXPÉDIÉE - 21/06 15:30
  Numéro suivi : FR123456789

  Transporteur : TNT
  Estim. livraison : 23/06 17:00
  [Suivre en temps réel]

→ LIVRÉE - (En cours)
```

## 7.4 Adresses

### Gestion adresses

**Affichage**
```
Adresse par défaut
└─ 123 rue X, 75000 Paris
   [Modifier] [Supprimer]

Autres adresses
└─ 456 avenue Y, 13000 Marseille
   [Modifier] [Supprimer]

[+ Ajouter nouvelle adresse]
```

**Formulaire ajout**
```
Genre : [Mademoiselle▼]
Prénom : [__________]
Nom : [__________]
Adresse : [__________]
Complément : [__________]
Code postal : [__________]
Ville : [__________]

[Enregistrer]
```

## 7.5 Wishlist

### Gestion wishlist

**Affichage**
```
Wishlist (5 produits)

Article 1 : Entrecôte premium
├─ Ancien prix : 45€
├─ Prix actuel : 42€ (promo !)
└─ [Ajouter panier] [✕ Retirer]

Article 2 : Rumsteck
├─ Prix : 65€
├─ Stock : ✓ En stock
└─ [Ajouter panier] [✕ Retirer]

[Partager wishlist]
```

**Partage**
```
Lien : https://domain.com/wishlist/abc123
QR Code : [image]
Email : [__________] [Envoyer]
```

## 7.6 Retours produits

### Initier retour

**Conditions**
```
Délai : 30 jours après achat
Raison :
[  ] Produit non conforme
[  ] Produit endommagé
[  ] Produit défectueux
[  ] Insatisfaction
[  ] Autre : [__________]

[Demander retour]
```

**Après demande**
```
✓ Demande retour acceptée
Numéro : #RET-001234

Étapes :
1. Imprimer étiquette retour
2. Emballer produit
3. Déposer à point relais (30j)
4. Remboursement après vérification

[Télécharger étiquette]
[Imprimer instructions]
```

## 7.7 Réclamations & Support

### Support client

**Contact**
```
Chat en direct : Disponible
Email support : support@domain.com
Téléphone : +33 1 XX XX XX XX
FAQ : [Consulter]
```

**Ticket support**
```
Créer ticket
Sujet : [Problème produit]
Message : [__________]
Priorité : [Normale▼]

[Créer ticket]

Mes tickets
├─ #TKT-001 : Ouvert
└─ #TKT-002 : Résolu
```

---

# 8. Back Office Administrateur

## 8.1 Dashboard administration

### Vue principale

```
┌──────────────────────────────────────────┐
│ TABLEAU DE BORD ADMINISTRATEUR           │
├──────────────────────────────────────────┤
│ STATISTIQUES RAPIDES (Today)             │
│ ├─ Commandes : 15 | +20% vs hier         │
│ ├─ Chiffre affaires : 4,250€ | +15%      │
│ ├─ Nouveaux clients : 3                  │
│ └─ Taux de conversion : 3.2%             │
├──────────────────────────────────────────┤
│ GRAPHIQUES                               │
│ ├─ Ventes (7j) : [Graphique ligne]       │
│ ├─ Produits best-sellers : [Top 5]       │
│ ├─ Taux d'abandon panier : [%]           │
│ └─ Satisfaction clients : [Note]         │
├──────────────────────────────────────────┤
│ ACTIONS RAPIDES                          │
│ [+ Nouveau produit] [Voir commandes]     │
│ [Gérer promotions] [Voir stock bas]      │
└──────────────────────────────────────────┘
```

## 8.2 Gestion produits

### Interface produits

**Liste produits**
```
Filtres : [Catégorie▼] [Stock▼] [Promo▼]
Recherche : [__________]

| Produit | Catégorie | Prix | Stock | Statut |
|---------|-----------|------|-------|--------|
| Entrecôte 500g | Bœuf | 45€ | 12 | ✓ Publi |
| Rumsteck 750g | Bœuf | 65€ | 3 | ⚠ Stock bas |
| Filet mignon | Bœuf | 85€ | 0 | ✗ Rupture |

[+ Ajouter] [Importer CSV] [Exporter]
```

**Édition produit**
```
Informations générales
├─ Titre : [Entrecôte 500g]
├─ Slug : [entrecote-500g]
├─ Description courte : [__________]
├─ Description longue : [__________]
├─ Images : [Upload 5 images]
└─ Statut : [Publié▼]

Données produit
├─ Prix : [45.00]
├─ Prix promo : [42.00]
├─ Stock : [12 unités]
├─ SKU : [SKU-001234]
└─ Poids : [0.5 kg]

Catégories & Attributs
├─ Catégorie : [Bœuf]
├─ Tags : [Premium] [Bio]
├─ Attributs :
│  ├─ Type coupe : Entrecôte
│  └─ Origine : Normandie
└─ Variations : [Gérer variations]

[Enregistrer] [Publier]
```

## 8.3 Gestion commandes

### Tableau commandes

**Affichage**
```
| N° Commande | Client | Montant | Statut | Date |
|-------------|--------|---------|--------|------|
| #001234 | Jean D. | 153€ | En cours | 20/06 |
| #001233 | Marie L. | 98€ | Livré | 18/06 |
```

**Détail commande**
```
Commande #001234
Date : 20/06/2026 14:30

Client
├─ Nom : Jean Dupont
├─ Email : jean@example.com
└─ Téléphone : +33 6 XX XX XX XX

Articles
├─ Entrecôte 500g x2 : 90€
└─ Rumsteck 750g x1 : 65€

Paiement
├─ Montant : 153€
├─ Mode : Carte bancaire
├─ Statut : Payé
└─ Transaction : TXN-123456

Livraison
├─ Mode : Express 24-48h
├─ Adresse : 123 rue X, 75000 Paris
├─ Frais : 8€
└─ Suivi : FR123456789

Statut commande
[En attente de paiement] → [En préparation]
                              ↓
                        [Expédiée]
                              ↓
                        [Livrée]

Actions
[Modifier] [Refund] [Marquer comme prête] [Voir facture]
```

## 8.4 Gestion clients

### Tableau clients

**Affichage**
```
| Nom | Email | Commandes | Total dépensé | Inscription |
|-----|-------|-----------|---------------|-------------|
| Jean D. | jean@ex | 5 | 1,250€ | 15/03 |
| Marie L. | marie@ex | 12 | 3,850€ | 10/02 |
```

**Détail client**
```
Profil client
├─ Nom : Jean Dupont
├─ Email : jean@example.com
├─ Téléphone : +33 6 XX XX XX XX
├─ Date inscription : 15/03/2026
└─ Fidélité : 1,250€ dépensés

Commandes (5)
├─ #001234 : 153€ (20/06)
├─ #001233 : 98€ (18/06)
└─ ...

Adresses
├─ Adresse 1 : 123 rue X, 75000
└─ Adresse 2 : 456 avenue Y, 13000

Actions
[Modifier] [Envoyer email] [Ajouter note] [Bloquer]
```

## 8.5 Gestion stocks

### Tableau stocks

**Affichage**
```
| Produit | Stock | Seuil | Status |
|---------|-------|-------|--------|
| Entrecôte | 12 | 5 | ✓ OK |
| Rumsteck | 3 | 5 | ⚠ BAS |
| Filet | 0 | 5 | ✗ RUPTURE |

[Ajuster stock]
```

**Ajustement stock**
```
Produit : Entrecôte 500g
Stock actuel : 12
Nouveau stock : 15
Raison : Réapprovisionnement
Note : Commande fournisseur reçue

[Enregistrer]
```

## 8.6 Gestion promotions

### Coupons

**Liste coupons**
```
| Code | Type | Valeur | Utilisé | Limite | Valide |
|------|------|--------|---------|--------|--------|
| NOEL10 | % | 10% | 45/100 | 100 | ✓ Oui |
| ETE20 | € | 20€ | 32/50 | 50 | ✓ Oui |
| PERDU | € | 15€ | 0/10 | 10 | ✗ Expiré |

[+ Créer coupon] [Exporter]
```

**Création coupon**
```
Code : [PROMO20]
Type : [Pourcentage ▼]
Valeur : [20%]
Montant minimum : [50€]
Max utilisations : [100]
Max par client : [1]
Valide du : [01/07/2026]
Valide jusqu'au : [31/07/2026]
Catégories : [Bœuf, Veau]
Utilisateurs : [Nouveaux clients]

[Créer]
```

### Prix promo produits

**Édition prix promo**
```
Produit : Entrecôte 500g
Prix régulier : 45€
Prix promo : 42€
Promo valide du : [20/06]
Promo valide jusqu'au : [30/06]
Afficher prix barré : [✓]

[Enregistrer]
```

## 8.7 Gestion contenus CMS

**Pages statiques**
```
| Titre | Type | Auteur | Modifier |
|-------|------|--------|----------|
| À propos | Page | Admin | [Éditer] |
| Contact | Page | Admin | [Éditer] |
| CGV | Page | Admin | [Éditer] |
| FAQ | Page | Admin | [Éditer] |

[+ Créer page]
```

**Articles blog**
```
| Titre | Catégorie | Auteur | Date | Statut |
|-------|-----------|--------|------|--------|
| 10 recettes d'été | Recettes | Jean | 18/06 | Publié |
| Guide cuisson | Conseils | Marie | 15/06 | Brouillon |

[+ Créer article]
```

## 8.8 Rapports & Statistiques

### Rapport ventes

**Données**
```
Période : Du 01/06 au 30/06/2026

Ventes
├─ Nombre commandes : 450
├─ Chiffre affaires : 125,450€
├─ Panier moyen : 278€
├─ Montant max : 1,250€
└─ Montant min : 35€

Produits
├─ Produit #1 : Entrecôte (150 ventes)
├─ Produit #2 : Rumsteck (98 ventes)
└─ Produit #3 : Côte (87 ventes)

Clients
├─ Nouveaux : 45
├─ Retours : 405
├─ Taux retention : 90%
└─ Panier abandonné : 150

Paiement
├─ Carte bancaire : 350
├─ PayPal : 80
├─ Wave : 20

[Exporter PDF] [Exporter CSV]
```

### Rapport satisfaction

```
Note moyenne : 4.7 / 5
Nombre avis : 450
Avis positifs (4-5⭐) : 92%
Avis négatifs (1-2⭐) : 2%

Commentaires fréquents :
├─ Produits frais et savoureux
├─ Livraison rapide
├─ Excellent service client
└─ Emballage soigné
```

---

# 9. SEO Stratégique

## 9.1 Structure URL

### Convention URLs

```
Accueil : https://domain.com/
Produit : https://domain.com/boutique/{categorie-slug}/{produit-slug}/
Catégorie : https://domain.com/boutique/{categorie-slug}/
Blog : https://domain.com/blog/
Article : https://domain.com/blog/{article-slug}/
Marque : https://domain.com/marques/{marque-slug}/
Filtré : https://domain.com/boutique/?filter_price=0-50&sort=price
```

### Bonnes pratiques

- URLs **courtes et descriptives**
- **Tirets** pour séparer mots (pas underscore)
- **Minuscules** uniquement
- **Pas de paramètres** si possible (réécriture URL)
- **301 redirects** si changement d'URL

## 9.2 Maillage interne

### Stratégie liens

**Hiérarchie liens**
```
Accueil
├─ Pages principales (À propos, Contact)
├─ Catégories produits
│  └─ Produits
├─ Blog
│  └─ Articles (contexte + anchor text)
└─ Pages légales
```

**Anchor text stratégique**
```
Au lieu de : [Cliquez ici]
Utiliser : [Entrecôte de boeuf premium 500g]
          [Guide complet de cuisson]
          [Nos meilleures ventes]
```

**Liens contextuels**
- Dans contenu produit : "Voir aussi [produits similaires]"
- Dans article blog : "En savoir plus sur [produit connecté]"
- En footer : Liens importants (FAQ, Blog, Contact)

## 9.3 Schema.org & Rich Snippets

### Schema produit (implémentation)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Entrecôte de Bœuf Premium 500g",
  "image": "https://domain.com/img/entrecote.jpg",
  "description": "Entrecôte de bœuf premium certifiée...",
  "brand": {
    "@type": "Brand",
    "name": "Boucherie Premium"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://domain.com/produit/entrecote/",
    "priceCurrency": "EUR",
    "price": "45.00",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Boucherie Premium",
      "url": "https://domain.com"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Excellent produit, très frais!",
      "author": {
        "@type": "Person",
        "name": "Jean D."
      },
      "datePublished": "2026-06-20"
    }
  ]
}
</script>
```

### Schema Organisation

```json
{
  "@context": "https://schema.org/",
  "@type": "Organization",
  "name": "Boucherie Premium",
  "url": "https://domain.com",
  "logo": "https://domain.com/logo.png",
  "description": "Boucherie en ligne spécialisée...",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue X",
    "addressLocality": "Paris",
    "postalCode": "75000",
    "addressCountry": "FR"
  },
  "sameAs": [
    "https://facebook.com/...",
    "https://instagram.com/..."
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+33 1 XX XX XX XX",
    "email": "contact@domain.com"
  }
}
```

### Schema Breadcrumb

```json
{
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://domain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Boutique",
      "item": "https://domain.com/boutique"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Bœuf",
      "item": "https://domain.com/boutique/boeuf"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Entrecôte 500g",
      "item": "https://domain.com/boutique/boeuf/entrecote-500g"
    }
  ]
}
```

## 9.4 Sitemap XML

### Structure sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Pages statiques (priorité haute) -->
  <url>
    <loc>https://domain.com/</loc>
    <lastmod>2026-06-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Catégories -->
  <url>
    <loc>https://domain.com/boutique/boeuf/</loc>
    <lastmod>2026-06-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Produits -->
  <url>
    <loc>https://domain.com/boutique/boeuf/entrecote-500g/</loc>
    <lastmod>2026-06-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://domain.com/img/entrecote.jpg</image:loc>
      <image:title>Entrecôte de Bœuf 500g</image:title>
    </image:image>
  </url>

  <!-- Articles blog -->
  <url>
    <loc>https://domain.com/blog/10-recettes-ete/</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>
```

## 9.5 Open Graph & Meta Tags

### Balises Meta essentielles

```html
<!-- Titre et description -->
<title>Entrecôte de Bœuf Premium 500g | Boucherie En Ligne</title>
<meta name="description" content="Découvrez notre entrecôte premium 500g, viande fraîche certifiée. Livraison 24-48h. ✓ Traçabilité. Acheter en ligne.">
<meta name="keywords" content="entrecôte, bœuf premium, viande fraîche, achat viande, boucherie">

<!-- Viewport responsive -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Canonical (éviter duplicate) -->
<link rel="canonical" href="https://domain.com/boutique/boeuf/entrecote-500g/">

<!-- Open Graph (réseaux sociaux) -->
<meta property="og:title" content="Entrecôte de Bœuf Premium 500g">
<meta property="og:description" content="Découvrez...">
<meta property="og:image" content="https://domain.com/img/entrecote-1200x630.jpg">
<meta property="og:url" content="https://domain.com/boutique/boeuf/entrecote-500g/">
<meta property="og:type" content="product">
<meta property="product:price:amount" content="45.00">
<meta property="product:price:currency" content="EUR">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Entrecôte de Bœuf Premium 500g">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://domain.com/img/entrecote-1200x630.jpg">

<!-- Robots -->
<meta name="robots" content="index, follow">
```

## 9.6 Optimisation Core Web Vitals

### Métriques cibles

| Métrique | Seuil "Bon" | Cible | Mesure |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 2s | Temps affichage contenu principal |
| **FID** (First Input Delay) | < 100ms | < 50ms | Réactivité page |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.05 | Stabilité visuelle |

### Optimisations

**Pour LCP**
- Lazy loading images (LazyLoad)
- Compression CSS/JS
- Preload fonts critiques
- Cache robuste

**Pour FID**
- Dédier moins travail JS main thread
- Web Workers pour tâches lourdes
- Code splitting (charger que nécessaire)

**Pour CLS**
- Tailles images / vidéos fixes
- Éviter inserts DOM dynamiques
- Animations GPU (transform, opacity)

---

# 10. Performance & Optimisation

## 10.1 Cache stratégies

### Cache HTTP

```
Durée cache par type :

Pages statiques (À propos, Contact) → 1 jour
Pages catalogue (filtres) → 2 heures
Fiche produit → 6 heures
Panier/Checkout → 0 (aucun cache)
API → 30 minutes
Images → 1 mois
CSS/JS → 1 mois (versioned)
```

### Cache objet (Memcached/Redis)

```
Cache objets DB :
├─ Posts (produits) → 6h
├─ Post meta → 6h
├─ Taxonomies → 1 jour
├─ Utilisateurs → 2h
├─ Panier utilisateur → 24h
└─ Configurations → 1 semaine
```

### Cache page (Page caching)

```
Full page cache :
├─ Accueil → 1h
├─ Catégories → 2h
├─ Fiches produit → 6h
├─ Pages blog → 1 jour
└─ Pages statiques → 1 semaine

Invalidation :
├─ Produit modifié → invalide sa fiche + catégories
├─ Commande → invalide mon compte
└─ Promotion → invalide accueil
```

## 10.2 CDN (Content Delivery Network)

### Configuration

```
Origine : VPS France (serveur)
          ↓
CDN Points of Presence (POP)
├─ Europe (Paris, Amsterdam, London)
├─ Asie (Singapour, Tokyo)
├─ Afrique (Lagos, Johannesburg)
└─ Amérique (New York, São Paulo)

Fichiers servis via CDN :
├─ Images (JPG, WebP, AVIF)
├─ CSS/JS (minifiés)
├─ Fonts (Google Fonts optimisées)
└─ Vidéos (si applicable)
```

### Règles cache CDN

```
Extension | Type | Cache | Compressé |
|jpg, png, gif | Images | 30j | Oui |
| webp, avif | Images modern | 30j | Non |
| css | Stylesheet | 1m | Oui |
| js | JavaScript | 1m | Oui |
| woff2 | Font | 1a | Non |
| html | Page | 1h | Oui |
| json | API | 30min | Oui |
```

## 10.3 Optimisation images

### Format & compression

```
Desktop 1200px → WebP 200-300KB
Tablet 768px → WebP 100-150KB
Mobile 480px → WebP 50-100KB

+ AVIF (taille -20% vs WebP)
+ JPEG fallback (compatibilité)
```

### Lazy loading

```HTML
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
     data-src="https://domain.com/img/product.webp"
     alt="Produit"
     loading="lazy"
     class="lazyload">

<script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"></script>
```

### Responsive images (srcset)

```HTML
<img src="https://domain.com/img/product-sm.webp"
     srcset="https://domain.com/img/product-sm.webp 480w,
             https://domain.com/img/product-md.webp 768w,
             https://domain.com/img/product-lg.webp 1200w"
     sizes="(max-width: 480px) 100vw,
            (max-width: 768px) 100vw,
            1200px"
     alt="Produit">
```

## 10.4 Optimisation base de données

### Indexes

```SQL
-- Indexes essentiels WooCommerce
CREATE INDEX idx_post_type ON wp_posts(post_type);
CREATE INDEX idx_post_status ON wp_posts(post_status);
CREATE INDEX idx_post_date ON wp_posts(post_date);
CREATE INDEX idx_meta_key ON wp_postmeta(meta_key);
CREATE INDEX idx_meta_value ON wp_postmeta(meta_value(10));
CREATE INDEX idx_term_taxonomy ON wp_term_relationships(term_taxonomy_id);
CREATE INDEX idx_object_id ON wp_term_relationships(object_id);
```

### Optimisation requêtes

```
MAUVAIS :
SELECT * FROM wp_posts WHERE post_type='product';
└─ Récupère TOUS les champs

BON :
SELECT ID, post_title, post_name 
FROM wp_posts 
WHERE post_type='product' 
LIMIT 20 OFFSET 0;
└─ Récupère que champs nécessaires + limite
```

### Base de données

**Configuration**
```
Motor → InnoDB (transactions, locks)
Charset → UTF8MB4 (caractères spéciaux)
Collation → utf8mb4_unicode_ci
Max Connections → 200
Query Cache → DÉSACTIVÉ (Redis à la place)
```

## 10.5 Optimisation WooCommerce

### Configuration

```
Guest Checkout → ACTIVÉ (moins de frictions)
Store Notice → DÉSACTIVÉ (JS supplémentaire)
Product Image Gallery → ACTIVÉ (Slider JS allégé)
Ratings → ACTIVÉ (Important pour conversion)
Stock Notification → ACTIVÉ (Mais ASYNCHRONE)
```

### Plugins de performance

```
Recommandés :
├─ WP Super Cache / W3 Total Cache → Cache page
├─ Autoptimize → Minification CSS/JS
├─ Imagify / ShortPixel → Compression images
├─ WP Redis → Cache objet
├─ Query Monitor → Détecter requêtes lentes
└─ GTmetrix / Lighthouse → Monitoring
```

## 10.6 Sécurité

### HTTPS & SSL

```
Certificate : Let's Encrypt (gratuit + auto-renewal)
Configuration → HSTS enabled
Redirection HTTP → HTTPS

Statut :
GET https://domain.com → 200 OK ✓
GET http://domain.com → 301 → https://domain.com ✓
```

### Pare-feu applicatif (WAF)

```
Règles :
├─ Injection SQL → Bloquer
├─ XSS → Bloquer + log
├─ CSRF → Vérifier token
├─ DDoS → Rate limiting (10 req/sec par IP)
└─ Bot crawling → Vérifier User-Agent
```

### Sauvegardes

```
Fréquence → Quotidienne (00:00 UTC)
Rétention → 30 jours
Destination → Storage externe (AWS S3)
Vérification → Restore test 1/mois
Alertes → Email si sauvegarde échoue
```

---

# 11. Extensions WordPress Recommandées

## 11.1 Extensions e-commerce

| Extension | Type | Payant | Rôle | Priorité |
|---|---|---|---|---|
| **WooCommerce** | Core e-commerce | Gratuit (+ add-ons) | Moteur e-commerce | MUST |
| **WooCommerce Bookings** | Add-on | Payant | Gestion créneaux | Optionnel |
| **Subscriptions for WooCommerce** | Add-on | Payant | Abonnements récurrents | HIGH |
| **Product Add-ons** | Add-on | Payant | Coupons produits | SHOULD |
| **WooCommerce PDF Invoice** | Add-on | Gratuit | Génération factures | HIGH |
| **Yith WooCommerce Wishlist** | Plugin | Gratuit/Payant | Wishlist | HIGH |
| **Yith WooCommerce Compare** | Plugin | Gratuit/Payant | Comparateur | SHOULD |

## 11.2 Extensions performance

| Extension | Rôle | Priorité |
|---|---|---|
| **WP Super Cache** | Cache page | MUST |
| **Autoptimize** | Minification CSS/JS | MUST |
| **Imagify** | Compression images | HIGH |
| **WP Redis** | Cache objet | HIGH |
| **Query Monitor** | Détecter slow queries | Dev only |

## 11.3 Extensions SEO

| Extension | Rôle | Priorité |
|---|---|---|
| **Yoast SEO** | SEO full-stack | MUST |
| **Google Sitemap Generator** | Sitemap XML | HIGH |
| **Rank Math SEO** | Alternative Yoast | Alternative |
| **Schema Pro** | Schema.org avancé | HIGH |

## 11.4 Extensions marketing

| Extension | Rôle | Priorité |
|---|---|---|
| **Email Subscribers** | Newsletter | HIGH |
| **Mailchimp for WordPress** | Intégration Mailchimp | HIGH |
| **WP Forms** | Formulaires contact | SHOULD |
| **MonsterInsights** | Google Analytics | HIGH |
| **Facebook for WooCommerce** | Pixel Facebook | SHOULD |

## 11.5 Extensions modération contenu

| Extension | Rôle | Priorité |
|---|---|---|
| **Akismet** | Anti-spam | MUST |
| **WP-SpamShield** | Spam avancé | SHOULD |
| **GDPR Compliance** | Conformité RGPD | MUST |

---

# 12. Architecture Technique

## 12.1 Infrastructure recommandée

### Option 1 : VPS Hostinger (PME)

```
Hébergement : VPS Hostinger
├─ CPU : 4 cores (Intel Xeon)
├─ RAM : 8 GB
├─ Stockage : 160 GB SSD
├─ Bande passante : Illimitée
└─ Prix : ~30€/mois

Performance estimée
├─ 10,000+ visiteurs/jour
├─ 500 commandes/jour
└─ Jusqu'à 5,000 produits
```

### Option 2 : Cloud AWS/Azure (Scalabilité)

```
Architecture cloud-native
├─ EC2 (Serveur web) : t3.medium (Auto-scaling)
├─ RDS (Base de données) : db.t3.small (Multi-AZ)
├─ ElastiCache (Redis) : cache.t3.micro
├─ CloudFront (CDN) : Distribution globale
├─ S3 (Stockage images) : Backups automatiques
└─ Route53 (DNS) : Failover automatique

Coût estimé : €200-500/mois (scalable)
```

### Option 3 : Docker (Développement & Production)

```docker
services:
  wordpress:
    image: wordpress:latest
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_NAME: boucherie_db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: ****
    ports:
      - "80:80"
    volumes:
      - ./wp-content:/var/www/html/wp-content

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: boucherie_db
      MYSQL_ROOT_PASSWORD: ****
      MYSQL_PASSWORD: ****
      MYSQL_USER: wordpress
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

## 12.2 Stack technique recommandée

```
Frontend
├─ HTML5
├─ CSS3 (SCSS avec BEM)
├─ JavaScript ES6+ (Vanilla + jQuery WooCommerce)
├─ Bootstrap 5 (Responsive)
└─ Webpack (Bundler)

Backend
├─ WordPress 6.x (LTS)
├─ WooCommerce 8.x
├─ PHP 8.2+
└─ MySQL 8.0 / PostgreSQL 14

Services
├─ Redis (Cache objet)
├─ Elasticsearch (Recherche avancée)
├─ RabbitMQ (Queue asynchrone)
└─ Stripe/PayPal API

DevOps
├─ Git (Version control)
├─ Docker (Containerisation)
├─ GitHub Actions (CI/CD)
├─ Nginx (Reverse proxy)
└─ Let's Encrypt (SSL)
```

## 12.3 Configuration serveur

### Nginx (Reverse Proxy)

```nginx
upstream wordpress_backend {
  server app:80;
}

server {
  listen 80;
  server_name _;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  server_name domain.com www.domain.com;

  ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;

  # Gzip compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml;
  gzip_min_length 1000;

  # Cache headers
  location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # WordPress
  location / {
    proxy_pass http://wordpress_backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # Security
  location ~ /\. { deny all; }
  location ~ ~$ { deny all; }
}
```

### PHP Configuration (php.ini)

```ini
; Performance
max_execution_time = 300
max_input_time = 300
memory_limit = 256M
post_max_size = 128M
upload_max_filesize = 128M
default_socket_timeout = 60

; Sécurité
display_errors = Off
log_errors = On
error_reporting = E_ALL
expose_php = Off
allow_url_include = Off
allow_url_fopen = On

; Sessions
session.cookie_httponly = On
session.cookie_secure = On
session.cookie_samesite = Lax
```

### MySQL Configuration

```ini
[mysqld]
; Performance
max_connections = 200
max_allowed_packet = 256M
innodb_buffer_pool_size = 4G
innodb_log_file_size = 512M
query_cache_size = 0
query_cache_type = 0

; Sécurité
skip_name_resolve
sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'
```

---

# 13. Roadmap de Développement

## 13.1 Phases du projet

### Phase 1 : Fondation (Semaines 1-2)

**Objectif** : Infrastructure de base prête

**Tâches**
- Installation WordPress + WooCommerce
- Configuration de base (devise, zone livraison)
- Thème child créé
- Pages statiques (À propos, Contact, CGV, Politique)
- Header/Footer structuré
- Navigation principale

**Livrable**
- Environnement dev/staging/prod
- Thème de base responsive
- Structure d'information

**Durée** : 2 semaines | Équipe : 1 dev lead

---

### Phase 2 : Catalogue (Semaines 3-5)

**Objectif** : Catalogue administrable et visible

**Tâches**
- Création catégories produits
- Upload produits (100-200 articles)
- Système attributs (coupe, poids, origine)
- Variations produits (tailles/poids)
- Page catalogue avec filtres
- Fiches produits de base

**Livrable**
- Catalogue complet visible
- Filtres dynamiques
- Gestion stock

**Durée** : 3 semaines | Équipe : 1 dev + 1 data entry

---

### Phase 3 : Panier & Commandes (Semaines 6-7)

**Objectif** : Achat possible de bout en bout

**Tâches**
- Panier fonctionnel
- Modification quantités
- Codes promo/coupons
- Page checkout
- Identification utilisateur
- Confirmation commande

**Livrable**
- Cycle d'achat complet
- Commandes stockées en DB
- E-mails confirmation

**Durée** : 2 semaines | Équipe : 1 dev

---

### Phase 4 : Paiements & Livraison (Semaines 8-9)

**Objectif** : Paiements réels intégrés

**Tâches**
- Intégration Stripe (cartes)
- Intégration Wave (Afrique)
- Intégration Orange Money
- Modes livraison (domicile/retrait)
- Calcul frais dynamiques
- Emails de suivi

**Livrable**
- Paiements fonctionnels (test + prod)
- Modes livraison configurés
- Tracking commandes

**Durée** : 2 semaines | Équipe : 1 dev + 1 QA

---

### Phase 5 : Optimisation (Semaines 10-11)

**Objectif** : Performance, SEO, accessibilité

**Tâches**
- Optimisation images
- Mise en cache
- CDN configuré
- SEO on-page (fiches)
- Schema.org implémenté
- Core Web Vitals < 2s
- Sécurité (SSL, WAF)

**Livrable**
- Score Lighthouse > 90
- Temps chargement < 2s
- SEO de base OK

**Durée** : 2 semaines | Équipe : 1 dev + 1 devops

---

### Phase 6 : Mise en production (Semaine 12)

**Objectif** : Site live et stable

**Tâches**
- Plan de migration
- Tests de charge (1000+ visiteurs)
- Recette fonctionnelle complète
- Sauvegardes automatiques
- Monitoring alertes
- Documentation utilisateur
- Formation équipe

**Livrable**
- Site live en production
- Monitoring actif
- Équipe formée

**Durée** : 1 semaine | Équipe : Full

---

## 13.2 Timeline Gantt

```
Semaine     1  2  3  4  5  6  7  8  9 10 11 12
Phase 1     ████
Phase 2        ███████
Phase 3              ████
Phase 4                 ████
Phase 5                    ████
Phase 6                       ████

Avec chevauchements possibles
```

## 13.3 Ressources nécessaires

**Équipe**
- 1 Chef de projet (full-time)
- 2 Développeurs PHP/WordPress (full-time)
- 1 Développeur Frontend (React/Vue, part-time)
- 1 Designer UX/UI (part-time)
- 1 Data Entry (part-time, 2-3 semaines)
- 1 DevOps (part-time)
- 1 QA/Testeur (part-time)

**Outils**
- Git (GitHub/GitLab)
- CI/CD (GitHub Actions)
- Figma (pour maquettes)
- Jira/Asana (gestion projet)
- Docker + Docker Compose
- Postman (API testing)

---

## Conclusion

Cette architecture est conçue pour :

✅ **Scalabilité** : Gérer croissance du trafic et du catalogue  
✅ **Performance** : Temps de chargement < 2s  
✅ **SEO** : Positionnement organique optimisé  
✅ **Conversion** : UX/UI orienté achat  
✅ **Maintenance** : Code clean, extensible  
✅ **Sécurité** : Conformité RGPD, SSL, WAF  
✅ **Support** : Documentation complète  

Le projet est prêt à démarrer ! 🚀

---

**Document** : Architecture E-Commerce Premium  
**Révision** : 1.0  
**Date** : 2026-06-19  
**Auteur** : Architecture Expert
