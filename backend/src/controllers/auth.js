const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../service/auth")
const signUp = async (req, res) => {
    const user = await createUser(req.body);
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_ID,
        { expiresIn: "1d" }
    );
    res.status(201).json({
        success: true,
        message: "User registered",
        token
    });
}
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user || !(await user.comparePasswords(password))) {
        // return res.status(401).json({ message: "Invalid credentials" });
        const err=new Error("Invalid credentials");
        err.statusCode=401;
        throw err;
    }
    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_ID,
        { expiresIn: "1d" });
        res.json({
  success: true,
  token,
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
    searchHistory: user.searchHistory || [],
  },
});
}
module.exports={signUp,login}