const express = require('express');
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProducts
} = require('../controllers/productController');

const router = express.Router();

router.route('/')
  .get(getProducts) //Obtener todos los productos.
  .post(createProduct); //Crear un producto.

router.route('/:id')
  .get(getProductById)  //Obtener un producto por ID.
  .put(updateProduct)  //Actualizar un producto existente.
  .delete(deleteProduct); //Eliminar un producto.

//Rutas de filtros y búsquedas.
router.get('/categoria/:categoria', getProductsByCategory); //Se filtran los productos por categoría.
router.get('/search', searchProducts); //Se busca un producto por el nombre.

module.exports = router;