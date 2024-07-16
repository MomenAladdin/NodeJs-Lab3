import userModel from "../../database/user.model.js";
import bcrypt from "bcrypt";
export const checkEmail = async (req, res, next) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser) res.status(409).json({ message: "Already registered" });
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
