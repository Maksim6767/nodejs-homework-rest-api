const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
// const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, subscription, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }

    const avatarURL = gravatar.url(email);

    const newUser = new User({email, subscription, avatarURL});
    newUser.setPassword(password);
    newUser.save();

    // const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    // const result = await User.create({ email, avatarUrl, subscription, password: hashPassword });

    res.status(201).json({
        status: "succsess",
        code: 201,
        data: {
            user: {
                email,
                subscription,
                avatarURL
            }
        }
    })
    return newUser;
}

module.exports = register;