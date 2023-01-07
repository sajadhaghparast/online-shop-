const yupSchema = require("../model/secure/Yup");

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.statics.yupValid = function (userCin) {
  return yupSchema.validate(userCin, { abortEarly: false });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
