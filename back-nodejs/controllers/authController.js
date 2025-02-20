const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = async (req, res) => {
  const { email, password } = req.body;

  // Validaciones
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Email is not valid' });
  } else if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
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
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
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
    const result = await db.query('SELECT * FROM users WHERE id = $1', [req.user.userId]);
    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};