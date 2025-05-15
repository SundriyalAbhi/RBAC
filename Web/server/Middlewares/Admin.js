const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // This will include id and role
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};


exports.allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};
