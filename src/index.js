// Aqui es donde arrancamos la aplicación.

import app from './app.js';
import { connectDB } from './db.js'; 

///////////////////////////////////////////////////////////////

// Esta es la conexión a la base de datos.
connectDB(); 

// Inicializamos el servidor.
app.listen(4000);

// Mensaje en consola.
console.log('Servidor en puerto', 4000);