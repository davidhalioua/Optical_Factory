# 👀 OptimEyes - Backend

Bienvenue dans le backend de **OptimEyes**, l'application de test et d'achat de lunettes en ligne. Ce backend gère l'authentification, les catalogues de lunettes, les commandes, les recommandations personnalisées et inclut un chatbot intelligent.

## 🚀 Technologies utilisées
- **Node.js** avec **Express.js** pour le serveur
- **MongoDB** avec **Mongoose** pour la base de données
- **JWT** pour l'authentification
- **WebSockets** pour le chatbot en temps réel
- **Postman** pour tester les API

---

## 📌 Installation et Configuration

### 1️⃣ Prérequis
Avant de commencer, assure-toi d'avoir :
- Node.js installé (`>= 16.x`)
- MongoDB Atlas ou une instance locale de MongoDB
- Un fichier `.env` avec les variables requises

### 2️⃣ Installation
Clone le projet et installe les dépendances :
```sh
# Cloner le repo
git clone https://github.com/ton_repo/OptimEyes.git
cd OptimEyes/backend

# Installer les dépendances
npm install
```

### 3️⃣ Configuration de l'environnement
Crée un fichier `.env` à la racine et ajoute :
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/optimeyes
JWT_SECRET=supersecretkey
PORT=5000
```

### 4️⃣ Lancer le serveur
```sh
npm run dev  # Démarre en mode développement
```
Le serveur est accessible sur **http://localhost:5000**.

---

## 📡 API Endpoints

### 🔐 Authentification
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| `POST`  | `/api/users/register` | Inscription utilisateur |
| `POST`  | `/api/users/login` | Connexion utilisateur |
| `GET`  | `/api/users/profile` | Profil utilisateur (nécessite un token) |

### 🛍️ Catalogue de Lunettes
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| `GET`  | `/api/glasses` | Liste toutes les lunettes |
| `POST`  | `/api/glasses` | Ajouter une nouvelle paire de lunettes (Admin) |
| `GET`  | `/api/glasses/:id` | Obtenir une lunette spécifique |
| `PUT`  | `/api/glasses/:id` | Modifier une lunette (Admin) |
| `DELETE`  | `/api/glasses/:id` | Supprimer une lunette (Admin) |

### 🔎 Recommandations de Lunettes
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| `POST`  | `/api/glasses/recommendations` | Obtenir des recommandations personnalisées selon l'âge, le genre et l'utilisation |

#### Exemples de requête :
```json
{
  "gender": "Homme",
  "age": 30,
  "category": "Repos"
}
```
#### Réponse attendue :
```json
[
  {
    "_id": "67a2996f02dc0dbeb000c3af",
    "name": "Lunettes de repos",
    "brand": "Ray-Ban",
    "price": 120.99,
    "description": "Lunettes idéales pour soulager la fatigue oculaire.",
    "stock": 15,
    "imageUrl": "https://example.com/rayban_repos.jpg",
    "frameType": "Rectangulaire",
    "material": "Métal",
    "category": "Repos"
  }
]
```

### 📦 Commandes
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| `POST`  | `/api/orders` | Créer une commande |
| `GET`  | `/api/orders` | Voir toutes les commandes (Admin) |
| `GET`  | `/api/orders/:id` | Voir une commande spécifique |
| `PUT`  | `/api/orders/:id` | Mettre à jour le statut de la commande |
| `DELETE`  | `/api/orders/:id` | Supprimer une commande |

### 🤖 Chatbot
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| `POST`  | `/api/chat` | Envoyer un message au chatbot |
| `GET`  | `/api/chat/history` | Récupérer l'historique des messages |

---

## 🏗️ Utilisation pour le Frontend
Le frontend peut interagir avec l'API en utilisant **Axios** ou **Fetch**.

### 📌 Exemple : Connexion utilisateur avec Axios :
```javascript
axios.post('http://localhost:5000/api/users/login', {
  email: 'john@example.com',
  password: 'test123'
}).then(response => {
  console.log('Token reçu:', response.data.token);
});
```

### 📌 Exemple : Récupérer les lunettes :
```javascript
fetch('http://localhost:5000/api/glasses')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 📌 Exemple : Demander des recommandations :
```javascript
fetch('http://localhost:5000/api/glasses/recommendations', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    gender: "Femme",
    age: 25,
    category: "Solaire"
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📌 Tests avec Postman
Voici les principales requêtes à tester :
1️⃣ **Créer un utilisateur** ➜ `POST /api/users/register`  
2️⃣ **Se connecter** ➜ `POST /api/users/login`  
3️⃣ **Récupérer la liste des lunettes** ➜ `GET /api/glasses`  
4️⃣ **Passer une commande** ➜ `POST /api/orders`  
5️⃣ **Demander des recommandations** ➜ `POST /api/glasses/recommendations`  
6️⃣ **Envoyer un message au chatbot** ➜ `POST /api/chat`  

---

## ✅ TODO & Améliorations
✔ Ajouter des rôles utilisateur (Admin / Client)  
✔ Intégrer Stripe pour le paiement en ligne  
✔ Ajouter des WebSockets pour les notifications  
✔ Améliorer le moteur de recommandations avec IA  

---
