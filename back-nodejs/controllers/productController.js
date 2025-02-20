const db = require('../config/db');

const getProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    const product = result.rows[0];

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
};