import { describe, expect, test } from "bun:test";
import { buildExportUrl, parseDesignSystemReference } from "./reference.ts";

describe("design-system references", () => {
  test("uses Buttercream Studio for ids", () => {
    expect(parseDesignSystemReference("abc")).toEqual({
      id: "abc",
      origin: "https://buttercream.studio",
    });
  });

  test("keeps the origin from a full URL", () => {
    const reference = parseDesignSystemReference("http://127.0.0.1:3000/ds/demo");
    expect(buildExportUrl(reference, "css").toString()).toBe(
      "http://127.0.0.1:3000/api/design-systems/demo/exports/css",
    );
  });
});
