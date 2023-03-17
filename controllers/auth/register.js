const { Conflict } = require("http-errors");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, subscription, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, subscription, password: hashPassword });
    res.status(201).json({
        status: "succsess",
        code: 201,
        data: {
            user: {
                email,
                subscription
            }
        }
    })
    return result;
}

module.exports = register;