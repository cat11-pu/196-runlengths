// runs.js：切等值段，相邻相同的值合成一段
import { splitAt } from "./split.js";

export function runsOf(values) {
  if (!Array.isArray(values) || values.length === 0) {
    const error = new Error("values 不能为空");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const segments = [{ value: values[0], length: 1 }];
  let longest = 1;
  for (let spot = 0; spot + 1 < values.length; spot += 1) {
    const tail = segments[segments.length - 1];
    if (splitAt(values, spot)) {
      tail.length += 1;
      if (tail.length > longest) longest = tail.length;
    } else {
      segments.push({ value: values[spot + 1], length: 1 });
    }
  }
  return { segments: segments, longest: longest, total: values.length };
}
