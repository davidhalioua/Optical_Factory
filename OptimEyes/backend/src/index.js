import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import glassRoutes from './routes/glassRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});


// Routes API
app.use('/api/users', userRoutes);
console.log("✅ Routes chargées !");

app.use('/api/glasses', glassRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/glasses', glassRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);




// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    console.log("🔍 Vérification : Express écoute bien sur ce port...");
});


