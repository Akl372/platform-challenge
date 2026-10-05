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

test("GET /tasks returns HTTP 200 and a JSON array", async (t) => {
  const server = app.listen(0, "127.0.0.1");

  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  }));

  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });

  const port = server.address().port;
  const response = await fetch(`http://127.0.0.1:${port}/tasks`);

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type"),
    /application\/json/
  );

  const tasks = await response.json();

  assert.ok(Array.isArray(tasks));
  assert.deepEqual(tasks, []);
});