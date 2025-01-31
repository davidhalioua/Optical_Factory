import mongoose from 'mongoose';

const glassSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        stock: { type: Number, required: true }
    },
    { timestamps: true }
);

const Glass = mongoose.model('Glass', glassSchema);
export default Glass;
