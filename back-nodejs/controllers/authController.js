// Importaciones.
const bcrypt = require('bcrypt'); // Para encriptar la contraseña.
const jwt = require('jsonwebtoken'); //Para crear tokens de autenticación.
const db = require('../config/db'); // Para interacturar con la base de datos.

//Registro del usuario.
const register = async (req, res) => {
  const { email, password, nombre, telefono, direccion, tipo_usuario } = req.body;

  // Validaciones de los campos.
  if (!email || !password || !nombre || !telefono || !direccion || !tipo_usuario) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  //Validamos el correo con regex.
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'El correo no es válido' });
  //Validamos que la contraseña tenga al menos 6 caracteres.
  } else if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  //Encriptamos la contraseña.
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      'INSERT INTO usuarios (nombre, email, hashed_password, telefono, direccion, tipo_usuario, fecha_registro, estado) VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7) RETURNING *',
      [nombre, email, hashedPassword, telefono, direccion, tipo_usuario, 'activo']
    );
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validaciones
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Email is not valid' });
  }

  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

const getProfile = async (req, res) => {
  try {
    console.log('Token decodificado:', req.user);  // Ver qué contiene el token
    
    const result = await db.query(
      'SELECT * FROM usuarios WHERE id = $1',
      [req.user.userId]
    );
    
    console.log('Resultado de la consulta:', result.rows);  // Ver qué devuelve la consulta
    
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error completo:', error);
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { nombre, email, telefono, direccion } = req.body;

    // Validaciones
    if (!nombre || !email || !telefono || !direccion) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'El correo no es válido' });
    }

    // Verificar si el email ya existe (si se está cambiando)
    const emailCheck = await db.query(
      'SELECT id FROM usuarios WHERE email = $1 AND id != $2',
      [email, userId]
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }

    // Actualizar el perfil
    const result = await db.query(
      `UPDATE usuarios 
       SET nombre = $1, 
           email = $2, 
           telefono = $3, 
           direccion = $4,
           fecha_actualizacion = NOW()
       WHERE id = $5 
       RETURNING id, nombre, email, telefono, direccion, tipo_usuario, estado`,
      [nombre, email, telefono, direccion, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ 
      error: 'Error al actualizar el perfil',
      details: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};