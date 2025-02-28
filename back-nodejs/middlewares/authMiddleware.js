const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener el header de autorización
  const authHeader = req.header('Authorization');

  // Verificar si el header existe
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Validar el formato del token: debe comenzar con "Bearer "
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ error: 'Invalid token format. Must start with "Bearer "' });
  }

  // Extraer el token
  const token = authHeader.replace('Bearer ', '');

  // Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar datos del usuario en la solicitud
    console.log('Usuario autenticado:', decoded);
    next(); // Continuar con la siguiente función del middleware
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
