# Cahier des charges développeur
## Site e-commerce premium — Boucherie en ligne sous WooCommerce / WordPress

---

## 1. Résumé exécutif

Le projet consiste à transformer une **maquette Figma existante** en un **site e-commerce premium** pour une **boucherie en ligne**, développé sous **WordPress + WooCommerce**.

Le site devra permettre :
- la consultation d’un **catalogue de produits**,
- la visualisation de **fiches produit détaillées**,
- l’ajout au **panier**,
- un **tunnel de commande complet**,
- le **paiement en ligne**,
- la gestion de la **livraison** et du **click & collect**,
- la souscription à un **abonnement colis viande**,
- la création et gestion d’un **compte client**,
- l’affichage et la gestion d’**avis clients**.

L’univers de marque est **premium**, **haut de gamme**, **rassurant**, avec une identité visuelle **rouge / noir / blanc**.  
Le site doit être **responsive**, cohérent avec la maquette desktop et mobile, et orienté **conversion**.

---

## 2. Contexte du projet

La marque souhaite proposer une expérience digitale premium, reflétant :
- la qualité des produits,
- le savoir-faire boucher,
- la fraîcheur,
- la confiance,
- la simplicité de commande.

Le site ne doit pas évoquer un univers discount ou “supermarché”, mais un positionnement :
- artisanal,
- expert,
- gastronomique,
- moderne,
- fluide.

Une **maquette Figma existe déjà** et servira de référence principale pour l’intégration front-end.  
Le présent document cadre les besoins fonctionnels, techniques et UX avant lancement du développement.

---

## 3. Objectifs du projet

### 3.1 Objectifs business
- Vendre des produits de boucherie en ligne.
- Générer des commandes en livraison et en click & collect.
- Augmenter le panier moyen.
- Développer les ventes récurrentes via l’abonnement colis viande.
- Rassurer les clients sur la qualité, l’origine et la fraîcheur.
- Fidéliser via le compte client et les avis.

### 3.2 Objectifs UX
- Offrir un parcours d’achat clair et premium.
- Réduire les frictions jusqu’au paiement.
- Rendre les informations logistiques très lisibles.
- Garantir une navigation fluide sur mobile.

### 3.3 Objectifs techniques
- Disposer d’un site administrable simplement via WordPress.
- Permettre l’évolution future du catalogue et des offres.
- Assurer de bonnes performances, sécurité et conformité.

---

## 4. Cibles utilisateurs

### 4.1 Cible principale
Clients particuliers recherchant de la viande de qualité, avec sensibilité à :
- l’origine,
- la traçabilité,
- la qualité premium,
- la praticité de commande.

### 4.2 Cibles secondaires
- familles,
- amateurs de cuisine / barbecue,
- clients réguliers,
- clients intéressés par des colis récurrents,
- consommateurs souhaitant retrait boutique ou livraison à domicile.

---

## 5. Périmètre du projet

## 5.1 Inclus dans le périmètre
- intégration de la maquette Figma en thème WordPress/WooCommerce,
- responsive desktop + mobile,
- catalogue produits,
- fiches produit,
- panier,
- tunnel de commande,
- paiement en ligne,
- livraison,
- click & collect,
- abonnements colis viande,
- compte client,
- avis clients,
- back-office WooCommerce,
- SEO technique de base,
- conformité RGPD de base,
- analytics de base,
- recette fonctionnelle.

## 5.2 Hors périmètre initial
Sauf validation complémentaire :
- ERP / caisse magasin / stock unifié avancé,
- PIM,
- marketplace multi-vendeur,
- application mobile native,
- programme de fidélité complexe,
- facturation B2B avancée,
- multilingue,
- multi-boutique,
- automatisations CRM complexes.

---

## 6. Périmètre fonctionnel attendu

### MUST
- catalogue produits
- fiches produit
- panier
- checkout
- paiement
- livraison
- click & collect
- compte client
- avis clients
- responsive mobile
- back-office administrable
- abonnement colis viande

