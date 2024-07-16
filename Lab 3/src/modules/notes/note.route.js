import express from "express";
import { addNote, getAllNotes } from "./note.controller.js";

const noteRoutes = express.Router();

noteRoutes.post("/note", addNote);
noteRoutes.get("/note", getAllNotes);

export default noteRoutes;
