import asyncHandler from 'express-async-handler';
import OpenAI from "openai";
import ChatMessage from '../models/ChatMessage.js';
import User from '../models/User.js';
import Glass from '../models/Glass.js';

// ✅ Initialisation de DeepSeek via le SDK OpenAI
const openai = new OpenAI({
    baseURL: "https://api.deepseek.com", // URL correcte pour DeepSeek
    apiKey: process.env.DEEPSEEK_API_KEY // Assure-toi que ta clé API est bien définie
});

// ✅ Fonction pour interroger DeepSeek AI
const fetchAIResponse = async (userMessage) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: [{ role: "user", content: userMessage }],
        });

        return completion.choices[0]?.message?.content || "Je ne suis pas sûr de comprendre, pouvez-vous reformuler ?";
    } catch (error) {
        console.error("❌ Erreur avec DeepSeek :", error);
        return "Désolé, je ne peux pas répondre pour l'instant.";
    }
};

// ✅ Vérifier si le message concerne des recommandations
const isRecommendationRequest = (message) => {
    const recommendationKeywords = ["lunettes", "recommandation", "besoin de lunettes", "choisir mes lunettes"];
    return recommendationKeywords.some(keyword => message.includes(keyword));
};

// ✅ Générer une réponse automatique améliorée
const generateChatbotResponse = async (userMessage) => {
    const cleanedMessage = userMessage.toLowerCase().trim();

    // 🚀 **Vérification PRIORITAIRE des recommandations**
    if (isRecommendationRequest(cleanedMessage)) {
        try {
            console.log("🔍 Recherche de recommandations...");
            const recommendedGlasses = await Glass.find().limit(3);

            if (recommendedGlasses.length > 0) {
                return { 
                    type: "recommendation", 
                    response: recommendedGlasses.map(glass => ({
                        name: glass.name,
                        brand: glass.brand,
                        price: glass.price,
                        description: glass.description,
                        imageUrl: glass.imageUrl
                    }))
                };
            } else {
                return { 
                    type: "text", 
                    response: "Je n’ai pas encore de recommandations à vous proposer. Vous pouvez remplir notre formulaire ici : https://tonsite.com/formulaire-recommandations" 
                };
            }
        } catch (error) {
            console.error("❌ Erreur lors de la récupération des recommandations :", error);
            return { type: "text", response: "Désolé, une erreur s'est produite en recherchant des recommandations." };
        }
    }

    // ✅ Réponses standards (seulement si ce n'est PAS une recommandation)
    const responses = {
        "bonjour": "Bonjour ! Comment puis-je vous aider ?",
        "salut": "Salut ! Que puis-je faire pour vous ?",
        "prix": "Nos prix varient en fonction du modèle. Consultez notre catalogue.",
        "commande": "Vous pouvez suivre votre commande en vous connectant à votre compte.",
        "livraison": "Nos livraisons prennent entre 3 et 5 jours ouvrables.",
        "remboursement": "Vous pouvez demander un remboursement sous 14 jours après réception de votre commande.",
        "paiement": "Nous acceptons les paiements via Stripe et PayPal.",
        "monture": "Nous avons différentes formes de montures : carrée, ronde, aviator...",
        "verres": "Nos verres peuvent être anti-lumière bleue, polarisés, correcteurs...",
        "merci": "Avec plaisir ! 😊",
        "au revoir": "À bientôt !"
    };

    for (const key in responses) {
        if (cleanedMessage.includes(key)) {
            return { type: "text", response: responses[key] };
        }
    }

    // ✅ Si aucune réponse standard trouvée, appeler l'IA
    console.log("🧠 Envoi du message à l'IA...");
    const aiResponse = await fetchAIResponse(userMessage);
    return { type: "ai", response: aiResponse };
};

// ✅ Enregistrer un message et obtenir une réponse
export const sendMessageToChatbot = asyncHandler(async (req, res) => {
    const { userId, message } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    // Générer une réponse intelligente
    let chatbotResponse = await generateChatbotResponse(message);

    // ✅ Adapter le stockage en fonction du type de réponse
    let savedResponse = chatbotResponse.type === "recommendation" 
        ? JSON.stringify(chatbotResponse.response) // Convertir en JSON pour MongoDB
        : chatbotResponse.response;

    // Enregistrer le message et la réponse dans la base de données
    const chatMessage = await ChatMessage.create({
        userId,
        message,
        response: savedResponse
    });

    res.status(201).json({
        userId,
        message,
        response: chatbotResponse.response,
        type: chatbotResponse.type
    });
});

// ✅ Obtenir l'historique des messages d'un utilisateur
export const getChatHistory = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });

    res.json(messages);
});
