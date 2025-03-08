const db = require('../config/db');

const validateDiscountCode = async (req, res) => {
  const { codigo } = req.params;

  try {
    const result = await db.query('SELECT * FROM codigos_descuento WHERE codigo = $1', [codigo]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Código de descuento no válido' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al validar el código de descuento:', error);
    res.status(500).json({ error: 'Error al validar el código de descuento' });
  }
};

const saveDiscountCode = async (req, res) => {
  const { userId, codigo, descuento, tipo_descuento } = req.body;

  console.log('Datos recibidos para guardar el código de descuento:', { userId, codigo, descuento, tipo_descuento });

  try {
    const result = await db.query(
      `INSERT INTO codigos_descuento (id_usuario, codigo, descuento, tipo_descuento) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [userId, codigo, descuento, tipo_descuento]
    );

    console.log('Resultado de la inserción:', result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar el código de descuento:', error);
    res.status(500).json({ error: 'Error al guardar el código de descuento' });
  }
};

const getDiscountCodes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM codigos_descuento');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los códigos de descuento:', error);
    res.status(500).json({ error: 'Error al obtener los códigos de descuento' });
  }
};

module.exports = {
  validateDiscountCode,
  saveDiscountCode,
  getDiscountCodes,
};