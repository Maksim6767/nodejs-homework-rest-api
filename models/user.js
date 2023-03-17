const { SchemaTypes } = require("mongoose");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const phoneRegexr = /^(\+3|)[0-9]{10,11}$/;

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
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
},
    { versionKey: false, timestamps: true });

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(6).max(24).required(),
  email: Joi.string().min(4).max(64).required().email(),
  subscription: Joi.string().min(6).max(24).required()
        // .pattern(phoneRegexr),
//   token: Joi.bool()
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).max(24).required(),
  email: Joi.string().min(4).max(64).required().email(),
  subscription: Joi.string().min(6).max(24).required()
});


const User = model("user", userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema
};