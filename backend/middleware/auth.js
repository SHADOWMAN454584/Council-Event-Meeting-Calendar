import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ message: 'User account is inactive' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role '${req.user.role}' is not authorized to access this route` 
      });
    }

    next();
  };
};

// Specific role checks
export const isSecretary = (req, res, next) => {
  if (req.user && req.user.role === 'secretary') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Secretary role required.' });
  }
};

export const isConvenor = (req, res, next) => {
  if (req.user && req.user.role === 'convenor') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Convenor role required.' });
  }
};

export const isSecretaryOrConvenor = (req, res, next) => {
  if (req.user && (req.user.role === 'secretary' || req.user.role === 'convenor')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Secretary or Convenor role required.' });
  }
};

export const isMember = (req, res, next) => {
  if (req.user && (req.user.role === 'member' || req.user.role === 'secretary' || req.user.role === 'convenor')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Member access required.' });
  }
};
