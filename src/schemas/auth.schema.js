import { z } from "zod";

// Esquema de validación para el registro de usuarios.
export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Nombre de usuario es requerido", // Mensaje de error si el campo está vacío.
    })
    .min(5, {
      message: "Nombre de usuario debe tener mínimo 5 caracteres", // Mensaje de error si el nombre de usuario tiene menos de 5 caracteres.
    }),
  email: z
    .string({
      required_error: "Email es requerido", // Mensaje de error si el campo está vacío.
    })
    .email({
      message: "Email no es valido", // Mensaje de error si el email no es valido.
    }),
  password: z
    .string({
      required_error: "Contraseña es requerida", // Mensaje de error si el campo está vacío.
    })
    .min(8, {
      message: "Contraseña debe tener minimo 8 caracteres", // Mensaje de error si la contraseña tiene menos de 8 caracteres.
    }),
});

// Esquema de validación para el login de usuarios.
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido", // Mensaje de error si el campo está vacío.
    })
    .email({
      required_error: "Email es invalido", // Mensaje de error si el email no es valido.
    }),
  password: z
    .string({
      required_error: "Contraseña es requerida", // Mensaje de error si el campo está vacío.
    })
    .min(8, {
      message: "Contraseña debe tener minimo 8 caracteres", // Mensaje de error si la contraseña tiene menos de 8 caracteres.
    }),
});