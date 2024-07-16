import userModel from "../../../database/user.model.js";
import bcrypt from "bcrypt";
import sendMails from "../../utility/sendEmail.js";

const signUp = async (req, res) => {
  await userModel.insertMany(req.body);

  //generte user OTP
  await userModel.findOneAndUpdate(
    { email: req.body.email },
    { OTPCode: generateOTP() },
    { new: true }
  );
  let foundedUser = await userModel.findOne({ email: req.body.email });
  //Send User OTP
  sendMails(req.body.email, foundedUser.OTPCode);

  res.json("user had registered");
};

const signIn = async (req, res) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  // check email && password
  if (
    !foundedUser ||
    !bcrypt.compareSync(req.body.password, foundedUser.password)
  )
    return res.json({ message: "email or password is invalid" });

  //check email && OTP code
  if (
    foundedUser.OTPCode != req.body.OTPCode ||
    foundedUser.isConfirmed == false
  ) {
    return res
      .status(401)
      .json({ message: "u should confirm your email first" });
  }
  res.status(200).json({ message: "Welcome" });
};

const verifyAccount = async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { email: req.params.email },
    { isConfirmed: true },
    { new: true }
  );
  res.json({ message: "Welcome", updatedUser });
};

/// OTP generator Fn
const generateOTP = () => {
  return Math.floor(Math.random() * 1000000 + 1);
};

export { signUp, signIn, verifyAccount };

/*
// import { writeFileSync, readFileSync } from "fs";

// let users = [
//   {
//     name: "Mo'men Aladdin",
//     age: 29,
//     email: "moamen1@gmail.com",
//     id: 1,
//   },
//   { name: "Islam Mohamed", age: 33, email: "islam2@gmail.com", id: 2 },
//   { name: "Ahmed Ezzat", age: 27, email: "ezzat3@gmail.com", id: 3 },
// ];

// const getAllUser = (req, res) => {
//   writeFileSync("../../../test.json", JSON.stringify(users));
//   res.json({ message: "Success retrieve all users", users });
// };

// const addUser = (req, res) => {
//   req.body.id = users[users.length - 1].id + 1;
//   users.push(req.body);
//   writeFileSync("../../../test.json", JSON.stringify(users));
//   res.send({ message: "Success Added user" });
// };

// const deleteUser = (req, res) => {
//   users = users.filter((ele) => ele.id != req.params.id);

//   writeFileSync("../../../test.json", JSON.stringify(users));
//   res.send({ message: "succesfully deleted" });
// };

// const updateUser = (req, res) => {
//   let foundedUser = users.find((ele) => ele.id == req.body.id);

//   foundedUser.name = req.body.name;
//   foundedUser.age = req.body.age;
//   foundedUser.email = req.body.email;
//   writeFileSync("../../../test.json", JSON.stringify(users));
//   res.send({ message: "succesfully updated" });
// };

// export { getAllUser, addUser, deleteUser, updateUser };
*/
