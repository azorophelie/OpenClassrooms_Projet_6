const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ error: 'Requête non authentifiée!' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant!' });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée!' });
  }
};
