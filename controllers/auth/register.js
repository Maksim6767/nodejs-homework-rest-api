const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
    const { email, subscription, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }

    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const newUser = new User({email, subscription, avatarURL, verificationToken});
    newUser.setPassword(password);
    await newUser.save();

    const mail = {
        to: email,
        subject: "Пoдтверждение email",
        html: `<a target = "_blank" href = "http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
    }
    await sendEmail(mail);

    res.status(201).json({
        status: "succsess",
        code: 201,
        data: {
            user: {
                email,
                subscription,
                avatarURL,
                verificationToken
            }
        }
    })
    return newUser;
}

module.exports = register;