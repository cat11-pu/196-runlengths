// runs.js：切等值段，单次扫描，每个值只比较一次
import { splitAt } from "./split.js";

export function runsOf(values) {
  if (!Array.isArray(values) || values.length === 0) {
    const error = new Error("values 不能为空");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const segments = [{ value: values[0], length: 1 }];
  let longest = 1;
  for (let spot = 1; spot < values.length; spot += 1) {
    if (splitAt(values, spot - 1)) {
      const last = segments[segments.length - 1];
      last.length += 1;
      if (last.length > longest) {
        longest = last.length;
      }
    } else {
      segments.push({ value: values[spot], length: 1 });
    }
  }
  return { segments: segments, longest: longest, total: values.length };
}
