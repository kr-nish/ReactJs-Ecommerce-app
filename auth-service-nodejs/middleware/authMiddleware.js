const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  // Remove 'Bearer ' prefix if present
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user information to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      fullname: decoded.fullname
    };

    next();
  } catch (error) {
    // Handle different types of JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Catch-all for other errors
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Optional: Token refresh middleware
const refreshToken = (req, res) => {
  const { token } = req.body;

  try {
    // Decode (not verify) to get user info
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Generate new token
    const newToken = jwt.sign(
      { 
        id: decoded.id, 
        email: decoded.email,
        fullname: decoded.fullname 
      },
      JWT_SECRET,
      { expiresIn: '30m' }
    );

    res.json({ token: newToken });
  } catch (error) {
    res.status(500).json({ error: 'Token refresh failed' });
  }
};

module.exports = { 
  authMiddleware, 
  refreshToken,
  JWT_SECRET 
};