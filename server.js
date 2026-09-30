const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("🚀 REST API is running! Use /notes endpoint");
});
// In-memory data (Notes)
let notes = [
  { id: 1, text: "Learn Node.js" },
  { id: 2, text: "Build REST API" }
];

// 👉 GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// 👉 GET single note
app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).send("Note not found");
  res.json(note);
});

// 👉 POST (Add new note)
app.post('/notes', (req, res) => {
  const newNote = {
    id: Date.now(),
    text: req.body.text
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// 👉 PUT (Update note)
app.put('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).send("Note not found");

  note.text = req.body.text;
  res.json(note);
});

// 👉 DELETE note
app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id != req.params.id);
  res.send("Note deleted");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});