const User = require("../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

exports.createUser = async (req, res) => {
  try {
    await User.yupValid(req.body);
    const { username, email, password } = req.body;
    const mail = await User.findOne({ email });
    if (mail) return res.status(500).json("email tekrari ast");
    const passString = password.toString();
    const passSec = 8;
    const passCrypt = await bcrypt.hash(passString, passSec);
    const newUser = new User({
      username: username,
      email: email,
      password: passCrypt,
    });
    //* welcome email
    sendEmail(email, fullname, "خوش آمدی");
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) res.status(501).json("wrong username");
    passString = password.toString();
    if (await bcrypt.compare(passString, user.password)) {
      const accesstoken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user._id,
            isAdmin: user.isAdmin,
          },
        },
        "jwtSec",
        { expiresIn: "3d" }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accesstoken });
    } else res.status(500).json("Wrong password");
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.handleForgetPassword = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      const error = new Error(
        "کاربری با این نام کاربری در پایگاه داده ثبت نشده"
      );
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:3000/users/reset-password/${token}`;

    sendEmail(
      user.email,
      user.fullname,
      "فراموشی رمز عبور",
      `
        جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
        <a href="${resetLink}">لینک تغییر رمز عبور</a>
    `
    );

    res.status(200).json({
      message: "لینک ریست کلمه عبور با موفقیت ارسال شد",
    });
  } catch (err) {
    next(err);
  }
};

exports.handleResetPassword = async (req, res, next) => {
  const token = req.params.token;
  const { password, confirmPassword } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const error = new Error("شما مجوز این عملیات را ندارید");
      error.statusCode = 401;
      throw error;
    }

    if (password !== confirmPassword) {
      const error = new Error("کلمه های عبور یکسان نمی باشند");
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      const error = new Error("کاربری با این شناسه در پایگاه داده یافت نشد");
      error.statusCode = 404;
      throw error;
    }

    user.password = password;
    await user.save();

    res.status(200).json({ message: "عملیات با موفقیت انجام شد" });
  } catch (err) {
    next(err);
  }
};
