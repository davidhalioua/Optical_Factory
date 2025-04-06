import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Glass from '../models/Glass.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correction 
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => {
    console.error('❌ Erreur MongoDB : ', err);
    process.exit(1);
  });

const glasses = [
    {
        name: 'Lunettes de natation Speedo',
        brand: 'Speedo',
        price: 50.99,
        description: 'Parfaites pour les nageurs professionnels.',
        stock: 10,
        imageUrl: 'https://example.com/speedo.jpg',
        frameType: 'Sport',
        material: 'Plastique',
        category: 'Natation',
        gender: 'Mixte',
        recommendedAge: 50
    },
    {
        name: 'Lunettes de repos Blue Light',
        brand: 'Ray-Ban',
        price: 120.99,
        description: 'Filtrent la lumière bleue pour protéger vos yeux.',
        stock: 15,
        imageUrl: 'https://example.com/blue-light.jpg',
        frameType: 'Carré',
        material: 'Métal',
        category: 'Repos',
        gender: 'Femme',
        recommendedAge: 19
    },
    {
        name: 'Lunettes outdoor UV protection',
        brand: 'Oakley',
        price: 200.99,
        description: 'Idéales pour le sport en plein air.',
        stock: 5,
        imageUrl: 'https://example.com/oakley.jpg',
        frameType: 'Aviator',
        material: 'Plastique',
        category: 'Sport',
        gender: 'Homme',
        recommendedAge: 25
    },
    {
        name: 'Lunettes Gaming Pro',
        brand: 'Gunnar',
        price: 150.00,
        description: 'Améliorent la visibilité et réduisent la fatigue oculaire devant les écrans.',
        stock: 20,
        imageUrl: 'https://example.com/gunnar.jpg',
        frameType: 'Rectangle',
        material: 'Métal',
        category: 'Gaming',
        gender: 'Mixte',
        recommendedAge: 18
    },
    {
        name: 'Lunettes de lecture Classique',
        brand: 'Foster Grant',
        price: 39.99,
        description: 'Idéales pour une lecture prolongée.',
        stock: 25,
        imageUrl: 'https://example.com/foster-grant.jpg',
        frameType: 'Ovale',
        material: 'Plastique',
        category: 'Lecture',
        gender: 'Mixte',
        recommendedAge: 40
    },
    {
        name: 'Lunettes de Soleil Fashion',
        brand: 'Prada',
        price: 320.00,
        description: 'Protection UV optimale avec style contemporain.',
        stock: 8,
        imageUrl: 'https://example.com/prada.jpg',
        frameType: 'Papillon',
        material: 'Métal',
        category: 'Soleil',
        gender: 'Femme',
        recommendedAge: 30
    },
    {
        name: 'Lunettes conduite nocturne',
        brand: 'Night Drive',
        price: 80.50,
        description: 'Réduisent les éblouissements et améliorent la visibilité nocturne.',
        stock: 12,
        imageUrl: 'https://example.com/night-drive.jpg',
        frameType: 'Rectangle',
        material: 'Plastique',
        category: 'Conduite',
        gender: 'Mixte',
        recommendedAge: 35
    },
    {
        name: 'Lunettes de sport extrême',
        brand: 'Julbo',
        price: 180.75,
        description: 'Pour les sports à haut risque, résistantes aux chocs.',
        stock: 18,
        imageUrl: 'https://example.com/julbo.jpg',
        frameType: 'Sport',
        material: 'Titane',
        category: 'Sport',
        gender: 'Homme',
        recommendedAge: 28
    },
    {
        name: 'Lunettes enfant sécurité',
        brand: 'KidsSafe',
        price: 45.20,
        description: 'Sécurisées et robustes pour enfants actifs.',
        stock: 30,
        imageUrl: 'https://example.com/kidssafe.jpg',
        frameType: 'Carré',
        material: 'Plastique',
        category: 'Sport',
        gender: 'Mixte',
        recommendedAge: 10
    },
    {
        name: 'Lunettes senior confort',
        brand: 'SeniorComfort',
        price: 55.00,
        description: 'Légères et confortables pour usage quotidien prolongé.',
        stock: 15,
        imageUrl: 'https://example.com/seniorcomfort.jpg',
        frameType: 'Ovale',
        material: 'Métal',
        category: 'Lecture',
        gender: 'Mixte',
        recommendedAge: 65
    }
];

const seedDatabase = async () => {
  try {
    await Glass.deleteMany();
    await Glass.insertMany(glasses);
    console.log('🎉 Données insérées avec succès !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur lors du seed :', err);
    process.exit(1);
  }
};

seedDatabase();