### SHOULD
- coupons promotionnels
- suggestions produits
- filtres avancés catalogue
- FAQ
- recherche produits
- relance panier abandonné via solution tierce

### NICE TO HAVE
- wishlist
- programme fidélité
- cartes cadeaux
- blog / recettes
- géolocalisation livraison avancée
- abonnement cadeau

---

## 7. Arborescence du site

Arborescence minimale recommandée :

- Accueil
- Boutique / Catalogue
  - Bœuf
  - Veau
  - Agneau
  - Volaille
  - Colis viande
  - Promotions
- Fiche produit
- Abonnement colis viande
- Panier
- Commande / Checkout
- Mon compte
  - Connexion / inscription
  - Mes commandes
  - Mes adresses
  - Mes abonnements
  - Mes avis
  - Mes moyens de paiement si extension retenue
- À propos / savoir-faire
- Livraison & click & collect
- FAQ
- Contact
- Mentions légales
- CGV
- Politique de confidentialité
- Gestion des cookies

---

## 8. Spécifications fonctionnelles par page

# 8.1 Page d’accueil

## Objectif
Présenter la marque, rassurer, valoriser l’offre et orienter rapidement vers l’achat.

## Contenus attendus
- bandeau d’annonce
- header avec navigation
- hero principal
- blocs de réassurance
- catégories produit
- produits phares
- promotions
- mise en avant abonnement
- avis clients
- bloc livraison / click & collect
- bloc savoir-faire
- footer

## Exigences
- CTA visibles vers boutique, colis, promotions
- panier accessible à tout moment
- structure cohérente avec la maquette
- temps de chargement optimisé malgré visuels premium

## Critères d’acceptation
- l’utilisateur comprend l’offre en moins de 5 secondes
- accès au catalogue en 1 clic
- les bénéfices logistiques sont visibles sans scroll excessif
- le rendu desktop/mobile respecte les intentions premium

---

# 8.2 Page catalogue

## Objectif
Permettre à l’utilisateur de parcourir et filtrer les produits facilement.

## Fonctionnalités
- affichage grille ou listing
- filtres
- tri
- pagination ou chargement progressif
- badges promo / nouveauté / best-seller
- ajout panier rapide si pertinent

## Filtres possibles
- type de viande
- prix
- poids
- origine
- promotion
- disponibilité
- type de retrait / livraison si nécessaire

## Critères d’acceptation
- filtres fonctionnels sur desktop et mobile
- temps de réponse acceptable
- produits administrables via WooCommerce
- tri correctement appliqué

---

# 8.3 Fiche produit

## Objectif
Déclencher l’ajout au panier en donnant toutes les informations nécessaires.

## Éléments à afficher
- nom produit
- galerie visuelle
- prix
- variation(s) si applicable
- poids / format
- description courte
- description détaillée
- origine / qualité / traçabilité
- disponibilité
- quantité
- bouton ajout au panier
- conseils cuisson / conservation
- avis clients
- produits associés

## Cas de gestion
- produit simple
- produit variable
- produit en rupture
- produit promotionnel
- produit disponible uniquement en click & collect ou livraison

## Critères d’acceptation
- sélection des variations sans bug
- prix mis à jour correctement
- ajout panier opérationnel
- contenu facilement administrable en BO

---

# 8.4 Panier

## Objectif
Permettre une relecture claire de la commande avant paiement.

## Éléments à afficher
- liste des articles
- quantité modifiable
- suppression ligne
- prix unitaire / total ligne
- sous-total
- code promo
- choix logistique
- total final
- CTA vers commande

## Logique
- mise à jour panier sans friction
- recalcul automatique
- prise en compte des promotions
- prise en compte du mode livraison / retrait

## Critères d’acceptation
- modification quantité sans erreur
- total juste
- coupons fonctionnels
- CTA commande visible sur mobile

