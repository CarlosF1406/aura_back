// Este archivo se encarga de la conexión a la base de datos de MongoDB

import mongoose from 'mongoose';


// Esta función se encarga de conectarse a la base de datos, si llega a haber un error, lo imprime en consola
export const connectDB = async () => { 
    try {
        await mongoose.connect("mongodb://localhost/aura_db");
    } catch (error) {
        console.log(error);
    }
};
