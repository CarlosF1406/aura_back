import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Carrito de Compras y Autenticación",
            version: "1.0.0",
            description: "Documentación de la API del carrito de compras y autenticación"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        paths: {
            "/api/register": {
                post: {
                    summary: "Registrar un nuevo usuario",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                            example: "usuario123"
                                        },
                                        email: {
                                            type: "string",
                                            example: "usuario@example.com"
                                        },
                                        password: {
                                            type: "string",
                                            example: "password123"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Usuario registrado exitosamente",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "60d0fe4f5311236168a109ca"
                                            },
                                            username: {
                                                type: "string",
                                                example: "usuario123"
                                            },
                                            email: {
                                                type: "string",
                                                example: "usuario@example.com"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Error en el registro",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            example: "El correo ya está en uso"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/login": {
                post: {
                    summary: "Iniciar sesión",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: {
                                            type: "string",
                                            example: "usuario@example.com"
                                        },
                                        password: {
                                            type: "string",
                                            example: "password123"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Inicio de sesión exitoso",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "60d0fe4f5311236168a109ca"
                                            },
                                            username: {
                                                type: "string",
                                                example: "usuario123"
                                            },
                                            email: {
                                                type: "string",
                                                example: "usuario@example.com"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Error en el inicio de sesión",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Usuario no encontrado"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/logout": {
                post: {
                    summary: "Cerrar sesión",
                    responses: {
                        200: {
                            description: "Cierre de sesión exitoso"
                        }
                    }
                }
            },
            "/api/profile": {
                get: {
                    summary: "Obtener perfil del usuario",
                    security: [{
                        bearerAuth: []
                    }],
                    responses: {
                        200: {
                            description: "Perfil del usuario",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                example: "60d0fe4f5311236168a109ca"
                                            },
                                            username: {
                                                type: "string",
                                                example: "usuario123"
                                            },
                                            email: {
                                                type: "string",
                                                example: "usuario@example.com"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Usuario no encontrado",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Usuario no encontrado"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/products": {
                get: {
                    summary: "Obtener lista de productos",
                    responses: {
                        200: {
                            description: "Lista de productos",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    example: "670425c40dfe97f294072f8b"
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "Aura T12"
                                                },
                                                inCart: {
                                                    type: "boolean",
                                                    example: false
                                                },
                                                price: {
                                                    type: "number",
                                                    example: 90000
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/products-cart": {
                get: {
                    summary: "Obtener productos del carrito",
                    security: [{
                        bearerAuth: []
                    }],
                    responses: {
                        200: {
                            description: "Lista de productos en el carrito",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    example: "6705529f8f8ef6a6ec7c3c75"
                                                },
                                                user : {
                                                    type: "string",
                                                    example: "60d0fe4f5311236168a109ca"
                                                },
                                                product: {
                                                    type: "string",
                                                    example: "6705c44073b6ae1a4bf190de"
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "Aura T12"
                                                },
                                                price: {
                                                    type: "number",
                                                    example: 90000
                                                },
                                                amount: {
                                                    type: "number",
                                                    example: 1
                                                },
                                                __v: {
                                                    type: "number",
                                                    example: 0
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "No hay productos en el carrito",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "No hay productos en el carrito"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: "Agregar un producto al carrito",
                    security: [{
                        bearerAuth: []
                    }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        productId: {
                                            type: "string",
                                            example: "6705c44073b6ae1a4bf190de"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Producto agregado al carrito",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "El producto fue agregado al carrito"
                                            },
                                            product: {
                                                type: "object",
                                                properties: {
                                                    user: {
                                                        type: "string",
                                                        example: "60d0fe4f5311236168a109ca"
                                                    },
                                                    product: {
                                                        type: "string",
                                                        example: "6705c44073b6ae1a4bf190de"
                                                    },
                                                    name: {
                                                        type: "string",
                                                        example: "Aura T12"
                                                    },
                                                    price: {
                                                        type: "number",
                                                        example: 90000
                                                    },
                                                    amount: {
                                                        type: "number",
                                                        example: 1
                                                    },
                                                    _id: {
                                                        type: "string",
                                                        example: "6705529f8f8ef6a6ec7c3c75"
                                                    },
                                                    __v: {
                                                        type: "number",
                                                        example: 0
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Error al agregar el producto al carrito",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Hubo un error al agregar el producto al carrito"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: "Vaciar el carrito",
                    security: [{
                        bearerAuth: []
                    }],
                    responses: {
                        200: {
                            description: "Carrito vaciado",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "El carrito ha sido vaciado"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Error al vaciar el carrito",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Hubo un error al vaciar el carrito"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/products-cart/{productId}": {
                put: {
                    summary: "Aumentar la cantidad de un producto en el carrito",
                    security: [{
                        bearerAuth: []
                    }],
                    parameters: [
                        {
                            name: "productId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            description: "ID del producto"
                        }
                    ],
                    responses: {
                        200: {
                            description: "Cantidad del producto actualizada",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Cantidad del producto actualizada"
                                            },
                                            product: {
                                                type: "object",
                                                properties: {
                                                    _id: {
                                                        type: "string",
                                                        example: "6705529f8f8ef6a6ec7c3c75"
                                                    },
                                                    user: {
                                                        type: "string",
                                                        example: "60d0fe4f5311236168a109ca"
                                                    },
                                                    product: {
                                                        type: "string",
                                                        example: "6705c44073b6ae1a4bf190de"
                                                    },
                                                    name: {
                                                        type: "string",
                                                        example: "Aura T12"
                                                    },
                                                    price: {
                                                        type: "number",
                                                        example: 90000
                                                    },
                                                    amount: {
                                                        type: "number",
                                                        example: 2
                                                    },
                                                    __v: {
                                                        type: "number",
                                                        example: 0
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Error al actualizar la cantidad del producto",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Hubo un error al actualizar la cantidad del producto"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: "Eliminar un producto del carrito",
                    security: [{
                        bearerAuth: []
                    }],
                    parameters: [
                        {
                            name: "productId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            description: "ID del producto"
                        }
                    ],
                    responses: {
                        200: {
                            description: "Producto eliminado del carrito",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "El producto fue eliminado del carrito"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Error al eliminar el producto del carrito",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Hubo un error al eliminar el producto del carrito"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/products-carts/{productId}": {
                put: {
                    summary: "Disminuir la cantidad de un producto en el carrito",
                    security: [{
                        bearerAuth: []
                    }],
                    parameters: [
                        {
                            name: "productId",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string"
                            },
                            description: "ID del producto"
                        }
                    ],
                    responses: {
                        200: {
                            description: "Cantidad del producto disminuida",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Cantidad del producto disminuida"
                                            },
                                            product: {
                                                type: "object",
                                                properties: {
                                                    _id: {
                                                        type: "string",
                                                        example: "6705529f8f8ef6a6ec7c3c75"
                                                    },
                                                    user: {
                                                        type: "string",
                                                        example: "60d0fe4f5311236168a109ca"
                                                    },
                                                    product: {
                                                        type: "string",
                                                        example: "6705c44073b6ae1a4bf190de"
                                                    },
                                                    name: {
                                                        type: "string",
                                                        example: "Aura T12"
                                                    },
                                                    price: {
                                                        type: "number",
                                                        example: 90000
                                                    },
                                                    amount: {
                                                        type: "number",
                                                        example: 1
                                                    },
                                                    __v: {
                                                        type: "number",
                                                        example: 0
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Error al disminuir la cantidad del producto",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Hubo un error al disminuir la cantidad del producto"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    },
    apis: ["./routes/auth.routes.js", "./routes/cart.routes.js"] // Rutas a tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;