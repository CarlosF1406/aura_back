// En este archivo estamos creando un modelo para los productos en el carrito de compras en la base de datos.

import mongoose from "mongoose";

/////////////////////////////////////////

// Definimos el esquema de los productos en el carrito de compras.
const cartSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, // Hace referencia al id del usuario.
        ref: 'User',
        required: true 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, // Hace referencia al id del producto.
        ref: 'Product',
        required: true 
    },
    name: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    amount: {
        type: Number, 
        default: 1 // La cantidad por defecto de un producto en el carrito es de 1.
    }
});

// Creamos un índice para que no se pueda repetir el mismo producto en el carrito de compras.
cartSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model('Cart', cartSchema);
