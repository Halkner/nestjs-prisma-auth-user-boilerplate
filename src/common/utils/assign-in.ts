export function assignIn<T extends object>(
  target: T,
  input: Record<string, any>,
  force = false,
) {
  for (const key in input) {
    if (!force) {
      if (key in target && input[key] !== undefined) {
        target[key] = input[key];
      }
    } else {
      target[key] = input[key];
    }
  }
}
