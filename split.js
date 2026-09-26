// split.js：判断第 spot 与第 spot+1 个值是否同类（相同为真，不同或越界为假）
export function splitAt(values, spot) {
  if (!Array.isArray(values) || !Number.isInteger(spot)) return false;
  if (spot < 0 || spot + 1 >= values.length) return false;
  return values[spot] === values[spot + 1];
}
