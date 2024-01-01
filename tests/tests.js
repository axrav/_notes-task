const assert = require("assert");
const supertest = require("supertest");
const notesApp = require("../src/app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

after(async () => {
  await Note.deleteMany();
  mongoose.connection.close();
});
const Note = require("../src/models/models");
const request = supertest(notesApp);

describe("Note Task", () => {
  describe("POST /notes/createNote", () => {
    it("should create a new note", async () => {
      const newNote = {
        title: "Note 1",
        content: "This is a test note 1.",
      };
      const res = await request.post("/notes/createNote").send(newNote);

      assert.strictEqual(res.status, 201);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(typeof res.body._id, "string");
      assert.strictEqual(res.body.title, newNote.title);
      assert.strictEqual(res.body.content, newNote.content);
    });

    it("should return an error for incomplete note data", async () => {
      const incompleteNote = {
        content: "This should give an error.",
      };

      const res = await request.post("/notes/createNote").send(incompleteNote);

      assert.strictEqual(res.status, 400);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(res.body.error, "Title and content are required");
    });
  });

  describe("GET /notes/getNotes", () => {
    it("should retrieve all notes", async () => {
      const notes = [
        { title: "Note 1", content: "Content 1" },
        { title: "Note 2", content: "Content 2" },
      ];

      await Note.insertMany(notes);
      const res = await request.get("/notes/getNotes");

      assert.strictEqual(res.status, 200);
      assert.strictEqual(Array.isArray(res.body), true);
      assert.strictEqual(res.body.length, 2 + 1);
    });
  });

  describe("GET /notes/getNote/:id", () => {
    it("should retrieve a specific note by ID", async () => {
      const newNote = await new Note({
        title: "Test Note",
        content: "This is a test note.",
      }).save();

      const res = await request.get(`/notes/getNote/${newNote._id}`);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(res.body._id, String(newNote._id));
      assert.strictEqual(res.body.title, newNote.title);
      assert.strictEqual(res.body.content, newNote.content);
    });

    it("should return an error for non-existent note ID", async () => {
      const nonExistentNoteId = "5f5f5f5f5f5f5f5f5f5f5f5f";

      const res = await request.get(`/notes/getNote/${nonExistentNoteId}`);

      assert.strictEqual(res.status, 404);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(res.body.error, "Note not found");
    });
  });

  describe("PUT notes/updateNote/:id", () => {
    it("should update a specific note by ID", async () => {
      const newNote = await new Note({
        title: "Test Note",
        content: "This is a test note.",
      }).save();

      const updatedNoteData = {
        title: "Updated Test Note",
        content: "This is the updated content.",
      };

      const res = await request
        .put(`/notes/updateNote/${newNote._id}`)
        .send(updatedNoteData);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(res.body._id, String(newNote._id));
      assert.strictEqual(res.body.title, updatedNoteData.title);
      assert.strictEqual(res.body.content, updatedNoteData.content);
    });

    it("should return an error for non-existent note ID during update", async () => {
      const nonExistentNoteId = "5f5f5f5f5f5f5f5f5f5f5f5f";

      const res = await request
        .put(`/notes/updateNote/${nonExistentNoteId}`)
        .send({
          title: "Updated Test Note",
          content: "This is the updated content.",
        });

      assert.strictEqual(res.status, 404);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(res.body.error, "Note not found");
    });

    it("should return an error for incomplete update data", async () => {
      const newNote = await new Note({
        title: "Note update",
        content: "This is an update test note.",
      }).save();

      const incompleteUpdateData = {
        title: "Updated Test Note",
      };

      const res = await request
        .put(`/notes/updateNote/${newNote._id}`)
        .send(incompleteUpdateData);

      assert.strictEqual(res.status, 400);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(
        res.body.error,
        "Note ID, title, and content are required",
      );
    });
  });

  describe("DELETE /notes/deleteNote/:id", () => {
    it("should delete a specific note by ID", async () => {
      const newNote = await new Note({
        title: "Test Delete Note",
        content: "This is a test delete note.",
      }).save();

      const res = await request.delete(`/notes/deleteNote/${newNote._id}`);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(res.body.message, "Note deleted successfully");

      // Verify that the note is deleted from the database
      const deletedNote = await Note.findById(newNote._id);
      assert.strictEqual(deletedNote, null);
    });

    it("should return an error for non-existent note ID during deletion", async () => {
      const nonExistentNoteId = "5f5f5f5f5f5f5f5f5f5f5f5f";

      const res = await request.delete(
        `/notes/deleteNote/${nonExistentNoteId}`,
      );

      assert.strictEqual(res.status, 404);
      assert.strictEqual(typeof res.body, "object");
      assert.strictEqual(res.body.error, "Note not found");
    });
  });
});
