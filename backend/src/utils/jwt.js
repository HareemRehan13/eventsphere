import jwt from "jsonwebtoken";

export function sign(user) {
  const payload = { sub: user._id, role: user.role, name: user.name, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
}
