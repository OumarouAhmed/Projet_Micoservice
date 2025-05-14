# 💸 Système de Règlement Interbancaire en Temps Réel (Microservices)

Ce projet simule un système de règlement bancaire entre plusieurs institutions, construit sur une **architecture microservices** moderne avec :

- 🔗 REST API
- ⚡ gRPC pour les virements en temps réel
- 📬 Kafka pour la diffusion d'événements
- 🔎 GraphQL pour l’accès unifié aux données

---

## 🏗️ Architecture Globale

![architecture](./docs/architecture.png)


---

## 📦 Microservices

| Microservice         | Port   | Description                                 |
|----------------------|--------|---------------------------------------------|
| `user-service`       | 3001   | Gestion des utilisateurs                    |
| `bank-service`       | 3002   | Gestion des banques et soldes               |
| `settlement-service` | 50051  | Virements interbancaires via gRPC           |
| `history-service`    | 3004   | Historique des transactions (via Kafka)     |
| `api-gateway`        | 3000   | Point d'entrée REST + GraphQL               |

---

## 📡 Communication entre services

| Type      | Utilisé pour…                          |
|-----------|----------------------------------------|
| REST      | Créer/lister utilisateurs et banques   |
| gRPC      | Effectuer un virement                  |
| Kafka     | Notifier et enregistrer un transfert   |
| GraphQL   | Accès unifié à tous les microservices  |

---

## 🧪 Endpoints REST principaux

| Route                          | Méthode | Fonction                          |
|-------------------------------|---------|-----------------------------------|
| `/api/users`                  | GET/POST| Liste ou ajoute des utilisateurs  |
| `/api/banks`                  | GET/POST| Liste ou ajoute des banques       |
| `/api/transactions`           | GET     | Historique des virements          |
| `/api/transfer`               | POST    | Déclenche un transfert (gRPC)     |

---

## 🔎 Exemple de requête GraphQL

```graphql
{
  users {
    nom
    solde
  }
  banks {
    bic
    nom
    solde
  }
  transactions {
    senderBIC
    receiverBIC
    amount
    date
  }
}
