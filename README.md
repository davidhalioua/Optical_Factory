
# **🚀 OptimEyes - Backend**  
Backend du projet **OptimEyes**, une plateforme de test et d'achat de lunettes en ligne.

---

## ** Installation & Configuration**

### 1️ **Cloner le projet**
```sh
git clone https://github.com/ton-repo/OptimEyes.git
cd OptimEyes/backend
```

### 2️ **Installer les dépendances**
```sh
npm install
```

### 3️ **Créer un fichier `.env`**
Ajoute tes variables d’environnement dans **`.env`** :

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/OptimEyes
JWT_SECRET=ton_secret_jwt
DEEPSEEK_API_KEY=ta_cle_api_deepseek
```

### 4️ **Démarrer le serveur**
```sh
npm start
```
📌 Le backend tourne maintenant sur **`http://localhost:5000`**.

---

## **📡 Routes API**
### **🔐 API de l'authentification (Users)**
| Méthode | Endpoint                  | Description |
|---------|----------------------------|-------------|
| `POST`  | `/api/users/register`      | Inscription d'un utilisateur |
| `POST`  | `/api/users/login`         | Connexion et récupération du token JWT |
| `GET`   | `/api/users/profile`       | Récupération du profil utilisateur **(🔒 Protégé JWT)** |
| `GET`   | `/api/users/:id`           | Récupérer un utilisateur par ID **(🔒 Protégé JWT)** |

 **Exemple de requête pour inscription :**
```json
{
  "name": "Lucas Dupont",
  "email": "lucas.dupont@example.com",
  "password": "MotDePasse456!"
}
```
 **Retourne un token JWT** pour l'authentification.

---

### **👓 API Recommandations de lunettes**
| Méthode | Endpoint          | Description |
|---------|------------------|-------------|
| `GET`   | `/api/glasses`   | Récupérer toutes les lunettes disponibles |
| `POST`  | `/api/glasses`   | Ajouter une nouvelle paire de lunettes (admin) |

---

### **🤖 API Chatbot & IA DeepSeek**
| Méthode | Endpoint        | Description |
|---------|----------------|-------------|
| `POST`  | `/api/chat`     | Envoyer un message au chatbot (IA DeepSeek) |
| `GET`   | `/api/chat/:id` | Récupérer l'historique du chat utilisateur |

 **Exemple de requête au chatbot :**
```json
{
  "userId": "67a5e647f609be7c29820e24",
  "message": "Quelles lunettes recommandes-tu ?"
}
```
 **Réponse possible :**
```json
{
  "response": [
    {
      "name": "Lunettes de repos Blue Light",
      "brand": "Ray-Ban",
      "price": 120.99,
      "description": "Filtrent la lumière bleue pour protéger vos yeux.",
      "imageUrl": "https://example.com/blue-light.jpg"
    }
  ],
  "type": "recommendation"
}
```

---

## **🔐 Sécurité**
- **JWT pour l’authentification sécurisée**
- **Middleware de protection (`authMiddleware.js`)**
- **Hashage des mots de passe avec bcrypt**
- **Protection des API avec validation des entrées utilisateur**

---

## 🧠 **DeepSeek AI**
L’API utilise **DeepSeek** pour répondre aux questions des utilisateurs.

### **Installation du SDK**
```sh
npm install openai
```

### **Exemple d’appel API à DeepSeek**
```javascript
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: process.env.DEEPSEEK_API_KEY
});

const response = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [{ role: "user", content: "Quels sont les meilleurs verres anti-lumière bleue ?" }]
});

console.log(response.choices[0]?.message?.content);
```

---

## 🛠 **Technologies Utilisées**
- **Node.js** - Backend
- **Express.js** - Framework serveur
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ORM MongoDB
- **JSON Web Token (JWT)** - Authentification sécurisée
- **DeepSeek AI** - Chatbot intelligent
- **Postman** - Tests API

---

## **📌 Ce qu'il reste à faire**
- **💳 Intégration complète des paiements Stripe** pour finaliser les achats.  
- **📊 Optimisation des recommandations IA** pour des suggestions plus précises.  
- **🔍 Diagnostic visuel IA** pour détecter d’éventuels problèmes oculaires.  
- **⚡ Performance & Scalabilité** pour une gestion plus rapide des requêtes.  

---

## 📩 **Support**
Si vous rencontrez un problème, ouvrez une **issue** sur GitHub.