---

# 8.5 Tunnel de commande / Checkout

## Objectif
Permettre de finaliser l’achat avec un minimum de friction.

## Étapes minimales
- identification / commande invité si validée
- coordonnées
- adresse
- choix livraison ou click & collect
- choix créneau si applicable
- paiement
- confirmation

## Fonctionnalités
- résumé commande
- messages d’erreur explicites
- sécurisation du paiement
- e-mails transactionnels

## Points de vigilance
- compatibilité mobile
- auto-complétion formulaires
- clarté des frais
- clarté du choix retrait / livraison

## Critères d’acceptation
- commande testable de bout en bout
- e-mails de confirmation envoyés
- statut de commande remonté en BO
- paiement correctement journalisé

---

# 8.6 Page abonnement colis viande

## Objectif
Permettre la souscription à des colis récurrents.

## Contenus attendus
- présentation du concept
- formules disponibles
- fréquence
- contenu indicatif
- avantages
- FAQ
- CTA souscription

## Fonctionnalités attendues
- abonnement mensuel / bimensuel / hebdomadaire selon choix futur
- suspension / reprise
- renouvellement automatique si extension retenue
- e-mails de confirmation
- visualisation dans l’espace client

## À valider
- paiement récurrent automatique ou manuel
- engagement minimum ou sans engagement
- personnalisation du contenu colis
- date de prélèvement / expédition

## Critères d’acceptation
- souscription réalisable
- renouvellement compréhensible pour le client
- gestion administrable côté BO
- abonnement visible dans le compte client

---

# 8.7 Compte client

## Fonctionnalités
- création de compte
- connexion / mot de passe oublié
- gestion des adresses
- historique des commandes
- suivi statuts
- gestion abonnement
- dépôt d’avis
- téléchargement factures si prévu

## Critères d’acceptation
- accès simple mobile
- données client modifiables
- commandes consultables
- abonnements consultables

---

# 8.8 Avis clients

## Fonctionnalités
- affichage d’avis sur produits
- notation étoilée
- modération BO
- éventuelle restriction “avis après achat” si extension retenue

## Critères d’acceptation
- affichage propre desktop/mobile
- possibilité de modération
- note moyenne correctement calculée

---

## 9. Exigences UX/UI

Le développement devra respecter la maquette Figma existante.

## Principes attendus
- fidélité visuelle élevée
- rendu premium
- excellente lisibilité
- CTA bien hiérarchisés
- cohérence entre desktop et mobile
- animations discrètes
- design non agressif commercialement

## Responsive
Le site doit être optimisé au minimum pour :
- desktop large
- laptop
- tablette
- mobile

## Accessibilité minimale
- contrastes corrects
- labels de formulaires
- navigation clavier de base
- tailles de zones cliquables correctes
- textes d’erreur explicites

---

## 10. Spécifications WooCommerce

# 10.1 Produits
Le site devra permettre :
- produits simples
- produits variables
- catégories
- étiquettes
- images multiples
- prix barrés / promos
- stock
- poids / dimensions si besoin transport

# 10.2 Promotions
- prix promotionnel
- coupons
- promos par période
- éventuels lots ou colis mis en avant

# 10.3 Stock
- suivi de stock WooCommerce
- seuil d’alerte
- rupture de stock
- possibilité de masquer ou signaler indisponibilité

# 10.4 Taxes
- gestion TVA selon configuration légale applicable
- paramétrage administrable

# 10.5 Expédition
- zones de livraison
- méthodes de livraison
- frais fixes / variables
- click & collect en point de retrait boutique

---

## 11. Paiement en ligne

## Attendus
Le site doit intégrer au moins une solution de paiement en ligne sécurisée.

## Prestataires possibles à valider
- Stripe
- PayPal
- autre PSP compatible WooCommerce

## Exigences
- paiement carte bancaire
- tunnel sécurisé HTTPS
- affichage clair des erreurs
- confirmation commande + paiement
- compatibilité mobile forte

