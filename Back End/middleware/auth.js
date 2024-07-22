const jwt = require('jsonwebtoken');
require("dotenv").config();
 
module.exports = (req, res, next) => {
    console.log('token');
   try {
    // Extrait le token du header d'autorisation
       const token = req.headers.authorization.split(' ')[1];
       // Verifie le token
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

