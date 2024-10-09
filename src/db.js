import mongoose from "mongoose";

///////////////////////////////////////////////////////

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://CarlosF:amogus143690@aura.bpfl7.mongodb.net/aura_db?retryWrites=true&w=majority&appName=aura", {
            dbName: "aura_db"
        });
        console.log(">>> Conectado a la base de datos en MongoDB Atlas");
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
    }
};