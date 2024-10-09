// En este archivo se definen los esquemas de validación para los datos de registro y login de usuarios.

export const validateSchema = (schema) => (req, res, next) => {

    // Encerramos el código en un bloque try-catch para manejar errores en caso de que se den.
    try {
      schema.parse(req.body); // Usamos el método parse para validar los datos.
      next(); // Si no hay errores, continua.
    } catch (error) {
      return res
        .status(400)
        .json(error.errors.map((error) => error.message)); // Si hay errores, enviar un mensaje de error.
    }
  };
  