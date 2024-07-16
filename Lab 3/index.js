import { createServer } from "http";
import { json } from "stream/consumers";
import { createServer as _createServer } from "http";
import express from "express";
import userRoute from "./src/modules/users/user.routes.js";

import { dbConnection } from "./database/dbConnection.js";
import userModel from "./database/user.model.js";
import noteRoutes from "./src/modules/notes/note.route.js";

const app = express();

app.use(express.json());
dbConnection;
app.use(userRoute);
app.use(noteRoutes);

////////////////////////////////////////

app.get("/", async (req, res) => {
  const users = await userModel.find();
  res.json({ message: "Done", users });
});

app.post("/user", async (req, res) => {
  await userModel.insertMany(req.body);
  res.json("Successfully Added");
});

app.put("/user/:id", async (req, res) => {
  let id = req.params.id;
  const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ message: "Updated", user });
});

app.delete("/user/:id", async (req, res) => {
  const user = await userModel.deleteOne({ _id: req.params.id });
  res.json({ message: "deleted", user });
});

//lab 2
// //-----read Users------------
// const server = _createServer((req, res) => {
//   if (req.url == "/" && req.method == "GET") {
//     res.setHeader("content-type", "application/json");
//     res.end(readFileSync("test.json", "utf-8"));
//     //-----add User---------
//   } else if (req.url == "/" && req.method == "POST") {
//     req.on("data", (data) => {
//       let nUser = JSON.parse(data);
//       nUser.id = users[users.length - 1].id + 1;
//       users.push(nUser);
//       //---------sort------------
//       users.sort((a, b) => {
//         if (a.name < b.name) {
//           return -1;
//         } else {
//           return 1;
//         }
//       });
//       writeFileSync("test.json", JSON.stringify(users));

//       res.end("user added successfully");
//     });
//     //-------Updata user-------------
//   } else if (req.url == "/" && req.method == "PUT") {
//     req.on("data", (chunk) => {
//       let updatedData = JSON.parse(chunk);
//       let user = users.find((ele) => ele.id == updatedData.id);

//       if (user) {
//         user.name = updatedData.name;
//         user.age = updatedData.age;
//         writeFileSync("test.json", JSON.stringify(users));

//         res.end("user updated successfully");
//       } else {
//         res.end("user Not found");
//       }
//     });
//   } else if (req.url == "/" && req.method == "DELETE") {
//     req.on("data", (chunk) => {
//       let myData = JSON.parse(chunk);
//       let updatedUser = users.filter((ele) => ele.id != myData.id);
//       if (updatedUser.length == users.length) {
//         res.end("user Not found ");
//       } else {
//         writeFileSync("test.json", JSON.stringify(updatedUser));
//         res.end("user deleted ");
//       }
//     });
//   }
// });

// server.listen(3000, () => {
//   console.log("server is running");
// });

app.listen(3000);
