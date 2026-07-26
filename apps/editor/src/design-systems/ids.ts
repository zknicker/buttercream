export function createProductId(prefix: "ds" | "usr"): string {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}
