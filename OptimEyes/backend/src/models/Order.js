import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                glassId: { type: mongoose.Schema.Types.ObjectId, ref: 'Glass', required: true },
                quantity: { type: Number, required: true }
            }
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, enum: ['En cours', 'Expédiée', 'Livrée'], default: 'En cours' }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
