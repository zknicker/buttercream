import { describe, expect, test } from "bun:test";
import { defaultIconSettings } from "@buttercream/theme-core";
import { renderToStaticMarkup } from "react-dom/server";
import { ChatAppPreview } from "./preview-app-chat.tsx";

describe("ChatAppPreview", () => {
  test("composes the interactive chat anatomy from Buttercream components", () => {
    const markup = renderToStaticMarkup(<ChatAppPreview icons={defaultIconSettings} />);

    expect(markup).toContain('aria-label="Conversation"');
    expect(markup).toContain('role="log"');
    expect(markup).toContain('data-slot="sidebar-separator"');
    expect(markup).toContain('data-slot="accordion"');
    expect(markup).toContain('data-slot="select"');
    expect(markup).toContain('data-slot="surface"');
    expect(markup).toContain('data-slot="textarea"');
    expect(markup).toMatch(/<button(?=[^>]*aria-label="Send message")(?=[^>]*disabled)[^>]*>/u);
  });
});
