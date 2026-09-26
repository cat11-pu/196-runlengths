// app.js：渲染结果
import { splitAt } from "./split.js";
import { runsOf } from "./runs.js";

export function render(spec) {
  const values = spec.values || [];
  const view = runsOf(values);
  const segments = view.segments || [];
  return { segments: segments, count: segments.length, longest: view.longest || 0,
           total: view.total || 0, value_count: values.length,
           checked: segments.reduce((sum, item) => sum + item.length, 0) === values.length };
}
