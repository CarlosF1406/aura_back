// Aqui se encuentran todas las funciones relacionadas a la autenticación de usuarios.

// Importamos el modelo de usuario.
import User from '../models/user.model.js';

// Importamos bcrypt para encriptar la contraseña.
import bcrypt from 'bcryptjs';

// Importamos la función que crea el token de acceso.
import { createAccessToken } from '../libs/jwt.js';

////////////////////////////////////////////////////////////////

// Aqui se encuentra la función que registra un usuario.
export const register = async (req, res) => {
    const {email, password, username} = req.body; // El req.body contiene los datos que envia el usuario.

    // Ponemos todo dentro de un try catch para manejar los errores en caso de que ocurran.
    try {

        // Buscamos si el correo ya esta en uso.
        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json(["El correo ya esta en uso"]);

        // El hash es un algoritmo que convierte una cadena de caracteres en una cadena de longitud fija.
        const passwordHash = await bcrypt.hash(password, 10); 

        // Creamos un nuevo usuario.
        const newUser = new User({
            username,
            email,
            password: passwordHash, // Guardamos la contraseña encriptada.
        });
        
        // Guardamos el usurio en la base de datos y lo guardamos como un objeto.
        const userSaved = await newUser.save();

        // Creamos un token de acceso.
        const token = await createAccessToken({id: userSaved._id})
        
        // Enviamos el token en una cookie y el usuario como respuesta.
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });
    } catch (error) {
      res.status(500).json({message: error.message}); // Si hay un error, lo enviamos como respuesta.
    }
};

// Aqui se encuentra la función que inicia sesión.
export const login = async (req, res) => {
    const {email, password} = req.body; // El req.body contiene los datos que envia el usuario.

    // Ponemos todo dentro de un try catch para manejar los errores en caso de que ocurran.
    try {

        // Buscamos el correo del usurio y dependiendo si lo encontramos o no, enviamos una respuesta.
        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({message: "Ususario no encontrado"});

        // Comparamos la contraseña que envio el usuario con la contraseña encriptada que tenemos en la base de datos y dependiendo si coinciden o no, enviamos una respuesta.
        const isMatch = await bcrypt.compare(password, userFound.password); // El bcrypt.compare devuelve un booleano.
        if (!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});

        // Creamos un token de acceso.
        const token = await createAccessToken({id: userFound._id})
        
        // Enviamos el token en una cookie y el usuario como respuesta.
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            token: token
        });
    } catch (error) {
      res.status(500).json({message: error.message}); // Si hay un error, lo enviamos como respuesta.
    }
};

// Aqui se encuentra la función que cierra sesión.
export const logout = async (req, res) => {
    // Enviamos una cookie con el token vacio y una fecha de expiración en el pasado para que el navegador la elimine.
    res.cookie('token', "", { 
        expires: new Date(0)
    });
    return res.sendStatus(200); // Enviamos un estado 200 para indicar que todo salio bien.
};

// Aqui se encuentra la función que muestra el perfil del usuario.
export const profile = async (req, res) => {

    // Buscamos el usuario por el id que tenemos en el token.
    const userFound = await User.findById(req.user.id);

    // Si no encontramos el usuario, enviamos un mensaje de error.
    if (!userFound) return res.status(400).json({message: "Usuario no encontrado"});

    // Enviamos el usuario como respuesta.
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    });
};