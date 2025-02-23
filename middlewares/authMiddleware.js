const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Accès refusé, aucun token fourni" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajouter les infos de l'utilisateur au `req`
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};
