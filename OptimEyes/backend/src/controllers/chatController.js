import asyncHandler from 'express-async-handler';
import ChatMessage from '../models/ChatMessage.js';
import User from '../models/User.js';

// Générer une réponse automatique simple
const generateChatbotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes("lunettes")) {
        return "Nous avons un large choix de lunettes ! Consultez notre catalogue.";
    }
    if (userMessage.toLowerCase().includes("prix")) {
        return "Nos prix varient en fonction du modèle. Consultez notre catalogue pour plus de détails.";
    }
    if (userMessage.toLowerCase().includes("commande")) {
        return "Vous pouvez suivre votre commande en vous connectant à votre compte.";
    }
    return "Je ne suis pas sûr de comprendre, pouvez-vous reformuler ?";
};

// Enregistrer un message et obtenir une réponse
export const sendMessageToChatbot = asyncHandler(async (req, res) => {
    const { userId, message } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    // Générer une réponse
    const response = generateChatbotResponse(message);

    // Enregistrer le message dans la base de données
    const chatMessage = await ChatMessage.create({
        userId,
        message,
        response
    });

    res.status(201).json(chatMessage);
});

// Obtenir l'historique des messages d'un utilisateur
export const getChatHistory = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const messages = await ChatMessage.find({ userId }).sort({ createdAt: 1 });

    res.json(messages);
});
