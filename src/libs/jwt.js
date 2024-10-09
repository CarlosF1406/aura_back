// Aqui se encuentra la función que crea el token de acceso.

import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';

////////////////////////////////////////////////////////////////

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err) // Si hay un error, lo rechazamos.
                    resolve(token) // Si no hay error, resolvemos el token.
            }
        );
    })
}