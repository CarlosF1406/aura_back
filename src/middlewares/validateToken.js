// En este archivo se definen las rutas para la autenticación de usuarios. Para poder acceder a la ruta /profile es necesario estar autenticado. Para ello se utiliza un middleware que valida el token. Si el token es válido, se ejecuta la función profile, de lo contrario se envía un mensaje de error.

import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';

///////////////////////////////////////////////////////////////

// Middleware que valida si el usuario esta autenticado.
export const authRequired = (req, res, next) => {
    
    // Obtenemos el token de las cookies.
    const {token} = req.cookies;

    // Si no hay token, enviamos un mensaje de error.
    if (!token) return res.status(401).json({message: "No hay token, autorizacion denegada"});

    // Verificamos si el token es valido y dependiendo si es valido o no, enviamos una respuesta.
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "Token Invalido"});
        
        req.user = user; // Guardamos el usuario en el req para poder utilizarlo en la ruta.

        next(); // Si el token es valido el cliente puede acceder a la ruta.
    });
};