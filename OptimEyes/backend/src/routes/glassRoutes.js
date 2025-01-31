import express from 'express';
import {
    addGlass,
    getAllGlasses,
    getGlassById,
    updateGlass,
    deleteGlass
} from '../controllers/glassController.js';

const router = express.Router();

// Ajouter une nouvelle lunette
router.post('/', addGlass);

// Récupérer toutes les lunettes
router.get('/', getAllGlasses);

// Récupérer une seule lunette par ID
router.get('/:id', getGlassById);

// Mettre à jour une lunette
router.put('/:id', updateGlass);

// Supprimer une lunette
router.delete('/:id', deleteGlass);

export default router;
