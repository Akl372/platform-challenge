const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory tasks store
let tasks = [];

function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

app.get("/", (_req, res) => {
  res.json({
    service: "devops-platform-challenge",
    status: "ok"
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.get("/total", (_req, res) => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];

  res.json({ total: calculateTotal(items) });
});

// ==========================================
// Task API Endpoints (Issues #1 to #4)
// ==========================================

// Issue #1: GET /tasks - List all tasks
app.get("/tasks", (_req, res) => {
  res.status(200).json(tasks);
});

// Issue #2: POST /tasks - Create a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // An empty or missing title returns HTTP 400
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required and must be a non-empty string" });
  }

  const newTask = {
    id: Date.now().toString(), // Generates a unique ID
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Issue #3: PATCH /tasks/:id - Complete a task
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  // Invalid input returns HTTP 400
  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid input: 'completed' must be a boolean" });
  }

  const task = tasks.find(t => t.id === id);

  // Unknown task returns HTTP 404
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = completed;
  res.status(200).json(task);
});

// Issue #4: DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);

  // Unknown task returns HTTP 404
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  // HTTP 204 No Content returned on successful deletion
  res.status(204).send();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
}

module.exports = { app, calculateTotal };
