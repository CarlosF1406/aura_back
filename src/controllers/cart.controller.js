// Aquí se encuentran todas las funciones relacionadas al carrito de compras.

// Importar el modelo Cart.
import Cart from '../models/cart.model.js';

// Importar el modelo Product.
import Product from '../models/products.model.js';

///////////////////////////////////////////////////////////////////////////

// Aquí se encuentra la función que obtiene todos los productos.
export const getProducts = async (req, res) => {

    // Buscar todos los productos
    const products = await Product.find();

    // Si no hay productos, enviar un mensaje de error.
    if (!products) return res.status(400).json({message: "No hay productos"});

    // Si hay productos, enviar los productos.
    return res.json({ products });
};

// Aquí se encuentra la función que obtiene los productos del carrito de compras.
export const getProductsCart = async (req, res) => {

    // Buscar los productos en el carrito del usuario actual.
    const productsCart = await Cart.find({ user: req.user.id }).populate({
        path: 'user',
        select: '_id username' // Selecciona solo los campos _id y username 
    });

    // Si no hay productos en el carrito, enviar un mensaje de error.
    if (!productsCart || productsCart.length === 0) {
        return res.status(400).json({message: "No hay productos en el carrito"});
    }

    // Si hay productos en el carrito, enviar los productos.
    return res.json({ productsCart });
};

// Aquí se encuentra la función que agrega un producto al carrito de compras.
export const addProductCart = async (req, res) => {

    // Obtener el id del producto a agregar al carrito
    const { productId } = req.body;

    // Encerramos el código en un bloque try-catch para manejar errores en caso de que se den.
    try {

        // Verificar si el producto ya está en el carrito del usuario actual
        const productInCart = await Cart.findOne({ product: productId, user: req.user.id });

        // Si el producto ya está en el carrito, enviar un mensaje de error.
        if (productInCart) {
            return res.status(400).json({ message: "El producto ya está en el carrito" });
        }

        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Crear un nuevo producto en el carrito.
        const newProductInCart = new Cart({
            user: req.user.id,
            product: productId,
            name: product.name,
            price: product.price,
            amount: 1
        });

        // Guardar el producto en el carrito.
        await newProductInCart.save();

        // Enviar un mensaje de éxito y el producto agregado al carrito.
        return res.json({
            message: "El producto fue agregado al carrito",
            product: newProductInCart
        });
        // Manejar errores
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Hubo un error al agregar el producto al carrito" });
    }
};

// Aquí se encuentra la función que aumenta la cantidad de un producto en el carrito de compras.
export const putPlusProduct = async (req, res) => {

    // Encerramos el código en un bloque try-catch para manejar errores en caso de que se den.
    try {

        // Obtener el id del producto a aumentar la cantidad
        const { productId } = req.params;

        // Buscar el producto en el carrito del usuario actual
        const productInCart = await Cart.findOne({ product: productId, user: req.user.id });

        // Si el producto no está en el carrito, enviar un mensaje de error.
        if (!productInCart) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito." });
        }

        // Aumentar la cantidad del producto en 1
        productInCart.amount += 1;
        await productInCart.save();

        // Enviar un mensaje de éxito y el producto con la nueva cantidad.
        return res.json({
            message: `La cantidad del producto ${productInCart.name} fue aumentada a ${productInCart.amount}.`,
            product: productInCart
        });
        // Manejar errores.
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Hubo un error al actualizar la cantidad del producto." });
    }
};

// Aquí se encuentra la función que disminuye la cantidad de un producto en el carrito de compras.
export const putMinusProduct = async (req, res) => {
    try {

        // Obtener el id del producto a disminuir la cantidad
        const { productId } = req.params;

        // Buscar el producto en el carrito del usuario actual
        const productInCart = await Cart.findOne({ product: productId, user: req.user.id });

        // Si el producto no está en el carrito, enviar un mensaje de error.
        if (!productInCart) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito." });
        }

        // Si la cantidad del producto es 1, enviar un mensaje de error.
        if (productInCart.amount === 1) {
            return res.status(400).json({ message: "La cantidad del producto no puede ser menor a 1." });
        }

        // Disminuir la cantidad del producto en 1.
        productInCart.amount -= 1;
        await productInCart.save();

        // Enviar un mensaje de éxito y el producto con la nueva cantidad.
        return res.json({
            message: `La cantidad del producto ${productInCart.name} fue disminuida a ${productInCart.amount}.`,
            product: productInCart
        });
        // Manejar errores.
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Hubo un error al actualizar la cantidad del producto." });
    }
};

// Aquí se encuentra la función que elimina un producto del carrito de compras.
export const deleteProduct = async (req, res) => {

    // Obtener el id del producto a eliminar del carrito
    const { productId } = req.params;

    // Buscar el producto en el carrito del usuario actual
    const productInCart = await Cart.findOne({ product: productId, user: req.user.id }); // Cambiado para buscar en el carrito del usuario

    // Si el producto no está en el carrito, enviar un mensaje de error.
    if (!productInCart) {
        return res.status(404).json({message: "Producto no encontrado en el carrito"});
    }

    // Eliminar el producto del carrito.
    await Cart.findOneAndDelete({ product: productId, user: req.user.id });
    return res.json({message: `El producto fue eliminado del carrito`});
};

// Aquí se encuentra la función que vacía el carrito de compras.
export const deleteCart = async (req, res) => {
    
        // Buscar todos los productos en el carrito del usuario actual
        const productsInCart = await Cart.find({ user: req.user.id });
    
        // Si no hay productos en el carrito, enviar un mensaje de error.
        if (!productsInCart || productsInCart.length === 0) {
            return res.status(400).json({message: "No hay productos en el carrito"});
        }
    
        // Eliminar todos los productos del carrito.
        await Cart.deleteMany({ user: req.user.id });
        return res.json({message: "El carrito fue vaciado"});
};