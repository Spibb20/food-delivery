import { getAuth } from "@clerk/express";

function getAdminIds() {
  return new Set(
    (process.env.ADMIN_USER_IDS || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
  );
}

function authenticatedUser(req) {
  const auth = getAuth(req);
  return auth.isAuthenticated && auth.userId ? auth.userId : null;
}

export function requireUser(req, res, next) {
  const userId = authenticatedUser(req);
  if (!userId)
    return res.status(401).json({ message: "Authentication required" });
  req.authUserId = userId;
  return next();
}

export function requireAdmin(req, res, next) {
  const userId = authenticatedUser(req);
  if (!userId)
    return res.status(401).json({ message: "Authentication required" });
  if (!getAdminIds().has(userId))
    return res.status(403).json({ message: "Admin access required" });
  req.authUserId = userId;
  return next();
}

export function requireSelfOrAdmin(req, res, next) {
  const userId = authenticatedUser(req);
  if (!userId)
    return res.status(401).json({ message: "Authentication required" });
  if (userId !== req.params.userId && !getAdminIds().has(userId)) {
    return res
      .status(403)
      .json({ message: "Not allowed to access these orders" });
  }
  req.authUserId = userId;
  return next();
}
