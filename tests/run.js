import assert from "node:assert";
import { splitAt } from "../split.js";
import { runsOf } from "../runs.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("splitAt returns a boolean", () => {
  assert.strictEqual(typeof splitAt([1, 2], 0), "boolean");
});

check("runsOf returns segments", () => {
  assert.ok(Array.isArray(runsOf([1, 2]).segments));
});

check("runsOf returns longest", () => {
  assert.strictEqual(typeof runsOf([1, 2]).longest, "number");
});

check("render counts segments", () => {
  assert.strictEqual(typeof render({ values: [1, 2] }).count, "number");
});

check("render exposes checked flag", () => {
  assert.strictEqual(typeof render({ values: [1, 2] }).checked, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
