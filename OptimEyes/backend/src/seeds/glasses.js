import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Glass from '../models/Glass.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
    }
];

const seedDatabase = async () => {
    await Glass.deleteMany();
    await Glass.insertMany(glasses);
    console.log('Données insérées avec succès !');
    process.exit();
};

seedDatabase();
