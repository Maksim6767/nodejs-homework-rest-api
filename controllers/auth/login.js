const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthorized("Email is wrong");
    }
    
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
        throw new Unauthorized("Password is wrong");
    }

    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
                email,
                subscription
            }
    })
}

module.exports = login;