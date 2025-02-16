export function sanitizeSearchValue(value: string): string {
  return value.replace(/[.\-/()\s]/g, ''); // Remove ., -, /, (), espaços
}
