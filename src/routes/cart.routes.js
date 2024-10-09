// Aqui se definen las rutas para el carrito de compras.

import { Router } from "express";

// Importamos las funciones del carrito de compras para poder utilizarlas en las rutas.
import { 
    getProducts, 
    getProductsCart, 
    addProductCart, 
    putPlusProduct, 
    putMinusProduct, 
    deleteProduct,
    deleteCart, } from '../controllers/cart.controller.js';

// Importamos el middleware que valida el token.
import { authRequired } from '../middlewares/validateToken.js';

////////////////////////////////////////////

const router = Router();

// Ruta para ver los productos.
router.get('/products', getProducts);

// Ruta para ver los productos del carrito.
router.get('/products-cart', authRequired, getProductsCart);

// Ruta para agregar un producto al carrito.
router.post('/products-cart', authRequired, addProductCart);

// Ruta para aumentar la cantidad de un producto en el carrito.
router.put('/products-cart/:productId', authRequired, putPlusProduct);

// Ruta para disminuir la cantidad de un producto en el carrito.
router.put('/products-carts/:productId', authRequired, putMinusProduct);

// Ruta para eliminar un producto del carrito.
router.delete('/products-cart/:productId', authRequired, deleteProduct);

// Ruta para eliminar todos los productos del carrito.
router.delete('/products-cart', authRequired, deleteCart);

// Exportamos las rutas para poder utilizarlas en el archivo principal.
export default router;