// Aqui configuramos el servidor de express y todo lo relacionado con el servidor.

import express from 'express';

// Este paquete nos permite ver en consola las peticiones que llegan al servidor.
import morgan from 'morgan'; 

// Este paquete nos permite trabajar con cookies en formato JSON.
import cookieParser from 'cookie-parser'; 

// Este paquete nos permite trabajar con la documentación de la API.
import swaggerUiExpress from 'swagger-ui-express';

// Importamos la documentación de la API.
import swaggerSpec from './swagger/swagger.js';

/////////////////////////////////////////////////////////////////////

// Importamos las rutas de autenticación.
import authRoutes from './routes/auth.routes.js'; 

// Importamos las rutas del carrito.
import cartRoutes from './routes/cart.routes.js'; 

/////////////////////////////////////////////////////////////////////

// Inicializamos express.
const app = express(); 

// Usamos morgan en modo desarrollo usando la configuracion 'dev'.
app.use(morgan('dev')); 

// Permite a express entender los datos que llegan en formato JSON.
app.use(express.json()); 

// Usamos cookieParser para poder trabajar con cookies.
app.use(cookieParser()); 

// Usamos swagger para la documentación de la API.
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

// Rutas.
// Rutas de autenticación.
app.use("/api", authRoutes); 

// Rutas del carrito.
app.use("/api", cartRoutes); 

export default app;
