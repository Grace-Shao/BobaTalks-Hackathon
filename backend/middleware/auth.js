export function isAuthenticated(req, res, next) {
  console.log('isAuthenticated middleware called');
  console.log('Session ID:', req.sessionID);
  console.log('Is Authenticated:', req.isAuthenticated());
  console.log('User:', req.user);

  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: 'Unauthorized request. Please log in.' });
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden: Access is denied' });
    }
    next();
  };
}
