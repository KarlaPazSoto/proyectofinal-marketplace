const db = require('../config/db');

//Objeto que contiene los métodos para el controlador de productos.
const productController = {

  //Obtenemos todos los productos.
  getProducts: async (req, res) => {
    try {
      const result = await db.query(
        'SELECT * FROM productos ORDER BY id_producto'
      );
      res.status(200).json({
        sucess: true, //Indica que la solicitud fue exitosa.
        data: result.rows, //Contiene la lista de productos conseguidos en la base de datos.
        count: result.rowCount //Muestra cuantos productos se consiguieron.
      });
    } catch (error) {
      console.error('Error en getProducts:', error);
      res.status(500).json({
        success: false, //Indica que la solicitud no fue exitosa.
        message: 'Error al conseguir los productos.', 
        error: error.message //Enseña el error que hubo.
      });
      
    }
  },

  //Obtenemos un producto por su ID.
  getProductById: async (res, res) => {
    const {id} = req.params;

    try{
      const result = await db.query(
        'SELECT * FROM productos WHERE id_producto = $1',
        [id]
      );
      
      if (result.rowCount === 0) {
        return res.status(404).json({
          sucess: false, //No exitoso
          message: 'Producto no encontrado.'
        });
      }

      res.status(200).json({
        sucess : true, //Exitoso
        data: result.rows[0] 
      });
    }catch (error) {
      console.error('Error en getProductById:', error);
      res.status(500).json({
        sucess: false, //No exitoso
        message: 'Error al conseguir el producto.',
        error: error.message
      });
    }
  },

  //Creamos un nuevo producto.
  createProduct: async (req, res) => {
    const {nombre, descripcion, precio, stock, categoria, imagenes, estado} = req.body;

    try {
      const result = await db.query(
        'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagenes, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [nombre, descripcion, precio, stock, categoria, imagenes, estado]
      );

      res.status(201).json({
        sucess: true,
        message: 'Producto creado correctamente.',
        data: result.rows[0]
      });
    }catch (error) {
      console.error('Error en createProduct:', error);
      res.status(500).json({
        sucess: false,
        message: 'Error al crear el producto.',
        error: error.message
      });
    }
  },

  //Actualizamos un producto que ya existe.
  updateProduct: async (req, res) => {
    const {id} = req.params;
    const {nombre, precio, descripcion, stock, categoria, imagenes, estado} = req.body;

    try {
      const result = await db.query(
        'UPDATE productos SET nombre = $1, precio = $2, descripcion = $3, stock = $4, categoria = $5, imagenes = $6, estado = $7 WHERE id_producto = $8 RETURNING *',
        [nombre, precio, descripcion, stock, categoria, imagenes, estado, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          sucess: false,
          message: 'Producto no encontrado.'
        });
      }

      res.status(200).json({
        sucess: true,
        message: 'Producto actualizado exitosamente.',
        data: result.rows[0]
      });
    }catch (error) {
      console.error('Error en updateProduct:', error);
      res.status(500).json({
        sucess: false,
        message: 'Error al actualizar el producto.',
        error: error.message
      });
    }
  },

  //Eliminamos uno de los productos.
  deleteProduct: async (req, res) =>{
    const {id} = req.params;

    try{
      const result = await db.query(
        'DELETE FROM productos WHERE id_producto = $1 RETURNING *',
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          sucess:false,
          message: 'Producto no encontrado.'
        });
      }

      res.status(200).json({
        sucess: true,
        message: 'Producto eliminado correctamente.',
        data: result.rows[0]
      });
    }catch (error) {
      console.error('Error en deleteProduct:', error);
      res.status(500).json({
        sucess: false,
        message: 'Error al eliminar el producto.',
        error: error.message
      });
    }
  },

  //Obtenemos los productos según la cetegoría
  getProductsByCategory: async (req, res) => {
    const {categoria} = req.params;

    try{
      const result = await db.query(
        'SELECT * FROM productos WHERE categoria = $1',
        [categoria]
      );
    }catch (error) {
      console.error('Error en getProductsByCategory:', error);
      res.status(500).json({
        sucess: false,
        message: 'Error al obtener los productos por categoría.',
        error: error.message
      });
    }
  },

  //Buscamos los productos por el nombre.
  searchProducts: async (req, res) => {
    const {q} = req.query; //Q vendría a ser el término para buscar el producto.

    try{
      const result = await db.query(
        'SELECT * FROM productos WHERE nombre ILIKE $1',
        [`%${q}%`] //El % es para que se pueda buscar por cualquier parte del nombre.
      );

      resizeTo.status(200).json({
        success: true,
        data: result.rows,
        count: result.rowCount
    });
    }catch (error) {
      console.error('Error en searchProducts:', error);
      res.status(500).json({
        sucess: false,
        message: 'Error al buscar los productos.',
        error: error.message
      });
    }
  }
};

module.exports = productController;