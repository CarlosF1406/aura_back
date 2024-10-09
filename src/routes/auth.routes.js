// Aqui se definen las rutas para la autenticación de usuarios.

import { Router } from 'express';

// Importamos las funciones de autenticación para poder utilizarlas en las rutas.
import { 
    register, 
    login, 
    logout, 
    profile } from '../controllers/auth.controller.js';

// Importamos el middleware que valida el token.
import { authRequired } from '../middlewares/validateToken.js'; 

// Importamos el middleware que valida los datos de registro y login.
import { validateSchema } from '../middlewares/validator.middleware.js';

// Importamos el esquema de validación para el registro  y login de usuarios.
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

/////////////////////////////////////////////////////////////////////

const router = Router();

// Ruta para registrar un usuario.
router.post('/register', validateSchema(registerSchema), register);

// Ruta para iniciar sesión.
router.post('/login', validateSchema(loginSchema), login);

// Ruta para cerrar sesión.
router.post('/logout', logout);

// Ruta para ver el perfil del usuario.
router.get('/profile', authRequired, profile); 

// Exportamos las rutas para poder utilizarlas en el archivo principal.
export default router; 