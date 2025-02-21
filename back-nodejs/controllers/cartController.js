const db = require('../config/db');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    const result = await db.query(
      'INSERT INTO carrito_productos (id_usuario, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to cart' });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await db.query('SELECT * FROM carrito_productos WHERE id_usuario = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

const removeFromCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    await db.query('DELETE FROM carrito_productos WHERE id_usuario = $1 AND id_producto = $2', [userId, id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error removing from cart' });
  }
};

const clearCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    await db.query('DELETE FROM carrito_productos WHERE id_usuario = $1', [userId]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error clearing cart' });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
};