## À valider
- Apple Pay / Google Pay
- paiement en plusieurs fois
- paiement pour abonnement récurrent

---

## 12. Livraison et click & collect

## Livraison
Le site doit permettre :
- configuration de zones desservies
- règles de frais de livraison
- délai indicatif
- informations logistiques visibles

## Click & collect
Le site doit permettre :
- retrait boutique
- choix de mode de retrait
- éventuellement choix de créneau
- instructions retrait dans l’e-mail de confirmation

## À valider
- gestion par code postal
- créneaux horaires
- jours de fermeture
- minimum de commande
- transport réfrigéré affiché en réassurance ou géré métier

---

## 13. Abonnement colis viande

## Objectif
Mettre en place un système d’achat récurrent premium.

## Fonctionnalités attendues
- une ou plusieurs formules
- fréquence configurable
- fiche explicative claire
- souscription en ligne
- gestion dans espace client
- suspension / annulation selon politique retenue
- historique des renouvellements

## Contraintes
- dépendance probable à une extension de type abonnement WooCommerce
- nécessité de compatibilité avec le prestataire de paiement choisi

## À valider
- contenu fixe vs personnalisable
- remise spécifique abonnement
- durée minimale
- date d’exécution
- gestion des modifications avant prochaine échéance

---

## 14. Back-office / administration

## L’équipe doit pouvoir gérer
- pages de contenu
- produits
- catégories
- visuels
- stocks
- prix
- promotions
- commandes
- statuts de commande
- clients
- abonnements
- avis
- zones de livraison
- coupons

## Exigences BO
- interface claire
- rôles séparés si nécessaire
- documentation de prise en main
- éviter les développements qui rendent le BO trop fragile

---

## 15. Rôles et droits

Rôles minimum recommandés :

- **Administrateur** : contrôle complet
- **Gestionnaire boutique** : commandes, produits, clients, coupons
- **Éditeur contenu** : pages, blog éventuel, contenus marketing
- **Service client** : lecture commandes / clients selon besoin

À préciser selon organisation interne.

---

## 16. Contenus à fournir par le client

Le client devra fournir, sauf déjà présents :
- accès à la maquette Figma
- logo
- charte graphique si séparée
- textes légaux
- textes marketing
- catégories catalogue
- fiches produit
- prix
- poids / variantes
- photos produit
- informations livraison
- coordonnées de la boutique
- conditions d’abonnement
- FAQ
- CGV / politique de confidentialité

---

## 17. SEO

## SEO technique minimal
- URLs propres
- balises title
- meta descriptions
- Hn structurés
- sitemap XML
- robots.txt
- redirections si besoin
- optimisation images
- schema.org produit si possible

## SEO on-page
- pages catégories optimisées
- fiches produit avec contenu suffisant
- maillage interne
- pages institutionnelles propres

## À valider
- blog recettes / conseils
- stratégie éditoriale SEO plus large

---

## 18. Performance

## Exigences
- bon score de performance mobile et desktop dans une logique réaliste
- compression images
- lazy loading
- cache
- minification
- hébergement adapté WooCommerce

## Points de vigilance
WooCommerce + visuels premium + abonnements peuvent alourdir le site.  
Le développeur devra proposer une stack performante.

---

## 19. Sécurité

## Exigences
- HTTPS
- mises à jour maîtrisées
- sauvegardes automatiques
- protection brute force
- gestion propre des rôles
- plugins fiables et maintenus
- environnement de préproduction

## Recommandations
- hébergement sécurisé
- WAF/CDN si budget adapté
- journalisation minimale des actions sensibles

---

## 20. RGPD / cookies

## Attendus
- bannière cookies conforme
- consentement traçable selon solution choisie
- politique de confidentialité
- gestion des formulaires conforme
- traitement des données clients sécurisé
- gestion des demandes d’accès / suppression selon process interne

