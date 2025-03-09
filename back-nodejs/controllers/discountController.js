const db = require('../config/db');

// Validar un código de descuento
const validateDiscountCode = async (req, res) => {
  const { code } = req.params;

  try {
    const result = await db.query('SELECT * FROM codigos_descuento WHERE codigo = $1 AND estado = $2', [code, 'activo']);

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
  const userId = req.userId;

  console.log('Datos recibidos para guardar el código de descuento:', {
    userId,
    codigo,
    descuento,
    tipo_descuento
  });

  try {
    if (!codigo || !descuento || !tipo_descuento) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos',
        received: { codigo, descuento, tipo_descuento }
      });
    }

    // Verificar si el código ya existe
    const existingCode = await db.query('SELECT * FROM codigos_descuento WHERE codigo = $1', [codigo]);
    if (existingCode.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'El código de descuento ya existe' });
    }

    // Configurar valores por defecto
    const uso_actual = 0;
    const uso_maximo = 100; // Puedes ajustar este valor según tus necesidades
    const estado = 'activo';
    const fecha_expiracion = new Date();
    fecha_expiracion.setMonth(fecha_expiracion.getMonth() + 1); // Expira en 1 mes

    const result = await db.query(
      `INSERT INTO codigos_descuento (
        usuario_id, codigo, descuento, tipo_descuento, 
        uso_actual, uso_maximo, estado, fecha_expiracion
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`,
      [
        userId, 
        codigo, 
        descuento, 
        tipo_descuento,
        uso_actual,
        uso_maximo,
        estado,
        fecha_expiracion
      ]
    );

    console.log('Código de descuento guardado:', result.rows[0]);
    res.status(201).json({ success: true, discount: result.rows[0] });
  } catch (error) {
    console.error('Error al guardar el código de descuento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al guardar el código de descuento',
      error: error.message
    });
  }
};

// Obtener todos los códigos de descuento
const getDiscountCodes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM codigos_descuento ORDER BY fecha_expiracion DESC');
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
