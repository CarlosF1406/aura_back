// En este archivo estamos creando un modelo para los productos en la base de datos.

import mongoose from "mongoose";

/////////////////////////////////////////

// Definimos el esquema de los productos.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    inCart: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
});

// Exportamos el modelo de productos.
export default mongoose.model('Product', productSchema);