## À valider
- outil CMP retenu
- stockage marketing tiers
- newsletter et double opt-in

---

## 21. Analytics et tracking

## Minimum attendu
- suivi des pages vues
- suivi ajout panier
- suivi démarrage checkout
- suivi achat
- suivi inscriptions compte
- suivi abonnements si possible

## Outils possibles
- Google Analytics 4
- Google Tag Manager
- Meta Pixel si acquisition prévue

## À valider
- plan de taggage détaillé
- dashboards de pilotage

---

## 22. Intégrations tierces potentielles

À cadrer selon budget et besoin :
- paiement
- logistique / transport
- e-mailing / newsletter
- avis clients
- abonnement
- CRM
- facture PDF
- SAV / chat

---

## 23. Recommandations plugins / extensions

Sans verrouiller les choix, prévoir des solutions par catégorie :

- **SEO** : extension SEO reconnue
- **cache/performance** : extension cache adaptée + CDN éventuel
- **sécurité** : extension sécurité fiable
- **abonnement** : extension WooCommerce compatible paiement récurrent
- **click & collect / livraison** : extension logistique ou développement spécifique léger
- **avis clients** : système natif WooCommerce ou extension spécialisée
- **analytics** : intégration GA4 / GTM
- **RGPD / cookies** : CMP compatible marché européen
- **e-mails transactionnels** : SMTP / service d’envoi fiable

Le choix final devra être validé selon :
- compatibilité,
- maintenabilité,
- coût de licence,
- stabilité,
- performance.

---

## 24. Exigences techniques

## Stack cible
- WordPress récent
- WooCommerce récent
- thème custom ou thème enfant selon stratégie retenue
- développement conforme aux standards WordPress
- compatibilité PHP et base de données selon versions supportées

## Recommandation de développement
- éviter l’empilement excessif de plugins
- privilégier une architecture propre
- intégrer la maquette de manière fidèle mais maintenable
- prévoir environnement dev / staging / prod

## Livrables techniques attendus
- code source
- thème
- extensions spécifiques si développées
- export BDD si nécessaire
- procédure d’installation / mise en production
- documentation de gestion

---

## 25. Parcours utilisateurs clés

# Parcours 1 — achat classique
1. arrivée sur accueil ou catalogue  
2. consultation produit  
3. ajout panier  
4. choix livraison ou retrait  
5. paiement  
6. confirmation  

# Parcours 2 — click & collect
1. consultation produit  
2. ajout panier  
3. choix retrait boutique  
4. sélection créneau si activé  
5. paiement  
6. e-mail instructions retrait  

# Parcours 3 — abonnement colis viande
1. visite page abonnement  
2. choix formule  
3. choix fréquence  
4. création compte / connexion  
5. paiement  
6. gestion abonnement depuis compte client  

# Parcours 4 — client récurrent
1. connexion  
2. historique commande  
3. renouvellement / nouvelle commande  
4. dépôt avis  

---

## 26. Critères d’acceptation globaux

Le projet sera considéré recevable si :

- la maquette Figma est fidèlement intégrée,
- le site est responsive,
- le catalogue est administrable,
- les fiches produit sont complètes,
- le panier fonctionne sans erreur,
- le checkout permet une commande de bout en bout,
- le paiement fonctionne en environnement de test puis production,
- la livraison et le click & collect sont opérationnels,
- l’abonnement est fonctionnel selon périmètre validé,
- le compte client permet au minimum de consulter commandes et adresses,
- les avis sont affichables et modérables,
- les contenus légaux sont intégrés,
- les performances sont acceptables,
- le site est sécurisé et prêt à être exploité.

---

## 27. Plan de recette

La recette devra inclure au minimum :

### Recette front
- affichage desktop
- affichage mobile
- cohérence UI
- CTA
- formulaires
- menus
- footer
- recherche

