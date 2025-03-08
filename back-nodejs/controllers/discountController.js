const db = require('../config/db');

// Validar un código de descuento
const validateDiscountCode = async (req, res) => {
  const { code } = req.params; // Asegurar que coincide con la ruta

  try {
    const result = await db.query('SELECT * FROM codigos_descuento WHERE codigo = $1', [code]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Código de descuento no válido' });
    }

    res.json({ success: true, discount: result.rows[0] });
  } catch (error) {
    console.error('Error al validar el código de descuento:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Guardar un código de descuento
const saveDiscountCode = async (req, res) => {
  const { codigo, descuento, tipo_descuento } = req.body;
  const userId = req.userId; // Asegurar que se define antes de su uso

  console.log('Datos recibidos para guardar el código de descuento:', { userId, codigo, descuento, tipo_descuento });

  try {
    if (!codigo || !descuento || !tipo_descuento) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos',
        received: { codigo, descuento, tipo_descuento }
      });
    }

    // Verificar si el código ya existe antes de insertarlo
    const existingCode = await db.query('SELECT * FROM codigos_descuento WHERE codigo = $1', [codigo]);
    if (existingCode.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'El código de descuento ya existe' });
    }

    const result = await db.query(
      `INSERT INTO codigos_descuento (id_usuario, codigo, descuento, tipo_descuento) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [userId, codigo, descuento, tipo_descuento]
    );

    console.log('Código de descuento guardado:', result.rows[0]);
    res.status(201).json({ success: true, discount: result.rows[0] });
  } catch (error) {
    console.error('Error al guardar el código de descuento:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Obtener todos los códigos de descuento
const getDiscountCodes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM codigos_descuento');
    res.json({ success: true, discounts: result.rows });
  } catch (error) {
    console.error('Error al obtener los códigos de descuento:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

module.exports = {
  validateDiscountCode,
  saveDiscountCode,
  getDiscountCodes,
};
