const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = async (req, res) => {
  const { email, password, nombre, telefono, direccion, tipo_usuario } = req.body;

  // Validaciones
  if (!email || !password || !nombre || !telefono || !direccion || !tipo_usuario) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'El correo no es válido' });
  } else if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

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

module.exports = {
  register,
  login,
  getProfile,
};