import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    Inscription d'un utilisateur
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    console.log("📌 Tentative d'inscription :", { name, email });

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    try {
        const user = await User.create({ name, email, password });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ message: "Données invalides" });
        }
    } catch (error) {
        console.error("❌ Erreur lors de l'inscription :", error.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

// @desc    Connexion utilisateur
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("📌 Tentative de connexion :", { email });

    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).json({ message: "Identifiants invalides" });
        }
    } catch (error) {
        console.error("❌ Erreur lors de la connexion :", error.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

// @desc    Récupérer le profil utilisateur
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    console.log("📌 Récupération du profil pour l'ID :", req.user._id);

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du profil :", error.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

// @desc    Test de l'API utilisateur
// @route   GET /api/users/test
// @access  Public
const testUserRoute = asyncHandler(async (req, res) => {
    console.log("📌 Route test utilisateur appelée");
    return res.json({ message: "Test réussi" });
});

// @desc    Récupérer tous les utilisateurs
// @route   GET /api/users/all
// @access  Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
    console.log("📌 Récupération de tous les utilisateurs");

    try {
        const users = await User.find({});
        return res.json(users);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des utilisateurs :", error.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

// @desc    Récupérer un utilisateur par son ID
// @route   GET /api/users/:id
// @access  Private (Admin)
const getUserById = asyncHandler(async (req, res) => {
    console.log("📌 Récupération de l'utilisateur ID :", req.params.id);

    if (!req.params.id) {
        return res.status(400).json({ message: "ID utilisateur requis" });
    }

    try {
        const user = await User.findById(req.params.id);

        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.error("❌ Erreur lors de la récupération de l'utilisateur :", error.message);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

export { registerUser, loginUser, getUserProfile, testUserRoute, getAllUsers, getUserById };
