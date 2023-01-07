const yup = require("yup");

const YupSchema = yup.object().shape({
  username: yup.string().required().min(5).max(60).trim(),
  email: yup.string().email().required().trim(),
  password: yup.string().min(4).max(255).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], null),
});
module.exports = YupSchema;
