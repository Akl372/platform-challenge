const test = require("node:test");
const assert = require("node:assert/strict");
const { app, calculateTotal } = require("../src/app");

test("calculates the total for several items", () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];

  assert.equal(calculateTotal(items), 35);
});

test("returns zero for an empty basket", () => {
  assert.equal(calculateTotal([]), 0);
});

test("does not mutate the input items", () => {
  const items = [{ price: 4, quantity: 2 }];
  const copy = JSON.parse(JSON.stringify(items));

  calculateTotal(items);

  assert.deepEqual(items, copy);
});

// --- TASK API TESTS (Issues #1 to #4) ---
test("Task API workflow: List, Create, Complete, and Delete", async () => {
  const server = app.listen(0); // start server on a random free port
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  try {
    // 1. GET /tasks (Issue #1) - Returns 200 and an empty array initially
    let response = await fetch(`${baseUrl}/tasks`);
    assert.equal(response.status, 200);
    let data = await response.json();
    assert.equal(Array.isArray(data), true);
    assert.equal(data.length, 0);

    // 2. POST /tasks (Issue #2) - Create a new task successfully
    response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Write unit tests" })
    });
    assert.equal(response.status, 201);
    const createdTask = await response.json();
    assert.equal(createdTask.title, "Write unit tests");
    assert.equal(createdTask.completed, false);
    assert.ok(createdTask.id);

    // 2b. POST /tasks - Empty title returns HTTP 400
    response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "" })
    });
    assert.equal(response.status, 400);

    // 3. PATCH /tasks/:id (Issue #3) - Mark task as completed
    response = await fetch(`${baseUrl}/tasks/${createdTask.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });
    assert.equal(response.status, 200);
    const updatedTask = await response.json();
    assert.equal(updatedTask.completed, true);

    // 3b. PATCH /tasks/:id - Unknown task returns HTTP 404
    response = await fetch(`${baseUrl}/tasks/non-existent-id`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true })
    });
    assert.equal(response.status, 404);

    // 4. DELETE /tasks/:id (Issue #4) - Delete the task successfully
    response = await fetch(`${baseUrl}/tasks/${createdTask.id}`, {
      method: "DELETE"
    });
    assert.equal(response.status, 204);

    // 4b. DELETE /tasks/:id - Unknown task returns HTTP 404
    response = await fetch(`${baseUrl}/tasks/${createdTask.id}`, {
      method: "DELETE"
    });
    assert.equal(response.status, 404);

  } finally {
    server.close(); // shut down server after test
  }
});
