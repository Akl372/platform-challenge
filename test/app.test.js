const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");
const { calculateTotal } = app; // assuming calculateTotal is attached to app

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

// --- NEW TEST FOR ISSUE #1 ---
test("GET /tasks returns 200 and an array", async () => {
  const server = app.listen(0); // start server on a random free port
  const port = server.address().port;

  try {
    const response = await fetch(`http://localhost:${port}/tasks`);
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(Array.isArray(data), true);
  } finally {
    server.close(); // shut down server after test
  }
});
