const Note = require('../models/models');


// create a note
exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newNote = new Note({ title, content });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// get all notes
exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// get a note by id
exports.getNoteById = async (req, res, next) => {
  try {
    const noteId = req.params.id;

    // Validate input
    if (!noteId) {
      return res.status(400).json({ error: 'Note ID is required' });
    }

    const note = await Note.findById(noteId);

    // Check if note exists
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

// update a note
exports.updateNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;

    // Validate input
    if (!noteId || !title || !content) {
      return res.status(400).json({ error: 'Note ID, title, and content are required' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );

    // Check if note exists
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// delete a note
exports.deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;

    // Validate input
    if (!noteId) {
      return res.status(400).json({ error: 'Note ID is required' });
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    // Check if note exists
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};
