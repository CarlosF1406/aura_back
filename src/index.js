// Este archivo es el que se enccarga de inicializar la aplicación y ponerla a escuchar en un puerto específico. Para ello, importa la aplicación desde app.js y la pone a escuchar en el puerto 3000.

import app from './app.js';
import { connectDB } from './db.js';

app.listen(4000);
console.log('Server on port', 4000);