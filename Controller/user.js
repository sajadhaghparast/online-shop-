const User = require("../model/User");

exports.changePassOrUsername = async (req, res) => {
  if (req.body.password) {
    const passSec = 8;
    req.body.password = (
      await bcrypt.hash(req.body.password, passSec)
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`${req.params.user} has been deleted...`);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteAll = async (req, res) => {
  await User.deleteMany({ isAdmin: false });
  res.status(200).json("All users deleted");
  res.status(200);
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
