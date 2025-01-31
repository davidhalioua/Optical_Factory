import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Glass from '../models/Glass.js';

// Créer une nouvelle commande
const createOrder = asyncHandler(async (req, res) => {
    const { userId, items, totalPrice, status } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier si tous les articles existent
    for (const item of items) {
        const glassExists = await Glass.findById(item.glassId);
        if (!glassExists) {
            return res.status(400).json({ message: `Lunette non trouvée pour ID: ${item.glassId}` });
        }
    }

    // Créer la commande
    const order = await Order.create({
        userId,
        items,
        totalPrice,
        status
    });

    res.status(201).json(order);
});

// Récupérer une commande par ID
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Commande non trouvée' });
    }
});

// Mettre à jour le statut d'une commande
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
    }

    if (!['En cours', 'Expédiée', 'Livrée'].includes(status)) {
        return res.status(400).json({ message: 'Statut invalide' });
    }

    order.status = status;
    await order.save();
    res.json({ message: 'Statut mis à jour', order });
});

// Obtenir toutes les commandes d'un utilisateur
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
});

// Supprimer une commande par ID
export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Commande non trouvée");
    }

    await order.deleteOne();
    res.json({ message: "Commande supprimée avec succès" });
});

// Admin : Récupérer toutes les commandes
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('userId', 'name email');
    res.json(orders);
});

export {
    createOrder,
    getOrderById,
    updateOrderStatus,
    getMyOrders,
    getAllOrders
};
