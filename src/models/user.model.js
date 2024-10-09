// En este archivo estamos creando un modelo de usuario que se va a utilizar en la base de datos.

import mongoose from 'mongoose';

/////////////////////////////////////////////

// Definimos el esquema de usuario.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true // Elimina los espacios en blanco al principio y al final
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // Hace que el email sea unico, lo que no permite que se repita.
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // La contraseña debe tener un minimo de 8 caracteres
    },
});

// Exportamos el modelo de usuario.
export default mongoose.model('User', userSchema); 