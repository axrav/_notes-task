const router = require("express").Router();
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNoteById,
} = require("../controllers/controllers");

// routes for notes
router.post("/createNote", createNote);
router.get("/getNotes", getNotes);
router.get("/getNote/:id", getNoteById);
router.put("/updateNote/:id", updateNote);
router.delete("/deleteNote/:id", deleteNote);

module.exports = router;
