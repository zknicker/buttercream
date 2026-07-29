import { describe, expect, test } from "bun:test";
import {
  previewSectionFromSlug,
  previewSectionSlug,
  previewSections,
} from "./preview-section-navigation.ts";

describe("preview section URLs", () => {
  test("round-trips every section through a unique slug", () => {
    const slugs = previewSections.map(previewSectionSlug);

    expect(new Set(slugs).size).toBe(previewSections.length);
    for (const section of previewSections) {
      expect(previewSectionFromSlug(previewSectionSlug(section))).toBe(section);
    }
  });

  test("uses readable slugs for demos and components", () => {
    expect(previewSectionSlug("Chat")).toBe("chat");
    expect(previewSectionSlug("Button")).toBe("button");
    expect(previewSectionSlug("Button Group")).toBe("button-group");
  });

  test("rejects unknown slugs", () => {
    expect(previewSectionFromSlug("not-a-component")).toBeUndefined();
  });
});
