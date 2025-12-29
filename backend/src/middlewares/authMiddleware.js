const jwt = require("jsonwebtoken")
const checkAuth = (req, res, next) => {
    console.log("AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ID);
    req.user = decoded;
    console.log("AUTH SUCCESS, USER:", req.user);

    next();
}
module.exports = checkAuth;
