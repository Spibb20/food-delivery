import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];

  if (!token) return res.status(403).send({ message: "No token" });

  const BearerToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(BearerToken, "secret-key");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).send({ message: "Invalid token" });
  }
};
