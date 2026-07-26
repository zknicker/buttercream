import { describe, expect, test } from "bun:test";
import { createProductId } from "./ids.ts";

describe("createProductId", () => {
  test("creates opaque product-owned ids", () => {
    const first = createProductId("usr");
    const second = createProductId("usr");

    expect(first).toMatch(/^usr_[0-9a-f]{32}$/u);
    expect(second).not.toBe(first);
  });
});