### Recette e-commerce
- ajout panier
- suppression panier
- coupon
- variation produit
- stock
- calcul frais
- click & collect
- paiement test
- e-mails transactionnels
- création compte
- connexion
- mot de passe oublié
- avis

### Recette abonnement
- souscription
- renouvellement test
- suspension
- annulation
- affichage espace client

### Recette BO
- création produit
- modification prix
- commande
- remboursement si géré
- gestion avis
- gestion client
- gestion abonnement

---

## 28. Planning type

Exemple de séquencement :

### Phase 1 — cadrage
- validation cahier des charges
- audit maquette Figma
- validation plugins / stack
- validation parcours

### Phase 2 — préparation technique
- installation environnement
- configuration WordPress/WooCommerce
- structuration thème

### Phase 3 — intégration front
- accueil
- catalogue
- fiche produit
- pages statiques
- responsive

### Phase 4 — e-commerce
- panier
- checkout
- paiement
- livraison
- click & collect

### Phase 5 — modules avancés
- abonnement
- avis
- compte client
- tracking

### Phase 6 — recette et mise en ligne
- tests
- corrections
- préproduction
- mise en production
- formation rapide

---

## 29. Risques et points de vigilance

- complexité des abonnements si besoin métier spécifique
- compatibilité paiement récurrent + WooCommerce
- complexité des créneaux click & collect
- performance si trop de plugins
- qualité / homogénéité des contenus produit
- arbitrages non finalisés sur logistique
- dépendance à la qualité et précision de la maquette Figma
- gestion des produits frais et contraintes métier particulières

---

## 30. Hypothèses

Ce cahier des charges repose sur les hypothèses suivantes :
- la maquette Figma est disponible et servira de référence,
- la marque dispose ou disposera de l’ensemble des contenus,
- le catalogue sera géré dans WooCommerce,
- le projet vise un seul site WooCommerce,
- aucune intégration lourde ERP/POS n’est incluse à ce stade,
- les règles métier détaillées abonnement/livraison restent à valider.

---

# 31. Tableau de priorisation

| Module | Priorité | Statut |
|---|---:|---|
| Intégration maquette Figma | MUST | À faire |
| Catalogue produits | MUST | À faire |
| Fiche produit | MUST | À faire |
| Panier | MUST | À faire |
| Checkout | MUST | À faire |
| Paiement en ligne | MUST | À faire |
| Livraison | MUST | À faire |
| Click & collect | MUST | À faire |
| Compte client | MUST | À faire |
| Avis clients | MUST | À faire |
| Abonnement colis viande | MUST | À cadrer finement |
| SEO technique | SHOULD | À faire |
| Analytics | SHOULD | À faire |
| Newsletter / CRM | NICE TO HAVE | À valider |
| Blog / recettes | NICE TO HAVE | À valider |

---

# 32. Questions encore à valider avant développement

Voici les points qui doivent être figés avant lancement :

1. quel prestataire de paiement sera retenu  
2. quelles zones de livraison sont desservies  
3. quels frais de livraison appliquer  
4. faut-il proposer des créneaux de retrait  
5. quelle logique exacte pour l’abonnement  
6. engagement ou sans engagement  
7. fréquence(s) d’abonnement  
8. contenu fixe ou personnalisable des colis  
9. faut-il autoriser la commande en invité  
10. quelle solution pour les avis  
11. faut-il un blog / espace recettes dès V1  
12. quels outils analytics / marketing sont retenus

---

# 33. Formulation de lot de développement

Pour un devis développeur, tu peux découper comme ceci :

### Lot 1 — socle WordPress/WooCommerce
installation, configuration, thème, pages de base

### Lot 2 — intégration maquette
accueil, catégories, fiches, responsive

### Lot 3 — vente
panier, checkout, paiement

### Lot 4 — logistique
livraison, click & collect, e-mails

### Lot 5 — fidélisation
compte client, avis, abonnement

### Lot 6 — conformité et lancement
SEO, analytics, RGPD, recette, mise en ligne
