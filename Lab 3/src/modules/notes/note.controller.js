import noteModel from "../../../database/note.model.js";
import mongoose from "mongoose";

const addNote = async (req, res) => {
  let addedNote = await noteModel.insertMany(req.body);
  res.json({ message: "Added", addedNote });
};

const getAllNotes = async (req, res) => {
  let allNote = await noteModel
    .find()

    .populate({
      path: "createdBy",
      select: "name -_id email ",
    });
  res.json({ message: "notes Retrieved", allNote });
};

export { addNote, getAllNotes };
