const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const phoneRegexr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
        trim: true
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String,
        required: true
    }
},
    { versionKey: false, timestamps: true });

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(6).max(24).required().pattern(phoneRegexr),
  email: Joi.string().min(4).max(64).required().email(),
  subscription: Joi.string().min(3).max(24).required(),
  token: Joi.bool()
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).max(24).required().pattern(phoneRegexr),
  email: Joi.string().min(4).max(64).required().email(),
  subscription: Joi.string().min(3).max(24)
});


const User = model("user", userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema
};