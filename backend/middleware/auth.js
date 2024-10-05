export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: 'Unauthorized' });
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
