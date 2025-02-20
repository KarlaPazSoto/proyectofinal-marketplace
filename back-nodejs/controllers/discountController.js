const db = require('../config/db');

const getDiscountCodes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM codigos_descuento');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching discount codes' });
  }
};

module.exports = {
  getDiscountCodes,
};