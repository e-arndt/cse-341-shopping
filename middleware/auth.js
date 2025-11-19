// middleware/auth.js
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  // Allow either "Bearer <token>" OR just "<token>"
  let token = header;

  // If it starts with "Bearer " (any case), strip that off
  if (header.toLowerCase().startsWith('bearer ')) {
    token = header.slice(7).trim();
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Invalid Authorization header format (no token)' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // attach decoded JWT info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };
