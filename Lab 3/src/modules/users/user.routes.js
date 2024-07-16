import express from "express";
import { signIn, signUp, verifyAccount } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRoute = express.Router();

export default userRoute;

userRoute.post("/signUp", checkEmail, signUp);
userRoute.post("/signIn", signIn);
userRoute.get("/verify/:email", verifyAccount);

//////////////////////////
// import express from "express";
// import {
//   addUser,
//   deleteUser,
//   getAllUser,
//   updateUser,
// } from "./user.controller.js";

// const userRoute = express.Router();

// userRoute.route("/users").get(getAllUser).post(addUser).put(updateUser);

// userRoute.route("/users/:id").delete(deleteUser);

// export default userRoute;
