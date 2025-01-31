import express from 'express';
import { 
    getAllUsers, 
    registerUser, 
    loginUser, 
    getUserProfile, 
    getUserById 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/', getAllUsers);

// Route d'inscription
router.post('/register', registerUser);

// Route de connexion
router.post('/login', loginUser);

// Route pour récupérer le profil utilisateur (protégée)
router.get('/profile', protect, getUserProfile);

// Route pour récupérer un utilisateur par ID
router.get('/:id', getUserById);

export default router;
