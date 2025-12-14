# 🎬 Red Pill Project

> **Plateforme personnelle de gestion et de suivi de films et collections TMDB**
> Ajoute, classe, note et suis tes films et collections comme un vrai cinéphile.

---

## 🚀 Présentation

**Red Pill Project** est une application web full-stack permettant de :

- 🔍 Rechercher des films via **TMDB**
- 🎞️ Ajouter des films à sa base personnelle
- 📚 Gérer des **collections TMDB** (sagas, trilogies, univers)
- 👤 Suivre l’avancement utilisateur :
  - à voir / vu / pas vu / pas intéressé
  - date de visionnage
  - note personnelle

- 🧠 Centraliser intelligemment films, collections et données utilisateur

Le projet met l’accent sur :

- une **architecture propre**
- une **base de données cohérente**
- une **séparation claire client / serveur**

---

## 🧱 Stack technique

### Frontend

- **SvelteKit**
- TypeScript
- Fetch API

### Backend

- **SvelteKit API routes**
- **Prisma ORM**
- PostgreSQL

### Services externes

- **TMDB API** (The Movie Database)

---

## 🗂️ Modélisation (simplifiée)

### Film

- Données issues de TMDB
- Peut appartenir ou non à une collection

### BelongsToCollection

- Représente une collection TMDB
- Contient plusieurs films

### UserFilmEntry

- Lien utilisateur ↔ film
- Statut, note, date de visionnage

### UserCollectionEntry

- Lien utilisateur ↔ collection
- Statut global de la collection

👉 Les **films et collections sont indépendants des utilisateurs**
👉 Les **User\*Entry** portent uniquement les données personnelles

---

## 🔐 Authentification

- Basée sur `locals.user` côté serveur
- Toutes les routes sensibles sont protégées

---

## 🔁 Logique clé du projet

### 🎯 Création intelligente des données

- Un film est créé **uniquement s’il n’existe pas**
- Une collection est créée **uniquement si nécessaire**
- Les relations utilisateur sont créées séparément

### 🧠 Gestion des collections TMDB

Lorsqu’un utilisateur ajoute une collection :

1. La collection est récupérée depuis TMDB si absente
2. Les films sont créés en base si nécessaires
3. Les `UserFilmEntry` sont générées automatiquement

---

## 🧪 Problèmes techniques résolus

- ❌ Conflits de clés étrangères Prisma
- ❌ Ordre de création Film / Collection
- ❌ Boucles client → serveur involontaires
- ❌ Données TMDB invalides

➡️ Résolution via :

- relations optionnelles
- services dédiés (`getOrCreate*`)
- validation stricte des données TMDB

---

## ⚙️ Installation locale

```bash
# Installer les dépendances
pnpm install

# Lancer Prisma
pnpm prisma generate
pnpm prisma migrate dev

# Lancer le projet
pnpm dev
```

---

## 🔑 Variables d’environnement

Créer un .env à partir du .env.example

---

## 📌 Objectifs futurs

- 📊 Dashboard utilisateur
- 🔄 Synchronisation avancée des collections
- 🎨 UI plus poussée
- 📱 Version mobile
- 🔍 Filtres et stats avancées

---

## 🤝 Philosophie

> _« Ne consomme pas le contenu. Comprends-le, classe-le, maîtrise-le. »_

Ce projet est avant tout un **terrain d’expérimentation sérieux**, orienté :

- clean architecture
- performance
- maintenabilité

---

## 🧠 Auteur

**Guillaume**
Développeur passionné, cinéphile et amateur de systèmes bien pensés.

---

🔥 _Red Pill Project — choisis de voir clair dans ta cinémathèque._
