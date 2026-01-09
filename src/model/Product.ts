import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    expiryDate: {
        type: Date,
        required: true,
    },
    barcode: {
        type: String,
        required: false,
        unique: false,
    },
    brand: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    defaultExpiryDays: {
        type: Number,
        required: false,
    },
    source: {
        type: String,
        enum: ['manual', 'barcode'],
        default: 'manual',
        required: true,
    }
}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;